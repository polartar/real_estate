import { Component, h, State, Prop } from '@stencil/core';
import { Store } from '@stencil/redux';
import authSelectors from '../../../../store/selectors/auth';
import { RouterService } from '../../../../services/router.service';

@Component({
  tag: 'page-add-referral',
  styleUrl: 'page-add-referral.scss',
})
export class PageAddReferal {
  @Prop({ context: 'store' }) store: Store;

  @State() isAdmin: boolean = false;
  @State() isLoggedIn: boolean = false;
 
  componentWillLoad() {
    this.store.mapStateToProps(this, (state) => {
      return {
        isLoggedIn: authSelectors.isLoggedIn(state),
        isAdmin: authSelectors.isAdmin(state),
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

  render() {
    return (
      <div class='page-add-referral'>
        <referral-header />
        
        <div class='page-addreferral-content'>
          <div class='form'>
            <add-referral-form />
          </div>
        </div>
      </div>
    );
  }
}
