import { Component, h, State, Prop } from '@stencil/core';
import { Store } from '@stencil/redux';
import authSelectors from '../../../../store/selectors/auth';
import screenSizeSelectors from '../../../../store/selectors/screensize';
import { RouterService } from '../../../../services/router.service';
import { ToastService } from '../../../../services/toast.service';
import { APIAdminService } from '../../../../services/api/admin';
import Debounce from 'debounce-decorator';
import { formatDate } from '../../../../helpers/utils';
import { AlertService } from '../../../../services/alerts.service';

@Component({
  tag: 'page-admin-referrals',
  styleUrl: 'page-admin-referrals.scss'
})
export class PageAdminReferrals {
  @Prop({ context: "store" }) store: Store;

  @State() isAdmin: boolean = false;
  @State() isLoggedIn: boolean = false;
  pageSize: number = 40;
  @State() loaded: boolean = false;
  @State() referrals: any[] = [];
  @State() searchParams: any = {
    query: '',
    sortBy: 'created_date_desc',
    offset: 0,
    limit: this.pageSize
  };
  @State() screenHeight: number;

  @State() resultCount: number = 0;

  referralsWrapper: HTMLElement;
  searchInput: HTMLInputElement;

  componentWillLoad() {
    this.store.mapStateToProps(this, state => {
      return {
        isLoggedIn: authSelectors.isLoggedIn(state),
        isAdmin: authSelectors.isAdmin(state),
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
    this.renderReferrals();
  }

  componentDidRender() {
    requestAnimationFrame(() => {
      if (this.referralsWrapper) {
        this.referralsWrapper.style.maxHeight = this.getTableHeight();
      }
    });
  }

  async renderReferrals() {
    try {
      const result = await this.fetchReferrals();

      this.referrals = result.results;
      this.resultCount = result.total;

      this.loaded = true;
    } catch(err) {
      // alright...
      ToastService.error(err.message);
    }
  }

  async fetchReferrals() {
    try {
      const result = await APIAdminService.getReferrals(this.searchParams);

      return result;

    } catch(err) {
      return ToastService.error(`Could not retrieve referrals: ${err.message}`);
    }
  }

  search(e?) {
    if (e) {
      e.preventDefault();
    }

    if (this.searchInput.value !== this.searchParams.search_query) {
      this.searchParams.query = this.searchInput.value;
    }

    this.searchParams.offset = 0;

    this.renderReferrals();
  }

  getTableHeight() {
    if (!this.referralsWrapper) {
      return '500px';
    }

    // magic # 150 to account for admin header height
    return `${this.screenHeight - this.referralsWrapper.offsetTop - 150}px`;
  }

  async infiniteScroll() {
    this.searchParams.offset = this.referrals.length;

    try {
      const results = await this.fetchReferrals();

      if (results.results) {
        this.referrals = [...this.referrals, ...results.results];
      }
    } catch(err) {
        ToastService.error(`Could not retrieve referrals: ${err.message}`);
    }
  }

  @Debounce(100)
  listingsScroll(e) {
    const distance = e.target.scrollHeight - e.target.clientHeight - e.target.scrollTop;
    if (distance > 300) {
      return;
    }

    this.infiniteScroll();
  }

  setSort(sort) {
    this.searchParams = {...this.searchParams, sortBy: sort};

    this.search();
  }

  async deleteReferral(id) {
    try {
      if (!await AlertService.confirm('Deleting this is a permanent action, are you sure you want to delete the referral?', 'Are you sure?')) {
        return;
      }

      const result: any = await APIAdminService.deleteReferral(id);

      if (result.success) {
        const referrals = this.referrals.filter(l => l.id !== id);

        this.referrals = referrals;

        ToastService.success('Referral has been deleted');
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
      <ion-content class="page-admin-referrals">

        <h2 class="text-center">Referrals</h2>

        <section class="section full">
          {
            this.loaded ?
              <div class="listings-totals text-right">
                Total Referrals: {this.resultCount}
              </div>
            : null
          }

          <form class="search" onSubmit={e => this.search(e) }>
            <label htmlFor="admin-listing-search" class="sr-only">Search</label>
            <input id="admin-listing-search" type="text" class="apt212-input" name="search_query" placeholder="search" ref={ el => this.searchInput = el as HTMLInputElement }/>

            <button type="submit" class="button-dark search-submit" aria-label="Search">
              <svg class="feather feather-search" viewBox="0 0 25 24" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><path d="M24,21.1886008 L18.6803754,15.9186997 C19.949079,14.3099652 20.6588954,12.3179013 20.6588954,10.238277 C20.6588954,5.14393658 16.472729,1 11.3303363,1 C6.18621089,1 2,5.14393658 2,10.238277 C2,15.3308573 6.18616646,19.4765539 11.3303363,19.4765539 C13.3071236,19.4765539 15.2318387,18.8457674 16.8196842,17.7010588 L22.1704099,23 L24,21.1886008 Z M11.3302919,16.9140717 C7.61273046,16.9140717 4.58934605,13.9182757 4.58934605,10.238365 C4.58934605,6.55849823 7.61268603,3.56265825 11.3302919,3.56265825 C15.0461205,3.56265825 18.0694605,6.55845423 18.0694605,10.238365 C18.0694605,12.2063608 17.1982293,14.0643123 15.6796059,15.3379854 C14.4664401,16.3537734 12.9218251,16.9140717 11.3302919,16.9140717 Z" fill="#ffffff"></path></g></svg>
            </button>
          </form>

          { this.loaded ?
          <div
            class="listings"
            onScroll={e => this.listingsScroll(e)}
            style={{ maxHeight: this.getTableHeight() }}
            ref={ el => this.referralsWrapper = el as HTMLElement }
          >
            <table class="data-table">
              <thead>
                <tr>
                  <th>
                    <button
                      class={{'button-reset': true, 'desc': this.searchParams.sortBy === 'referrer_name_desc'}}
                      onClick={() => this.setSort(this.searchParams.sortBy === 'referrer_name_desc' ? 'referrer_name_asc' : 'referrer_name_desc')}
                    >
                      User Name <ion-icon src="/assets/images/icons/page_sort_arrow.svg" />
                    </button>
                  </th>
                  <th>
                    <button
                      class={{'button-reset': true, 'desc': this.searchParams.sortBy === 'referrer_email_desc'}}
                      onClick={() => this.setSort(this.searchParams.sortBy === 'referrer_email_desc' ? 'referrer_email_asc' : 'referrer_email_desc')}
                    >
                      User Email
                      <ion-icon src="/assets/images/icons/page_sort_arrow.svg" />
                    </button>
                  </th>
                  <th>User Phone</th>
                  <th>
                    <button
                      class={{'button-reset': true, 'desc': this.searchParams.sortBy === 'referral_name_desc'}}
                      onClick={() => this.setSort(this.searchParams.sortBy === 'referral_name_desc' ? 'referral_name_asc' : 'referral_name_desc')}
                    >
                      Referral Name
                      <ion-icon src="/assets/images/icons/page_sort_arrow.svg" />
                    </button>
                  </th>
                  <th>
                    <button
                      class={{'button-reset': true, 'desc': this.searchParams.sortBy === 'referral_email_desc'}}
                      onClick={() => this.setSort(this.searchParams.sortBy === 'referral_email_desc' ? 'referral_email_asc' : 'referral_email_desc')}
                    >
                      Referral Email
                      <ion-icon src="/assets/images/icons/page_sort_arrow.svg" />
                    </button>
                  </th>
                  <th>
                    Referral Phone
                  </th>
                  <th>
                    <button
                      class={{'button-reset': true, 'desc': this.searchParams.sortBy === 'created_at_desc'}}
                      onClick={() => this.setSort(this.searchParams.sortBy === 'created_at_desc' ? 'created_at_asc' : 'created_at_desc')}
                    >
                      Created
                      <ion-icon src="/assets/images/icons/page_sort_arrow.svg" />
                    </button>
                  </th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {
                  this.referrals.map(r => {

                    return (
                      <tr>
                        <td>{ r.referrer_name }</td>
                        <td>{ r.referrer_email }</td>
                        <td>{ r.referrer_phone }</td>
                        <td>{ r.referral_name }</td>
                        <td>{ r.referral_email }</td>
                        <td>{ r.referral_phone }</td>
                        <td>{ formatDate(r.created_at) }</td>

                        <td>
                          <button class="button-dark" onClick={() => this.deleteReferral(r.id)}>
                            <ion-icon name="trash" />
                          </button>
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
