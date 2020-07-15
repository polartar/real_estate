import { Component, h } from '@stencil/core';
import { RouterService } from '../../services/router.service';

@Component({
  tag: 'find-more',
  styleUrl: 'find-more.scss'
})

export class FindMore {

  render() {

    return (
      
        <div class="find-more-wrapper">
            <div class="col">
              <h2>Find More Options!</h2>
              <p>
                Browse all our <ion-router-link href="/" >furnished apartments</ion-router-link> for rent in New York City and select<br /> the right apartment you are looking for, whether it's a <ion-router-link href={ RouterService.getRoute('private-rooms') }>room for rent</ion-router-link>, or a<br /> private furnished rental.
              </p>

              <ion-button aria-label="Speak to an expert" class="static-button last" onClick={() => { RouterService.reload(RouterService.getRoute('search')) }}>
                Search Now
              </ion-button>
            </div>
            <div class="col boxshadow">
              <lazy-image src="/assets/images/neighborhoods/findmore.jpg" alt="furnished apartments for rent in New York City" />
            </div>
          </div>
    )
  }
}