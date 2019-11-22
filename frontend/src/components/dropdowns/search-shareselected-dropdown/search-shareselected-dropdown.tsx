import { Component, h, Prop, State, Element } from '@stencil/core';
import { Store, Action } from "@stencil/redux";
import { searchFilterSelectors } from '../../../store/selectors/search';
import { setSortbyFilter } from '../../../store/actions/search';

@Component({
  tag: 'search-shareselected-dropdown',
  styleUrl: 'search-shareselected-dropdown.scss'
})
export class SearchShareSelectedDropdown {
  @Prop({ context: "store" }) store: Store;
  @Element() el: HTMLElement;
  @State() sortBy: any;

  setSortbyFilter: Action;

  componentWillLoad() {
    this.store.mapStateToProps(this, state => {
      return {
        sortBy: searchFilterSelectors.getSortBy(state)
      }
    });

    this.store.mapDispatchToProps(this, {
      setSortbyFilter
    });
  }

  select(value) {
    if (value === this.sortBy) {
      return;
    }

    this.setSortbyFilter(value);

    // close the dropdown
    const dropdown: any = this.el.closest('apt212-popover');
    if (dropdown) {
      dropdown.dismiss();
    }
  }

  render() {

    return (
      <div class="search-shareselected-dropdown-component">
        <button class="button-reset share-button has-icon">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path d="M296 384h-80c-13.3 0-24-10.7-24-24V192h-87.7c-17.8 0-26.7-21.5-14.1-34.1L242.3 5.7c7.5-7.5 19.8-7.5 27.3 0l152.2 152.2c12.6 12.6 3.7 34.1-14.1 34.1H320v168c0 13.3-10.7 24-24 24zm216-8v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h136v8c0 30.9 25.1 56 56 56h80c30.9 0 56-25.1 56-56v-8h136c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"/>
        </svg>

          Share
        </button>
        <button class="button-reset share-button has-icon">
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
