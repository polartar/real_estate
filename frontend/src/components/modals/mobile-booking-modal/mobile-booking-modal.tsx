import { Component, h, Element, State, Prop } from '@stencil/core';
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
    const modal: any = this.el.closest('ion-modal');
    if (modal) {
      modal.dismiss();
    }
  }

  goBack() {
    switch (this.view) {
      default:
        this.view = 'booking';
      break;
    }
  }

  render() {
    return (
      <ion-content>
        <div class="mobile-booking-modal-component">
          <div class="modal-nav">
            {
              this.view !== 'booking' ?
              <button aria-label="Back" class="close button-reset" onClick={() => this.goBack()}>
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
            this.view === 'booking' ? <booking-mobile-body item={this.item} /> : null
          }

          {
            this.view === 'share' ? <share-listing item={this.item} /> : null
          }


          {
            this.view === 'booking' ?
            <div class="wishlist-share">
              <button aria-label="Add to wishlist" class="button-reset has-icon" onClick={() => this.toggleWishlist()}>
                <img src="/assets/images/icons/heart_icon.svg" class="wishlist-icon" /> { this.wishlist.includes(this.item.id) ? 'Remove from wishlist' : 'Add to wishlist' }
              </button>

              <div class="flex-spacer" />

              <button aria-label="Share listing" class="button-reset has-icon" onClick={() => this.view = 'share' }>
                <img src="/assets/images/icons/share.svg" class="share-icon" /> Share
              </button>
            </div>
            : null
          }

        </div>
      </ion-content>
    )
  }
}
