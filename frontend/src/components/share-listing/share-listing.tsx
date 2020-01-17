import { Component, h, Prop, State, Element } from '@stencil/core';
import { EnvironmentConfigService } from '../../services/environment/environment-config.service';
import Clipboard from 'clipboard';
import { ToastService } from '../../services/toast.service';

@Component({
  tag: 'share-listing',
  styleUrl: 'share-listing.scss'
})
export class ShareListing {
  @Element() el: HTMLElement;
  @Prop() item!: any;
  @State() view: string = 'email';

  clipboard: any;

  submitForm(e) {
    e.preventDefault();
  }

  componentDidLoad() {
    this.clipboard = new Clipboard(this.el.querySelector('.copytext'));

    this.clipboard.on('success', () => {
      return ToastService.success('The link has been copied to your clipboard');
    });

    this.clipboard.on('error', () => {
      return ToastService.error('There was an issue copying the link');
    });
  }


  render() {
    return (
      <div class="share-listing-component">
        <h2 class="text-center">Share Apartment</h2>

        <div class="share-nav">
          <button class="button-reset has-icon" aria-label="Send Email" onClick={() => this.view = 'email'}>
            <img src="/assets/images/icons/email.svg" />Send Email
          </button>

          <button class="button-reset has-icon" aria-label="Copy Link" onClick={() => this.view = 'copylink'}>
            <img src="/assets/images/icons/link.svg" />Copy Link
          </button>
        </div>

        <form onSubmit={e => this.submitForm(e)} class={{ hidden: this.view !== 'email'}}>
          <label htmlFor="share-listing-email">Send To</label>
          <div class="email-input">
            <input id="share-listing-email" type="email" name="email" placeholder="Enter the recipient's email address" />
            <img src="/assets/images/icons/email.svg" role="presentation" alt="" />
          </div>

          <label htmlFor="share-listing-message">Message</label>
          <textarea id="share-listing-message" placeholder="Enter your message"></textarea>

          <input type="submit" class="button-dark submit" value="SEND" />
        </form>

        <form onSubmit={e => e.preventDefault()} class={{ hidden: this.view !== 'copylink' }}>
          <label htmlFor="share-listing-copytext" class="sr-only" />
          <input id="share-listing-copytext" type="text" value={ EnvironmentConfigService.getInstance().get('BASE_URL') + '/listing/' + this.item.id} readOnly class="text" />

          <input type="submit" class="button-dark submit copytext" value="COPY LINK" data-clipboard-target="#share-listing-copytext" />
        </form>
      </div>
    )
  }
}
