import { Component, h, Prop, State } from '@stencil/core';
import { Store } from '@stencil/redux';
import authSelectors from '../../../../store/selectors/auth';
import { APIAdminService } from '../../../../services/api/admin';
import { ToastService } from '../../../../services/toast.service';
import { RouterService } from '../../../../services/router.service';

@Component({
  tag: 'page-admin',
  styleUrl: 'page-admin.scss'
})
export class PageAdmin {
  @Prop({ context: "store" }) store: Store;

  @State() isAdmin: boolean = false;
  isLoggedIn: boolean = false;
  @State() loaded: boolean = false;
  @State() counts: any[];

  componentWillLoad() {
    this.store.mapStateToProps(this, state => {
      return {
        isLoggedIn: authSelectors.isLoggedIn(state),
        isAdmin: authSelectors.isAdmin(state)
      }
    });

    if (!this.isLoggedIn) {
      RouterService.forward('/login', {logout: true});
    }
    else {
      // we're logged in, but as admin?
      if (!this.isAdmin) {
        RouterService.forward('/');
      }
    }
  }

  componentDidLoad() {
    APIAdminService.getDashboardCounts()
      .then(counts => {
        this.counts = counts;
        this.loaded = true;
      })
      .catch(err => {
        ToastService.error(err.message);
      });
  }

  render() {
    return [
      <admin-header />,
      <ion-content class="page-admin">

        <h2 class="text-center">Admin Dashboard</h2>

        <section class="section">

        { this.loaded ?
          <div class="dashboard">
            {
              this.counts.map(c => <div class="count-block">
                <div class="count">{c.count}</div>
                <div class="title">{c.title}</div>
              </div>)
            }
          </div>
          : <div class="text-center"><ion-spinner name="lines" /></div>
        }
        </section>
      </ion-content>
    ]
  }
}
