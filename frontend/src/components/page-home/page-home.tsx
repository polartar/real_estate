import { Component, h, Prop, State } from '@stencil/core';
import { Store, Action } from "@stencil/redux";
import { toggleSearchFilterDisplay } from "../../store/actions/search-filters";

@Component({
  tag: 'page-home',
  styleUrl: 'page-home.scss'
})
export class PageHome {
  @Prop({ context: "store" }) store: Store;
  @State() size: string = 'phone-only';
  @State() displayFilter: boolean;
  toggleSearchFilterDisplay: Action;

  componentDidLoad() {
    this.store.mapStateToProps(this, state => {

      const {
        screenSize: { size },
        searchFilters: { displayFilter }
      } = state;

      return {
        size,
        displayFilter
      };
    });

    this.store.mapDispatchToProps(this, {
      toggleSearchFilterDisplay
    });
  }

  render() {
    let phoneTitle, phoneSubtitle;

    let title = <h1>#1 SOURCE FOR NEW YORK<br></br> FURNISHED APARTMENTS</h1>
    let subtitle = <p>Search, find, and book your New York<br></br> furnished apartment</p>

    if (this.size === 'phone-only') {
      phoneTitle = title;
      phoneSubtitle = subtitle;
    }

    let mediaLogos = ['techcrunch', 'business-insider', 'cnn', 'gizmodo', 'fastcompany'];


    return [
      <ion-content class="page-home">
        <app-layout-standard>

          {phoneTitle}
          {phoneSubtitle}

          <div class="hero">

            { (this.size !== 'phone-only') ?
            <div class="cta">
              {title}
              {subtitle}
              <button class="light" onClick={() => { this.toggleSearchFilterDisplay(!this.displayFilter) }}>
                Search
              </button>
            </div> : ''
            }

          </div>

          <div class="media-logos">
            {
              mediaLogos.map(logo =>
                <img src={`/assets/images/media-logos/${logo}.png`} class="media-logo"></img>
              )
            }
          </div>
        </app-layout-standard>
      </ion-content>
    ];
  }
}
