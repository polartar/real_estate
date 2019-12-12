import { Component, h, Prop, State, Element } from '@stencil/core';
import { EnvironmentConfigService } from '../../services/environment/environment-config.service';
import Clipboard from 'clipboard';

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
    console.log('submitting');
  }

  componentDidLoad() {
    this.clipboard = new Clipboard(this.el.querySelector('.copytext'));

    this.clipboard.on('success', () => {
      // toast success
      const toast = document.createElement('ion-toast');
      toast.message = 'The link has been copied to your clipboard';
      toast.duration = 2000;
      toast.color = 'secondary';
      toast.showCloseButton = true;
      toast.mode = 'md';

      document.body.appendChild(toast);
      return toast.present();
    });

    this.clipboard.on('error', () => {
      // toast error
      const toast = document.createElement('ion-toast');
      toast.message = 'There was an issue copying the link';
      toast.duration = 2000;
      toast.color = 'danger';
      toast.showCloseButton = true;
      toast.mode = 'md';

      document.body.appendChild(toast);
      return toast.present();
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
          <input id="share-listing-email" type="email" name="email" placeholder="Enter the recipient's email address" />

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
