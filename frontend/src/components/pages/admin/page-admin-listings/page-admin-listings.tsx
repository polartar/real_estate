import { Component, h, Prop, State, Element } from '@stencil/core';
import { Store } from '@stencil/redux';
import authSelectors from '../../../../store/selectors/auth';
import taxonomySelectors from '../../../../store/selectors/taxonomy'
import { APIAdminService } from '../../../../services/api/admin';
import { APIApartmentsService } from '../../../../services/api/apartments';
import { formatDate, formatMoney} from '../../../../helpers/utils';
import { ToastService } from '../../../../services/toast.service';
import { RouterService } from '../../../../services/router.service';
import { AlertService } from '../../../../services/alerts.service';

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
  @State() listings: any[];
  @State() searchParams: any = {
    sortBy: 'webid_asc',
    text: '',
    offset: 0,
    limit: this.pageSize
  };

  @State() resultCount: number = 0;

  componentWillLoad() {
    this.store.mapStateToProps(this, state => {
      return {
        isLoggedIn: authSelectors.isLoggedIn(state),
        isAdmin: authSelectors.isAdmin(state),
        bedroomTypes: taxonomySelectors.getBedroomTypes(state),
        buildingTypes: taxonomySelectors.getBuildingTypes(state)
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

  async renderListings() {
    try {
      const result = await this.fetchListings();

      this.listings = result.results;
      this.resultCount = result.total;

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

  search(e) {
    e.preventDefault();

    const searchInput: any = this.el.querySelector('#admin-listing-search');

    if (searchInput.value !== this.searchParams.text) {
      this.searchParams.text = searchInput.value;
      this.searchParams.offset = 0;

      this.renderListings();
    }
  }

  async toggleActive(listing) {
    const data = { id: listing.id, is_active: !listing.is_active };

    try {
      const apartment: any = await APIApartmentsService.updateApt(data);

      const listings = this.listings.map(l => {
        if (l.id === apartment.id) {
          return apartment;
        }

        return l;
      });

      this.listings = listings;

    } catch (err) {
      ToastService.error(err.message);
    }
  }

  async infiniteScroll(e) {
    this.searchParams.offset = this.listings.length;

    try {
      const results = await this.fetchListings();

      if (results.results) {
        this.listings = [...this.listings, ...results.results];
      }
    } catch(err) {
        ToastService.error(`Could not retrieve listings: ${err.message}`);
    }

    e.target.complete();
  }

  goTo(path) {
    RouterService.forward(path);
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

  render() {
    return [
      <admin-header />,
      <ion-content class="page-admin-listings">

        <h2 class="text-center">Listings</h2>

        <section class="section">

          <form class="search" onSubmit={e => this.search(e) }>
            <label htmlFor="admin-listing-search" class="sr-only">Search</label>
            <input id="admin-listing-search" type="text" class="apt212-input" name="search" placeholder="search"/>
            <button type="submit" class="button-dark search-submit" aria-label="Search">
              <svg class="feather feather-search" viewBox="0 0 25 24" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><path d="M24,21.1886008 L18.6803754,15.9186997 C19.949079,14.3099652 20.6588954,12.3179013 20.6588954,10.238277 C20.6588954,5.14393658 16.472729,1 11.3303363,1 C6.18621089,1 2,5.14393658 2,10.238277 C2,15.3308573 6.18616646,19.4765539 11.3303363,19.4765539 C13.3071236,19.4765539 15.2318387,18.8457674 16.8196842,17.7010588 L22.1704099,23 L24,21.1886008 Z M11.3302919,16.9140717 C7.61273046,16.9140717 4.58934605,13.9182757 4.58934605,10.238365 C4.58934605,6.55849823 7.61268603,3.56265825 11.3302919,3.56265825 C15.0461205,3.56265825 18.0694605,6.55845423 18.0694605,10.238365 C18.0694605,12.2063608 17.1982293,14.0643123 15.6796059,15.3379854 C14.4664401,16.3537734 12.9218251,16.9140717 11.3302919,16.9140717 Z" fill="#ffffff"></path></g></svg>
            </button>

            <div class="flex-spacer" />

            <button type="button" class="button-dark add-new" aria-label="Add New" onClick={() => this.goTo('/admin/listing/add')}><ion-icon name="add-circle" /></button>
          </form>

        { this.loaded ?
          <div class="listings">
            <table class="data-table">
              <thead>
                <tr>
                  <td>Web Id</td>
                  <td class="mobile-only">Info</td>
                  <td class="desktop-only">Address</td>
                  <td class="desktop-only">APT#</td>
                  <td class="desktop-only">BR</td>
                  <td class="desktop-only">Bath</td>
                  <td class="desktop-only">Building Type</td>
                  <td class="desktop-only">Price</td>
                  <td class="desktop-only">Available</td>
                  <td class="desktop-only">Status</td>
                  <td>Action</td>
                </tr>
              </thead>

              <tbody>
                {
                  this.listings.map(l => {
                    const bedroomType = taxonomySelectors.getBedroomTypeById(l.bedroom_type_id, this.bedroomTypes);
                    const buildingType = taxonomySelectors.getBuildingTypeById(l.building_type_id, this.buildingTypes);

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
                        <td class="desktop-only">{ l.address }</td>
                        <td class="desktop-only">{ l.apartment_number }</td>
                        <td class="desktop-only">{ bedroomType ? bedroomType.name : '' }</td>
                        <td class="desktop-only">{ l.bathrooms }</td>
                        <td class="desktop-only">{ buildingType ? buildingType.name : '' }</td>
                        <td class="desktop-only">{ formatMoney(l.rate) }</td>
                        <td class="desktop-only">{ formatDate(l.available_date) }</td>
                        <td class="desktop-only">
                          <button class="button-dark" onClick={() => this.toggleActive(l)}>{ l.is_active ? 'Active' : 'Inactive' }</button>
                        </td>
                        <td class="no-wrap">
                          <button class="button-dark" onClick={() => this.deleteListing(l.id)}>
                            <ion-icon name="trash" />
                          </button>
                          <button class="button-dark" onClick={() => this.goTo(`/admin/listing/edit/${l.id}`)}>
                            <ion-icon name="settings" />
                          </button>

                          <div class="toggle-active">
                            <button class="button-dark" onClick={() => this.toggleActive(l)}>{ l.is_active ? 'Active' : 'Inactive' }</button>
                          </div>
                        </td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>

            <ion-infinite-scroll threshold="100px" onIonInfinite={e => this.infiniteScroll(e)}>
                <ion-infinite-scroll-content
                  loading-spinner="lines"
                >
                </ion-infinite-scroll-content>
            </ion-infinite-scroll>
          </div>
          : <div class="text-center"><ion-spinner name="lines" /></div>
        }
        </section>
      </ion-content>
    ]
  }
}
