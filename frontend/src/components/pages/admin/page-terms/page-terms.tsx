import { Component, h, State, Prop } from '@stencil/core';
import { Store } from '@stencil/redux';

@Component({
  tag: 'page-terms',
  styleUrl: 'page-terms.scss',
})
export class PageTerms {
  @Prop({ context: 'store' }) store: Store;

  @State() isLoggedIn: boolean = false;

  render() {
    return (
      <div class='page-terms'>
        <referral-header />
        <div class='page-terms-content'>
          <div class='content'>
            <h1>Terms and Conditions</h1>
            
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </p>
          </div>
        </div>
      </div>
    );
  }
}
