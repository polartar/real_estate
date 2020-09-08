import { Component, h, State, Prop } from "@stencil/core";
import { Store } from "@stencil/redux";
import authSelectors from "../../../../store/selectors/auth";
import screenSizeSelectors from "../../../../store/selectors/screensize";
import { RouterService } from "../../../../services/router.service";

@Component({
  tag: "page-general-information",
  styleUrl: "page-general-information.scss",
})
export class PageGeneral {
  @Prop({ context: "store" }) store: Store;

  @State() isAdmin: boolean = false;
  @State() isLoggedIn: boolean = false;
 
  @State() screenHeight: number;
 
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
        <referral-header />
        <div class="page-general-content">
          <div class="form">
            <general-information-form />
          </div>
        </div>
      </div>
    );
  }
}
