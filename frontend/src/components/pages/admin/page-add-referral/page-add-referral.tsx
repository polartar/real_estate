import { Component, h, State, Prop } from '@stencil/core';
import { Store } from '@stencil/redux';

@Component({
  tag: 'page-add-referral',
  styleUrl: 'page-add-referral.scss',
})
export class PageAddReferal {
  @Prop({ context: 'store' }) store: Store;

  @State() isLoggedIn: boolean = false;

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
