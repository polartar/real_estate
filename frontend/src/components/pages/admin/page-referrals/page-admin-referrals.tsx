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
  styleUrl: 'page-admin-referrals.scss',
})
export class PageAdminReferrals {
  @Prop({ context: 'store' }) store: Store;

  @State() isAdmin: boolean = false;
  @State() isLoggedIn: boolean = false;
  pageSize: number = 40;
  @State() loaded: boolean = false;
  @State() referrals: any[] = [];
  @State() searchParams: any = {
    query: '',
    sortBy: 'created_date_desc',
    offset: 0,
    limit: this.pageSize,
  };
  @State() screenHeight: number;

  @State() resultCount: number = 0;

  referralsWrapper: HTMLElement;
  searchInput: HTMLInputElement;

  componentWillLoad() {
    this.store.mapStateToProps(this, (state) => {
      return {
        isLoggedIn: authSelectors.isLoggedIn(state),
        isAdmin: authSelectors.isAdmin(state),
        screenHeight: screenSizeSelectors.getHeight(state),
      };
    });

    if (!this.isLoggedIn) {
      RouterService.forward('/login');
    } else {
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
    } catch (err) {
      // alright...
      ToastService.error(err.message);
    }
  }

  async fetchReferrals() {
    try {
      const result = await APIAdminService.getReferrals(this.searchParams);

      return result;
    } catch (err) {
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
    } catch (err) {
      ToastService.error(`Could not retrieve referrals: ${err.message}`);
    }
  }

  @Debounce(100)
  
  listingsScroll(e) {
    const distance =
      e.target.scrollHeight - e.target.clientHeight - e.target.scrollTop;
    if (distance > 300) {
      return;
    }

    this.infiniteScroll();
  }

  setSort(sort) {
    this.searchParams = { ...this.searchParams, sortBy: sort };

    this.search();
  }

  async deleteReferral(id) {
    try {
      if (
        !(await AlertService.confirm(
          'Deleting this is a permanent action, are you sure you want to delete the referral?',
          'Are you sure?'
        ))
      ) {
        return;
      }

      const result: any = await APIAdminService.deleteReferral(id);

      if (result.success) {
        const referrals = this.referrals.filter((l) => l.id !== id);

        this.referrals = referrals;

        ToastService.success('Referral has been deleted');
      } else {
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
      <div class='page-admin-referrals'>
        <referral-header />,

        <div class='tbl-container'>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Detail</th>
                <th>AgentName</th>
                <th>Submitted Date</th>
                <th>Progress</th>
                <th>Closed</th>
                <th>Paid</th>
              </tr>
            </thead>

            <tbody>
              {this.referrals.map((r) => {
                return (
                  <tr>
                    <td>{r.referrer_name}</td>
                    <td>{r.referrer_email}</td>
                    <td>{r.referrer_phone}</td>
                    <td>{r.referral_name}</td>
                    <td>{r.referral_email}</td>
                    <td>{r.referral_phone}</td>
                    <td>{formatDate(r.created_at)}</td>

                    <td>
                      <button
                        class='button-dark'
                        onClick={() => this.deleteReferral(r.id)}
                      >
                        <ion-icon name='trash' />
                      </button>
                    </td>

                    <td></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>,
    ];
  }
}
