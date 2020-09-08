import { Component, h, State, Prop } from "@stencil/core";
import { Store } from "@stencil/redux";
import authSelectors from "../../../../store/selectors/auth";
import screenSizeSelectors from "../../../../store/selectors/screensize";
import { RouterService } from "../../../../services/router.service";

@Component({
  tag: "page-payout",
  styleUrl: "page-payout.scss",
})
export class PagePayout {
  @Prop({ context: "store" }) store: Store;

  @State() isAdmin: boolean = false;
  @State() isLoggedIn: boolean = false;
  pageSize: number = 40;
  @State() loaded: boolean = false;
  @State() referrals: any[] = [];
  @State() searchParams: any = {
    query: "",
    sortBy: "created_date_desc",
    offset: 0,
    limit: this.pageSize,
  };
  @State() screenHeight: number;

  @State() resultCount: number = 0;

  referralsWrapper: HTMLElement;
  searchInput: HTMLInputElement;

  componentWillLoad() {
    this.store.mapStateToProps(this, (state) => {
      return {
        isLoggedIn: authSelectors.isLoggedIn(state),
        isAdmin: authSelectors.isAdmin(state),
        screenHeight: screenSizeSelectors.getHeight(state),
      };
    });

    if (!this.isLoggedIn) {
      RouterService.forward("/login");
    } else {
      // we're logged in, but as admin?
      if (!this.isAdmin) {
        RouterService.forward("/");
      }
    }
  }

  render() {
    return (
      <div class="page-payout">
        <referral-header />
        <div class="page-payout-content">
          <p>
            Please choose your preferred payout method below to recieve you
            referral bonus
          </p>
          <section class="section hero">
            <div class="left-body">
              <div class="form">
                <payout-check-form />
              </div>
            </div>

            <div class="right-body">
              <div class="form">
                <payout-wire-form />
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }
}
