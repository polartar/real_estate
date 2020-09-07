import { Component, h, State, Prop } from "@stencil/core";
import { Store } from "@stencil/redux";
import authSelectors from "../../../../store/selectors/auth";
import screenSizeSelectors from "../../../../store/selectors/screensize";
import { RouterService } from "../../../../services/router.service";

@Component({
  tag: "page-general",
  styleUrl: "page-general.scss",
})
export class PageGeneral {
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
      <div class="page-general">
        <admin-header />
        <div class="page-general-content">
          <div class="content">
            <general-form />
          </div>
        </div>
      </div>
    );
  }
}
