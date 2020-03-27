import { Component, h, Prop, State, Element } from '@stencil/core';
import { Store } from '@stencil/redux';
import authSelectors from '../../../../store/selectors/auth';
import taxonomySelectors from '../../../../store/selectors/taxonomy';
import screenSizeSelectors from '../../../../store/selectors/screensize';
import { APIAdminService } from '../../../../services/api/admin';
import { APIApartmentsService } from '../../../../services/api/apartments';
import { formatDate, formatMoney} from '../../../../helpers/utils';
import { ToastService } from '../../../../services/toast.service';
import { RouterService } from '../../../../services/router.service';
import { AlertService } from '../../../../services/alerts.service';
import Debounce from 'debounce-decorator';

@Component({
  tag: 'page-admin-listings',
  styleUrl: 'page-admin-listings.scss'
})
export class PageAdminListings {
  @Prop({ context: "store" }) store: Store;
  @Element() el: HTMLElement;

  @State() bedroomTypes: any[];
  @State() buildingTypes: any[];

  @State() isAdmin: boolean = false;
  @State() isLoggedIn: boolean = false;
  pageSize: number = 40;
  @State() loaded: boolean = false;
  @State() listings: any[] = [];
  @State() searchParams: any = {
    sortBy: 'webid_asc',
    price_month: 0,
    active: 'all',
    search_type: 'webid',
    search_query: '',
    offset: 0,
    limit: this.pageSize
  };
  @State() screenHeight: number;

  @State() resultCount: number = 0;
  @State() activeCount: number = 0;
  @State() inactiveCount: number = 0;

  @State() formFocus: null | string = null;

  listingsWrapper: HTMLElement;
  searchTypeInput: HTMLSelectElement;

  componentWillLoad() {
    this.store.mapStateToProps(this, state => {
      return {
        isLoggedIn: authSelectors.isLoggedIn(state),
        isAdmin: authSelectors.isAdmin(state),
        bedroomTypes: taxonomySelectors.getBedroomTypes(state),
        buildingTypes: taxonomySelectors.getBuildingTypes(state),
        screenHeight: screenSizeSelectors.getHeight(state)
      }
    });

    if (!this.isLoggedIn) {
      RouterService.forward('/login');
    }
    else {
      // we're logged in, but as admin?
      if (!this.isAdmin) {
        RouterService.forward('/');
      }
    }
  }

  componentDidLoad() {
    this.renderListings();
  }

  componentDidRender() {
    requestAnimationFrame(() => {
      if (this.listingsWrapper) {
        this.listingsWrapper.style.maxHeight = this.getTableHeight();
      }
    });
  }

  async renderListings() {
    try {
      const result = await this.fetchListings();

      this.listings = result.results;
      this.resultCount = result.total;
      this.activeCount = result.total_active;
      this.inactiveCount = result.total_inactive;

      this.loaded = true;
    } catch(err) {
      // alright...
      ToastService.error(err.message);
    }
  }

  async fetchListings() {
      try {
        const result = await APIAdminService.getListings(this.searchParams);

        return result;

      } catch(err) {
        return ToastService.error(`Could not retrieve listings: ${err.message}`);
      }
  }

  search(e?) {
    if (e) {
      e.preventDefault();
    }

    const searchInput: any = this.el.querySelector('#admin-listing-search');

    if (searchInput.value !== this.searchParams.search_query) {
      this.searchParams.search_query = searchInput.value;
    }

    this.searchParams.offset = 0;

    this.renderListings();
  }

  async toggleBoolean(listing, attribute) {
    const data = { id: listing.id };
    data[attribute] = !listing[attribute];

    try {
      const apartment: any = await APIApartmentsService.updateApt(data);

      const listings = this.listings.map(l => {
        if (l.id === apartment.id) {
          return apartment;
        }

        return l;
      });

      this.listings = listings;

      if (attribute === 'is_active') {
        if (apartment.is_active) {
          this.activeCount++;
          this.inactiveCount--;
        } else {
          this.activeCount--;
          this.inactiveCount++;
        }
      }

    } catch (err) {
      ToastService.error(err.message);
    }
  }

  async infiniteScroll() {
    this.searchParams.offset = this.listings.length;

    try {
      const results = await this.fetchListings();

      if (results.results) {
        this.listings = [...this.listings, ...results.results];
      }
    } catch(err) {
        ToastService.error(`Could not retrieve listings: ${err.message}`);
    }
  }

  goTo(path) {
    RouterService.forward(path);
  }

  @Debounce(100)
  listingsScroll(e) {
    const distance = e.target.scrollHeight - e.target.clientHeight - e.target.scrollTop;
    if (distance > 300) {
      return;
    }

    this.infiniteScroll();
  }

  async deleteListing(id) {
    try {
      if (!await AlertService.confirm('Deleting this is a permanent action, are you sure you want to delete the apartment?', 'Are you sure?')) {
        return;
      }

      const result: any = await APIApartmentsService.deleteApt(id);

      if (result.success) {
        const listings = this.listings.filter(l => l.id !== id);

        this.listings = listings;

        ToastService.success('Apartment has been deleted');
      }
      else {
        if (result.errors) {
          ToastService.error(result.errors.join('\n'));
          return;
        }

        if (result.message) {
          ToastService.error(result.message);
        }
      }
    } catch (err) {
      ToastService.error(err.message);
    }
  }

  getTableHeight() {
    if (!this.listingsWrapper) {
      return '500px';
    }

    // magic # 150 to account for admin header height
    return `${this.screenHeight - this.listingsWrapper.offsetTop - 150}px`;
  }

  updateApt(apt) {
    const listings = this.listings.map(l => l.id === apt.id ? apt : l);

    this.listings = listings;
    this.formFocus = null;
  }

  changeSearchType() {
    this.searchParams = {...this.searchParams, search_type: this.searchTypeInput.value };
  }

  setActiveFilter(val) {
    this.searchParams = {...this.searchParams, active: val};
    this.search();
  }

  setSort(sort, month = null) {
    this.searchParams = {...this.searchParams, sortBy: sort};

    if (month !== null) {
      this.searchParams = {...this.searchParams, price_month: month};
    }

    this.search();
  }

  render() {
    return [
      <admin-header />,
      <ion-content class="page-admin-listings">

        <h2 class="text-center">Listings</h2>

        <section class="section full">
          {
            this.loaded ?
              <div class="listings-totals text-right">
                Total Listings: {this.activeCount + this.inactiveCount} <br />
                Total Active Listings: {this.activeCount} <br />
              </div>
            : null
          }

          <form class="search" onSubmit={e => this.search(e) }>
            <label htmlFor="admin-listing-search" class="sr-only">Search</label>
            <input id="admin-listing-search" type="text" class="apt212-input" name="search_query" placeholder="search"/>

            <select
              name="search_by"
              class="apt212-input"
              onChange={() => this.changeSearchType()}
              ref={ el => this.searchTypeInput = el as HTMLSelectElement }
            >
              <option value="webid">Web ID</option>
              <option value="address">Address</option>
              <option value="owner">Owner</option>
            </select>
            <button type="submit" class="button-dark search-submit" aria-label="Search">
              <svg class="feather feather-search" viewBox="0 0 25 24" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><path d="M24,21.1886008 L18.6803754,15.9186997 C19.949079,14.3099652 20.6588954,12.3179013 20.6588954,10.238277 C20.6588954,5.14393658 16.472729,1 11.3303363,1 C6.18621089,1 2,5.14393658 2,10.238277 C2,15.3308573 6.18616646,19.4765539 11.3303363,19.4765539 C13.3071236,19.4765539 15.2318387,18.8457674 16.8196842,17.7010588 L22.1704099,23 L24,21.1886008 Z M11.3302919,16.9140717 C7.61273046,16.9140717 4.58934605,13.9182757 4.58934605,10.238365 C4.58934605,6.55849823 7.61268603,3.56265825 11.3302919,3.56265825 C15.0461205,3.56265825 18.0694605,6.55845423 18.0694605,10.238365 C18.0694605,12.2063608 17.1982293,14.0643123 15.6796059,15.3379854 C14.4664401,16.3537734 12.9218251,16.9140717 11.3302919,16.9140717 Z" fill="#ffffff"></path></g></svg>
            </button>

            <div class="flex-spacer" />

            <button
              type="button"
              class={{ 'button-dark': true, 'active-filter': true, 'inactive': this.searchParams.active !== 'all' }}
              onClick={() => this.setActiveFilter('all')}
            >
              All
            </button>

            <button
              type="button"
              class={{ 'button-dark': true, 'active-filter': true, 'inactive': this.searchParams.active !== 'active' }}
              onClick={() => this.setActiveFilter('active')}
            >
              Active
            </button>

            <button
              type="button"
              class={{ 'button-dark': true, 'active-filter': true, 'inactive': this.searchParams.active !== 'inactive' }}
              onClick={() => this.setActiveFilter('inactive')}
            >
              Inactive
            </button>

            <button type="button" class="button-dark add-new" aria-label="Add New" onClick={() => this.goTo('/admin/listing/add')}><ion-icon name="add-circle" /></button>
          </form>

        { this.loaded ?
          <div
            class="listings"
            onScroll={e => this.listingsScroll(e)}
            style={{ maxHeight: this.getTableHeight() }}
            ref={ el => this.listingsWrapper = el as HTMLElement }
          >
            <table class="data-table">
              <thead>
                <tr>
                  <th>
                    <button
                      class={{'button-reset': true, 'desc': this.searchParams.sortBy === 'webid_desc'}}
                      onClick={() => this.setSort(this.searchParams.sortBy === 'webid_desc' ? 'webid_asc' : 'webid_desc')}
                    >
                      Web Id <ion-icon src="/assets/images/icons/page_sort_arrow.svg" />
                    </button>
                  </th>
                  <th class="mobile-only">Info</th>
                  <th class="desktop-only">
                    <button
                      class={{'button-reset': true, 'desc': this.searchParams.sortBy === 'last_updated_desc'}}
                      onClick={() => this.setSort(this.searchParams.sortBy === 'last_updated_desc' ? 'last_updated_asc' : 'last_updated_desc')}
                    >
                      Last Updated
                      <ion-icon src="/assets/images/icons/page_sort_arrow.svg" />
                    </button>
                  </th>
                  <th class="desktop-only">Status</th>
                  <th class="desktop-only">
                    <button
                      class={{'button-reset': true, 'desc': this.searchParams.sortBy === 'owner_desc'}}
                      onClick={() => this.setSort(this.searchParams.sortBy === 'owner_desc' ? 'owner_asc' : 'owner_desc')}
                    >
                      Owner
                      <ion-icon src="/assets/images/icons/page_sort_arrow.svg" />
                    </button>
                  </th>
                  <th class="desktop-only">Address</th>
                  <th class="desktop-only">APT#</th>
                  <th class="desktop-only">
                    <button
                      class={{'button-reset': true, 'desc': this.searchParams.sortBy === 'bedrooms_desc'}}
                      onClick={() => this.setSort(this.searchParams.sortBy === 'bedrooms_desc' ? 'bedrooms_asc' : 'bedrooms_desc')}
                    >
                      BR
                      <ion-icon src="/assets/images/icons/page_sort_arrow.svg" />
                    </button>
                  </th>
                  <th class="desktop-only">
                    <button
                      class={{'button-reset': true, 'desc': this.searchParams.sortBy === 'bathrooms_desc'}}
                      onClick={() => this.setSort(this.searchParams.sortBy === 'bathrooms_desc' ? 'bathrooms_asc' : 'bathrooms_desc')}
                    >
                      Bath
                      <ion-icon src="/assets/images/icons/page_sort_arrow.svg" />
                    </button>
                  </th>
                  <th class="desktop-only">
                    <button
                      class={{'button-reset': true, 'desc': this.searchParams.sortBy === 'availability_desc'}}
                      onClick={() => this.setSort(this.searchParams.sortBy === 'availability_desc' ? 'availability_asc' : 'availability_desc')}
                    >
                      Availability
                      <ion-icon src="/assets/images/icons/page_sort_arrow.svg" />
                    </button>
                  </th>
                  <th class="desktop-only">
                    <button
                      class={{'button-reset': true, 'desc': this.searchParams.sortBy === 'price_desc'}}
                      onClick={() => this.setSort(this.searchParams.sortBy === 'price_desc' ? 'price_asc' : 'price_desc')}
                    >
                      Price
                      <ion-icon src="/assets/images/icons/page_sort_arrow.svg" />
                    </button>
                  </th>

                  {
                    [...Array(12).keys()].map(m => {
                      const date = new Date(new Date().setDate(1)).setMonth(m);
                      return(
                        <th class="desktop-only">
                          <button
                            class={{'button-reset': true, 'desc': (this.searchParams.sortBy === 'price_month_desc' && this.searchParams.price_month === m)}}
                            onClick={() => this.setSort(this.searchParams.sortBy === 'price_month_desc' ? 'price_month_asc' : 'price_month_desc', m)}
                          >
                            { formatDate(date, 'MMM') }
                            <ion-icon src="/assets/images/icons/page_sort_arrow.svg" />
                          </button>
                        </th>
                      )
                    })
                  }
                  <th class="desktop-only">Featured 1</th>
                  <th class="desktop-only">Featured 2</th>
                  <th class="desktop-only">Featured 3</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {
                  this.listings.map(l => {
                    const bedroomType = taxonomySelectors.getBedroomTypeById(l.bedroom_type_id, this.bedroomTypes);

                    return (
                      <tr>
                        <td>{ l.id }</td>
                        <td class="mobile-only">
                          <div>{ l.apartment_number ? l.apartment_number + ' ' : '' }{ l.address }</div>
                          { bedroomType ? <div>BD: { bedroomType.name }</div> : '' }
                          <div>BA: { l.bathrooms }</div>
                          <div>{ formatMoney(l.rate) }</div>
                          <div>{ formatDate(l.available_date) }</div>
                        </td>
                        <td class="desktop-only">{ formatDate(l.updated_at) }</td>
                        <td class="desktop-only">
                          <button class={{'button-dark': true, 'inactive': !l.is_active }} onClick={() => this.toggleBoolean(l, 'is_active')}>{ l.is_active ? 'Active' : 'Inactive' }</button>
                        </td>
                        <td>{ l.owner_name }</td>
                        <td class="desktop-only">{ l.address }</td>
                        <td class="desktop-only">{ l.apartment_number }</td>
                        <td class="desktop-only">{ bedroomType ? bedroomType.name : '' }</td>
                        <td class="desktop-only">{ l.bathrooms }</td>
                        <td class="desktop-only">
                          {
                            this.formFocus === `available_date-${l.id}` ?
                              <listing-availability-form item={l} onUpdateSuccess={e => this.updateApt(e.detail)} />
                            :
                              <button class="button-reset" onClick={() => this.formFocus = `available_date-${l.id}`}>
                                { formatDate(l.available_date) }
                              </button>
                          }
                        </td>
                        <td class="desktop-only">{ formatMoney(l.rate) }</td>

                        {
                          [...new Array(12).keys()].map(m => {

                            return (
                              <td class="desktop-only">
                                {
                                  this.formFocus === `monthly_rate-${l.id}-${m}` ?
                                    <listing-monthly-rate-form item={l} month={m} onUpdateSuccess={e => this.updateApt(e.detail)}/>
                                  :
                                    <button class="button-reset" onClick={() => this.formFocus = `monthly_rate-${l.id}-${m}`}>
                                      {formatMoney(l.rates.find(r => r.month == m).monthly_rate)}
                                    </button>
                                }
                              </td>
                            );
                          })
                        }

                        <td class="desktop-only">
                          <button
                            class={{'button-dark': true, 'inactive': !l.feature_1 }}
                            onClick={() => this.toggleBoolean(l, 'feature_1')}
                          >
                            {l.feature_1 ? 'On' : 'Off' }
                          </button>
                        </td>

                        <td class="desktop-only">
                          <button
                            class={{'button-dark': true, 'inactive': !l.feature_2 }}
                            onClick={() => this.toggleBoolean(l, 'feature_2')}
                          >
                            {l.feature_2 ? 'On' : 'Off' }
                          </button>
                        </td>

                        <td class="desktop-only">
                          <button
                            class={{'button-dark': true, 'inactive': !l.feature_3 }}
                            onClick={() => this.toggleBoolean(l, 'feature_3')}
                          >
                            {l.feature_3 ? 'On' : 'Off' }
                          </button>
                        </td>

                        <td class="no-wrap">
                          <button class="button-dark" onClick={() => this.deleteListing(l.id)}>
                            <ion-icon name="trash" />
                          </button>
                          <button class="button-dark" onClick={() => this.goTo(`/admin/listing/edit/${l.id}`)}>
                            <ion-icon name="settings" />
                          </button>

                          <div class="toggle-active">
                            <button class="button-dark" onClick={() => this.toggleBoolean(l, 'is_active')}>{ l.is_active ? 'Active' : 'Inactive' }</button>
                          </div>
                        </td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
          </div>
          : <div class="text-center"><ion-spinner name="lines" /></div>
        }
        </section>
      </ion-content>
    ]
  }
}
