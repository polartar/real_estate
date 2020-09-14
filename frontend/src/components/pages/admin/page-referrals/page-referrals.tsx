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
  tag: 'page-referrals',
  styleUrl: 'page-referrals.scss',
})
export class PageReferrals {
  @Prop({ context: 'store' }) store: Store;

  @State() isAdmin: boolean = false;
  @State() isLoggedIn: boolean = false;
  @State() loaded: boolean = false;
  @State() referrals: any[] = [];
  @State() user: any = null   ;

  @State() screenHeight: number;

  @State() resultCount: number = 0;

  referralsWrapper: HTMLElement;
  // searchInput: HTMLInputElement;

  componentWillLoad() {
    this.store.mapStateToProps(this, (state) => {
      return {
        isLoggedIn: authSelectors.isLoggedIn(state),
        isAdmin: authSelectors.isAdmin(state),
        screenHeight: screenSizeSelectors.getHeight(state),
        user: authSelectors.getUser(state),
      };
    });

    if (!this.isLoggedIn) {
      RouterService.forward('/login');
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
      const result = await APIAdminService.getReferrals(this.user.id);

      return result;
    } catch (err) {
      return ToastService.error(`Could not retrieve referrals: ${err.message}`);
    }
  }

  getTableHeight() {
    if (!this.referralsWrapper) {
      return '500px';
    }

    // magic # 150 to account for admin header height
    return `${this.screenHeight - this.referralsWrapper.offsetTop - 150}px`;
  }

  async infiniteScroll() {
    // this.searchParams.offset = this.referrals.length;

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
      <div class='page-referrals'>
        <referral-header />

        <div class='tbl-container'>
          <table>
            <thead>
              <tr>
                <th>Agent I Am Working With</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Market</th>
                <th>Details</th>
                <th>Created Date</th>
                <th>Progress</th>
              </tr>
            </thead>

            <tbody>
              {this.referrals.map((r) => {
                return (
                  <tr>
                    <td>{r.referrer_agent}</td>
                    <td>{r.referral_name}</td>
                    <td>{r.referral_email}</td>
                    <td>{r.referral_phone}</td>
                    <td>&nbsp;</td>
                    <td>{r.referral_details}</td>
                    <td>{formatDate(r.created_at)}</td>
                    <td>&nbsp;</td>
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
