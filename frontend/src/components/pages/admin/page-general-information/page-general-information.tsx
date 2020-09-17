import { Component, h, State, Prop } from '@stencil/core';
import { Store } from '@stencil/redux';
import authSelectors from '../../../../store/selectors/auth';
import { RouterService } from '../../../../services/router.service';

@Component({
  tag: 'page-general-information',
  styleUrl: 'page-general-information.scss',
})
export class PageGeneral {
  @Prop({ context: 'store' }) store: Store;

  @State() isLoggedIn: boolean = false;

  componentWillLoad() {
    this.store.mapStateToProps(this, (state) => {
      return {
        isLoggedIn: authSelectors.isLoggedIn(state),
      };
    });

    if (!this.isLoggedIn) {
      RouterService.forward('/login');
    } 
  }

  render() {
    return (
      <div class='page-general'>
        <referral-header />

        <div class='page-general-content'>
          <div class='form'>
            <general-information-form />
          </div>
        </div>
      </div>
    );
  }
}
