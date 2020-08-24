import { Component, h } from '@stencil/core';

@Component({
  tag: 'media-logos',
  styleUrl: 'media-logos.scss'
})
export class MediaLogos {

  render() {
    let mediaLogos = {
      yahoo: {
        alt: "Yahoo!",
        url: '',
      },
      venturebeat: {
        alt: "VentureBeat",
        url: 'https://venturebeat.com/2018/12/04/apt212s-online-booking-platform-makes-renting-legal-short-term-apartments-and-private-rooms-in-nyc-secure-and-hassle-free/',
      },
      usatoday: {
        alt: "USA Today",
        url: '',
      },
      forbes: {
        alt: "Forbes",
        url: 'https://www.forbes.com/sites/piasilva/2020/06/28/what-it-really-takes-to-be-a-top-expert-in-your-industry/#663e20987f0a',
      },
      marketwatch: {
        alt: "MarketWatch",
        url: '',
      },
      'business-insider': {
        alt: 'Business Insider',
        url: 'https://markets.businessinsider.com/news/stocks/apt212-offers-private-rooms-in-shared-apartments-for-students-interns-and-young-professionals-1027783925',
      }
    };

    return [
      <div class="media-logos">
        {
          Object.keys(mediaLogos).map((logo) => {
            let classes = {
              'logo-container': true
            };

            classes[logo] = true;

            return (
            <div class={classes}>
              {
                mediaLogos[logo].url ?
                <a href={mediaLogos[logo].url} target="_blank">
                  <lazy-image src={`/assets/images/media-logos/${logo}.jpg`} class="media-logo" alt={mediaLogos[logo].alt} />
                </a>

                :

                <lazy-image src={`/assets/images/media-logos/${logo}.jpg`} class="media-logo" alt={mediaLogos[logo].alt} />
              }

            </div>
            )
          }
          )
        }
      </div>
    ];
  }
}
