import { Component, h } from '@stencil/core';

@Component({
  tag: 'media-logos',
  styleUrl: 'media-logos.scss'
})
export class MediaLogos {

  render() {
    let mediaLogos = {
      yahoo: "Yahoo!",
      venturebeat: "VentureBeat",
      usatoday: "USA Today",
      forbes: "Forbes",
      marketwatch: "MarketWatch",
      'business-insider': 'Business Insider'
    };

    return [
      <div class="media-logos">
        {
          Object.keys(mediaLogos).map(logo => {
            let classes = {
              'logo-container': true
            };

            classes[logo] = true;

            return (
            <div class={classes}>
              <lazy-image src={`/assets/images/media-logos/${logo}.jpg`} class="media-logo" alt={mediaLogos[logo]} />
            </div>
            )
          }
          )
        }
      </div>
    ];
  }
}
