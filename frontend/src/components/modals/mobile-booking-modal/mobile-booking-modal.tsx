import { Component, h, Element, State, Prop, Host } from '@stencil/core';
import { Store, Action } from '@stencil/redux';
import wishlistSelectors from '../../../store/selectors/wishlist';
import { addToWishlist, removeFromWishlist} from '../../../store/actions/wishlist';

@Component({
  tag: 'mobile-booking-modal',
  styleUrl: 'mobile-booking-modal.scss'
})
export class MobileBookingModal {
  @Prop({ context: "store" }) store: Store;
  @Element() el: HTMLElement;
  @Prop() item!: any;
  @State() view: string = 'booking';

  @State() wishlist: any[];
  addToWishlist: Action;
  removeFromWishlist: Action;

  componentWillLoad() {
    this.store.mapStateToProps(this, state => {
      return {
        wishlist: wishlistSelectors.getWishlist(state)
      }
    });

    this.store.mapDispatchToProps(this, {
      addToWishlist,
      removeFromWishlist
    })
  }

  toggleWishlist() {
    if (this.wishlist.includes(this.item.id)) {
      this.removeFromWishlist([this.item.id]);
    }
    else {
      this.addToWishlist([this.item.id]);
    }
  }

  closeModal() {
    if (this.view !== 'booking') {
      this.setView('booking');
      return;
    }

    const modal: any = this.el.closest('ion-modal');
    if (modal) {
      modal.dismiss();
    }
  }

  setView(view) {
    this.view = view;
  }

  showGuestInput() {
    const popover = Object.assign(document.createElement('apt212-popover'), {
      component: 'input-booking-guests',
      componentProps: {
        item: this.item
      },
      animateSrc: 'none',
      styleOverride: {
        top: '288px',
        left: '0',
        width: '100%',
        zIndex: '1',
        border: '1px solid black',
        transform: 'none'
      }
    });

    this.el.querySelector('.booking-start').appendChild(popover);
  }

  render() {
    return (
      <Host>
      <ion-content>
        <div class="mobile-booking-modal-component">
          <div class="modal-nav">
            {
              this.view !== 'booking' ?
              <button aria-label="Back" class="close button-reset" onClick={() => this.closeModal()}>
                <img src="/assets/images/icons/arrow.svg" class="back" />
              </button>
              : null
            }

            <div class="flex-spacer" />

            <button aria-label="close" class="close button-reset" onClick={() => this.closeModal()}>
              <img src="/assets/images/icons/cancel.svg" />
            </button>
          </div>

          {
            this.view === 'booking' ?
              <div class="booking-start">
                <booking-mobile-body
                  item={this.item}
                  onSetViewEvent={e => this.setView(e.detail)}
                  onShowGuestInput={() => this.showGuestInput() }
                />
              </div>
            : null
          }

          {
            this.view === 'share' ? <share-listing items={[this.item]} /> : null
          }

          {
            this.view === 'checkinInput' ? <div class="checkin-input">
              <div class="title">Check In Date</div>
              <input-booking-date item={this.item} type="checkin" calendarSize={1.5} />
              </div>
            : null
          }

          {
            this.view === 'checkoutInput' ? <div class="checkin-input">
                <div class="title">Check Out Date</div>
                <input-booking-date item={this.item} type="checkout" calendarSize={1.5} />
              </div>
            : null
          }

          {
            this.view === 'bookingDetails' ?
              <div class="booking-details">
                <booking-details item={this.item} />
              </div>
              : null
          }

          {
            this.view === 'seasonalRates' ? <seasonal-rates item={this.item} /> : null
          }

        </div>
      </ion-content>

      { this.view === 'booking' ?
        <ion-footer class="no-footer-border">
          <ion-toolbar>
            <div class="mobile-wishlist-share">
            <button aria-label="Add to wishlist" class="button-reset has-icon" onClick={() => this.toggleWishlist()}>
                    <img src="/assets/images/icons/heart_icon.svg" class="wishlist-icon" /> { this.wishlist.includes(this.item.id) ? 'Remove from wishlist' : 'Add to wishlist' }
                  </button>

                  <div class="flex-spacer" />

                  <button aria-label="Share listing" class="button-reset has-icon" onClick={() => this.setView('share') }>
                    <img src="/assets/images/icons/share.svg" class="share-icon" /> Share
                  </button>
                  </div>
          </ion-toolbar>
      </ion-footer>
      : null
      }
     </Host>
    )
  }
}
