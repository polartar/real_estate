import { Component, h } from '@stencil/core';

@Component({
  tag: 'media-logos',
  styleUrl: 'media-logos.scss'
})
export class MediaLogos {

  render() {
    let mediaLogos = {
      techcrunch: "TechCrunch logo",
      'business-insider': "Business Insider logo",
      cnn: "CNN logo",
      gizmodo: "Gizmodo logo",
      fastcompany: "Fast company logo"
    };

    return [
      <div class="media-logos">
        {
          Object.keys(mediaLogos).map(logo =>
            <div class="logo-container">
              <img src={`/assets/images/media-logos/${logo}.png`} class="media-logo" alt={mediaLogos[logo]}></img>
            </div>
          )
        }
      </div>
    ];
  }
}
