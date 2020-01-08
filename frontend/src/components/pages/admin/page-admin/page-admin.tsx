import { Component, h, Prop, State } from '@stencil/core';
import { Store } from '@stencil/redux';
import authSelectors from '../../../../store/selectors/auth';
import { APIAdminService } from '../../../../services/api/admin';

@Component({
  tag: 'page-admin',
  styleUrl: 'page-admin.scss'
})
export class PageAdmin {
  @Prop({ context: "store" }) store: Store;
  isLoggedIn: boolean = false;
  @State() loaded: boolean = false;
  @State() counts: any[];

  componentWillLoad() {
    this.store.mapStateToProps(this, state => {
      return {
        isLoggedIn: authSelectors.isLoggedIn(state)
      }
    });

    if (!this.isLoggedIn) {
      const router: any = document.querySelector('ion-router');
      router.push('/login');
    }
  }

  componentDidLoad() {
    APIAdminService.getDashboardCounts()
      .then(counts => {
        this.counts = counts;
        this.loaded = true;
      })
      .catch(err => {
        const toast = document.createElement('ion-toast');
        toast.message = err.message;
        toast.duration = 2000;
        toast.color = 'danger';
        toast.showCloseButton = true;
        toast.mode = 'md';

        document.body.appendChild(toast);
        return toast.present();
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
