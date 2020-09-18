import "@stencil/redux";
import {
  Component,
  h,
  Prop,
  Listen,
  Build,
  Element,
  State,
} from "@stencil/core";
import { Store, Action } from "@stencil/redux";
import { updateScreenSize } from "../../store/actions/screensize";
import { getTaxonomy } from "../../store/actions/taxonomy";
import { configureStore } from "../../store/index";
import { loadState } from "../../services/storage";
import { APIService } from "../../services/api/api.service";
import AuthSelectors from "../../store/selectors/auth";
import { PrefetchComponentService } from "../../services/prefetch-components.service";
import { RouterService } from "../../services/router.service";
import Debounce from "debounce-decorator";
import { SEOService } from "../../services/seo.service";
import { ScriptLoaderService } from "../../services/script-loader.service";

@Component({
  tag: "app-root",
  styleUrl: "app-root.css",
})
export class AppRoot {
  @Prop({ context: "store" }) store: Store;
  @Element() el: HTMLElement;

  @State() isAdmin: boolean = false;
  @State() isLoggedin: boolean = false;

  loadAuth: Action;
  updateScreenSize: Action;
  getTaxonomy: Action;

  @Listen("resize", { target: "window" })
  @Debounce(250)
  handleResize() {
    requestAnimationFrame(() => {
      this.updateScreenSize(window.innerWidth, window.innerHeight);
    });
  }

  componentWillLoad() {
    const persistedState = loadState();

    if (
      persistedState &&
      persistedState.auth &&
      persistedState.auth.access_token
    ) {
      APIService.setAccessToken(persistedState.auth.access_token);
    }

    this.store.setStore(configureStore(persistedState));

    this.store.mapStateToProps(this, (state) => {
      return {
        isAdmin: AuthSelectors.isAdmin(state),
        isLoggedin: AuthSelectors.isLoggedIn(state),
      };
    });

    this.store.mapDispatchToProps(this, {
      updateScreenSize,
      getTaxonomy,
    });

    if (Build.isBrowser) {
      this.getTaxonomy();
    }

    this.updateScreenSize(window.innerWidth, window.innerHeight);
  }

  componentDidLoad() {
    if (Build.isBrowser) {
      // prefetch code for componetns
      const prefetch = this.el.querySelector("component-prefetch");
      prefetch.setDelay(1500).then(() => {
        prefetch.setComponents(PrefetchComponentService.getConfig());
      });
    }

    ScriptLoaderService.loadScript("olark", "/assets/scripts/olark.js").then(
      () => {
        // do something
      }
    );
  }

  render() {
    return [
      <ion-app>
        <ion-router
          useHash={false}
          onIonRouteDidChange={(e) => SEOService.update(e)}
        >
          <ion-route url="/" component="page-home" />
          <ion-route
            url={RouterService.getRoute("search")}
            component="page-search"
          />
          <ion-route url="/listing/:apartmentId" component="page-listing" />
          <ion-route url="/wishlist" component="page-wishlist" />
          <ion-route
            url={RouterService.getRoute("neighborhoods")}
            component="page-neighborhoods"
          />
          <ion-route
            url="/nyc-neighborhood/:neighborhoodName/apartments"
            component="page-neighborhood"
          />
          <ion-route url={RouterService.getRoute("faq")} component="page-faq" />
          <ion-route url="/coming-soon" component="page-coming-soon" />
          <ion-route
            url={RouterService.getRoute("booking")}
            component="page-booking"
          />
          <ion-route
            url={RouterService.getRoute("privacy")}
            component="page-privacy"
          />

          <ion-route
            url={RouterService.getRoute("private-rooms")}
            component="page-private-rooms"
          />
          <ion-route
            url={RouterService.getRoute("corporate-rooms")}
            component="page-corporate-rooms"
          />
          <ion-route url="/about" component="page-about" />
          {/* <ion-route url="/referral" component={this.isLoggedin ? "page-referral-submit" : "page-referral"} />
          <ion-route url="/referral/submit" component={this.isLoggedin ? "page-referral-submit" : "page-referral"} />
          <ion-route url="/referral/signin" component={this.isLoggedin ? "page-referral-submit" : "page-referral-signin"} /> */}
          <ion-route url="/referral" component="page-referral" />
          <ion-route url="/referral/submit" component="page-referral-submit" />
          <ion-route url="/referral/signin" component="page-referral-signin" />
          <ion-route url="/referral/forgotpassword" component="page-referral-forgotpassword" />
          <ion-route url="/referral/passwordreset/:token" component="page-referral-passwordreset" />


          <ion-route url="/login" component="page-login" />

          <ion-route
            url="/admin"
            component={this.isAdmin ? "page-admin" : "page-login"}
          />
          <ion-route
            url="/admin/information"
            component={this.isLoggedin ? "page-general-information" : "page-login"}
          />

          <ion-route
            url="/admin/payout"
            component={this.isLoggedin ? "page-payout" : "page-login"}
          />
          <ion-route
            url="admin/addreferral"
            component={this.isLoggedin ? "page-add-referral" : "page-login"}
          />
          <ion-route
            url="/admin/terms"
            component="page-terms"
          />
          <ion-route
            url="/admin/listings"
            component={this.isAdmin ? "page-admin-listings" : "page-login"}
          />
          <ion-route
            url="/admin/listing/add"
            component={this.isAdmin ? "page-admin-listing-add" : "page-login"}
          />
          <ion-route
            url="/admin/listing/edit/:apartmentId"
            component={this.isAdmin ? "page-admin-listing-edit" : "page-login"}
          />
          <ion-route
            url="/admin/owner-global"
            component={this.isAdmin ? "page-admin-owner" : "page-login"}
          />
          <ion-route
            url="/admin/referrals"
            component={this.isLoggedin ? "page-admin-referrals" : "page-login"}
          />
          <ion-route
            url="/admin/agents"
            component={this.isAdmin ? "page-admin-agents" : "page-login"}
          />
          <ion-route
            url="/admin/agent/:agentId"
            component={this.isAdmin ? "page-admin-agent-edit" : "page-login"}
          />
          <ion-route
            url="/admin/agent/"
            component={this.isAdmin ? "page-admin-agent-edit" : "page-login"}
          />
          <ion-route
            url="/admin/booking-settings"
            component={
              this.isAdmin ? "page-admin-booking-settings" : "page-login"
            }
          />

          <ion-route url=":any" component="page-404" />
        </ion-router>

        <ion-nav />
      </ion-app>,

      <component-prefetch />,
    ];
  }
}
