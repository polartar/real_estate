import { Store } from "@stencil/redux";
import { Component, h, State, Prop } from '@stencil/core';
import { APISearchService } from '../../../services/api/search';


@Component({
    tag: 'page-booking-pw',
    styleUrl: 'page-booking-pw.scss'
  })
  export class PageFAQ {
    @Prop({ context: "store" }) store: Store;
    @State() size: string = 'phone-only';
    @State() isMobile: boolean = true;
    @State() loaded: boolean = false;
    @State() faq: any = [];
    @State() answer : any = [];
    @State() category : any = [];
    @State() general : any = [];
    @State() booking : any = [];
    @State() privaterooms : any = [];
    @State() stay : any = [];
    @State() question : any = [];
    @State() value: string;
    @State() matches : any = [];
    @State() accordionlist : any = [];
    @State() guest: string = 'yes';

    @State() footerOpen: boolean = false;

    textInput!: HTMLInputElement;

    hasLoaded: boolean = false;

    componentWillLoad() {

      this.store.mapStateToProps(this, state => {

        const {
          screenSize: { size, isMobile },
        } = state;

        return {
          size,
          isMobile
        };
      });

    }

    handleSubmit(e) {
      e.preventDefault();
      console.log("submitted");

      try {
        this.faq =  APISearchService.getNamedSearch('BookingPageInit', {pw: "test2"});
        console.log(this.faq)

       } catch (e) {
         // Fail silently
       }
    }

    async componentDidLoad() {
      this.loaded = true;


    }


    render() {
      return [
        <ion-content class="page-booking-pw">
          <app-header />

            <div class="hero">
                <div class="section">
                  <div class="cta">

                    <h1>BOOKING</h1>

                    <p>Our new booking portal is still under construction.</p>
                    <p>The new and improved portal will integrate the full rental experience.</p>
                    <p>We expect to launch the portal very soon. Check back soon for updates!</p>

                    <form onSubmit={(e) => this.handleSubmit(e)}>

               <span>Password:&nbsp;</span><input
                      id="search"
                      type="password"
                      class="search"
                      ref={(el) => this.textInput = el as HTMLInputElement}
                      autoComplete="off"
                    />

                    <ul id="matches" class="matches">



                    </ul>

                    </form>

                  </div>
                </div>
            </div>

          <div class={{'search-footer': true, 'footer-open': this.footerOpen, 'footer-closed': !this.footerOpen }}>
          <div class="section toggle-footer-wrapper">
            <button class="button-reset toggle-footer" aria-label="Open/Close Footer" onClick={() => this.footerOpen = !this.footerOpen }>
              <span class="closed">Open Footer</span>
              <ion-icon mode="md" name="md-arrow-dropup" class="closed"></ion-icon>

              <span class="open">Close Footer</span>
              <ion-icon mode="md" name="md-arrow-dropdown" class="open"></ion-icon>
            </button>
          </div>

          <div class={{'footer-wrapper': true, 'footer-open': this.footerOpen, 'footer-closed': !this.footerOpen }}>
            <app-footer no-margin />
          </div>
        </div>

        </ion-content>
      ];
    }
  }
