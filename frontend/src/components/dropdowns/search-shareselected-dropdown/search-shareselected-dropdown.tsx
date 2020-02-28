import { Component, h, Prop, State, Element } from '@stencil/core';
import { Store, Action } from "@stencil/redux";
import { searchFilterSelectors, searchSelectors } from '../../../store/selectors/search';
import { setSortbyFilter } from '../../../store/actions/search';
import { addToWishlist } from '../../../store/actions/wishlist';

@Component({
  tag: 'search-shareselected-dropdown',
  styleUrl: 'search-shareselected-dropdown.scss'
})
export class SearchShareSelectedDropdown {
  @Prop({ context: "store" }) store: Store;
  @Element() el: HTMLElement;
  @State() sortBy: any;

  setSortbyFilter: Action;
  addToWishlistAction: Action;
  selectedItems: any[] = [];
  listings: any[] = [];

  componentWillLoad() {
    this.store.mapStateToProps(this, state => {
      return {
        sortBy: searchFilterSelectors.getSortBy(state),
        selectedItems: searchSelectors.getSelectedListings(state),
        listings: searchSelectors.getListings(state)
      };
    });

    this.store.mapDispatchToProps(this, {
      setSortbyFilter,
      addToWishlistAction: addToWishlist
    });
  }

  addToWishlist() {
    if (this.selectedItems.length) {
      this.addToWishlistAction(this.selectedItems);
    }

    // close the dropdown
    const dropdown: any = this.el.closest('apt212-popover');
    if (dropdown) {
      dropdown.dismiss();
    }
  }

  shareApartments() {
    const apts = this.listings.filter(l => this.selectedItems.includes(l.id));

    if (!apts.length) {
      return;
    }

    const modal = Object.assign(document.createElement('ion-modal'), {
      component: 'apt212-modal-booking-frame',
      cssClass: 'share-listing-modal',
      componentProps: {
        component: 'share-listing',
        componentProps: {
          items: apts
        }
      }
    });

    document.body.appendChild(modal);
    return modal.present();
  }

  render() {

    return (
      <div class="search-shareselected-dropdown-component">
        <button class="button-reset share-button has-icon" onClick={() => this.shareApartments() }>
        <svg width="10px" height="10px" viewBox="0 0 10 10" version="1.1">
            <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <g transform="translate(-406.000000, -231.000000)" fill="#000000">
                    <g transform="translate(395.000000, 215.000000)">
                        <path d="M16.5001495,17.6677643 L16.5001495,22.3420069 C16.5001495,22.6109111 16.2779649,22.8290525 16.0000061,22.8290525 C15.7239193,22.8290525 15.4998627,22.6109111 15.4998627,22.3420069 L15.4998627,17.6660082 L14.9355095,18.2170692 C14.7419199,18.4059425 14.4278664,18.4054859 14.2314689,18.2138672 C14.0360074,18.0231676 14.0374113,17.713569 14.228187,17.5269786 L15.6489398,16.1413067 C15.7450302,16.0470995 15.8711244,16 15.9976722,16 L16.0014221,16.0013721 C16.1284499,16.0018298 16.2545417,16.0484751 16.3496865,16.141309 L17.7699605,17.5269809 C17.9635501,17.7158542 17.9635501,18.0222568 17.7671478,18.2138696 C17.5716863,18.4045692 17.2538889,18.4031994 17.0631072,18.2170715 L16.5001495,17.6677643 Z M12.000299,25.0241413 L19.9997132,25.0241413 L19.9997132,21.6074931 C19.9997132,21.3390455 20.2218979,21.1218289 20.4998566,21.1218289 C20.7759434,21.1218289 21,21.3408835 21,21.6074931 L21,25.5143245 C21,25.6483141 20.9442211,25.7695077 20.8542288,25.8573119 C20.7628255,25.9455741 20.63814,26 20.5003366,26 L11.4996756,26 C11.3618722,26 11.2376523,25.9460365 11.1471871,25.8582367 C11.0562529,25.7686039 11,25.6474127 11,25.5143362 L11,21.6075048 C11,21.3390572 11.2221849,21.1218289 11.5001436,21.1218289 C11.7762305,21.1218289 12.000287,21.3408952 12.000287,21.6075048 L12.000299,25.0241413 Z"></path>
                    </g>
                </g>
            </g>
        </svg>

          Share
        </button>
        <button class="button-reset share-button has-icon" onClick={() => this.addToWishlist()}>
          <svg width="24px" height="21px" viewBox="0 0 24 21" version="1.1">
              <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                  <path d="M11.2942512,20.706402 C11.481373,20.8946538 11.734761,21 11.9998503,21 C12.2649396,21 12.5183275,20.8946563 12.7054493,20.706402 L22.0293571,11.3758373 C23.2865914,10.1312294 23.9951096,8.43611158 24,6.66673282 C24.0048474,4.89737903 23.304106,3.19913998 22.0537079,1.94789005 C20.8033098,0.69664012 19.1066634,-0.00484389915 17.3387362,-3.55271368e-15 C15.5708338,0.00490191699 13.8769819,0.714019285 12.6334948,1.97226083 L12,2.60627574 L11.3665052,1.97226083 C10.1229183,0.713994315 8.42919104,0.00489442597 6.66126377,-3.55271368e-15 C4.89336144,-0.00485139017 3.19651552,0.69646533 1.94629179,1.94789005 C0.69606831,3.19931477 -0.00484025562,4.89735406 0,6.66673282 C0.00489806465,8.43608661 0.713433468,10.1313293 1.97064258,11.3758373 L11.2942512,20.706402 Z M6.66785046,2.02180144 C7.90168206,2.01887495 9.08484107,2.50949177 9.95420921,3.38539169 L11.2942761,4.72655882 L11.2942761,4.72558249 C11.481398,4.9138343 11.7347859,5.0191805 11.9998752,5.0191805 C12.2649645,5.0191805 12.5183524,4.9138368 12.7054743,4.72558249 L14.0455412,3.38441536 L14.0455412,3.38539169 C14.9099943,2.48022685 16.1029086,1.96132394 17.3533566,1.94766532 C18.6047278,1.93303536 19.8083454,2.42464349 20.693357,3.3093079 C21.5773206,4.19497111 22.068503,5.39957696 22.0538825,6.65205042 C22.0402401,7.90347514 21.5217579,9.09736883 20.6173356,9.96258156 L12,18.5869921 L3.38266434,9.96258156 C2.51137509,9.08960314 2.02213876,7.90742041 2.02213876,6.67352468 C2.02213876,5.43962894 2.51137509,4.25747119 3.38266434,3.38446779 C4.25395359,2.5124632 5.43613957,2.02185138 6.6680251,2.02185138 L6.66785046,2.02180144 Z"></path>
              </g>
          </svg>

          Add to wishlist
        </button>
      </div>
    )
  }
}
