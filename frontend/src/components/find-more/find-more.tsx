import { Component, h } from '@stencil/core';

@Component({
  tag: 'find-more',
  styleUrl: 'find-more.scss'
})

export class FindMore {

  render() {

    return (
      
        <div class="find-more-wrapper">
            <div class="col">
              <h2>Find More Options</h2>
              <p>
                Browse all our <a href="#" onClick={() => {window.open('/search', '_self') }}>furnished apartments</a> for rent in New York City and select<br /> the right apartment you are looking for, whether it's a <a href="#" onClick={() => {window.open('/search', '_self') }}>room for rent</a>, or a<br /> <a href="#" onClick={() => {window.open('/search', '_self') }}>private furnished rental</a>.
              </p>

              <ion-button aria-label="Speak to an expert" class="static-button last" onClick={() => {window.open('/search', '_self') }}>
                Search Now
              </ion-button>
            </div>
            <div class="col" class="boxshadow">
              <img src="/assets/images/neighborhoods/findmore.jpg" />
            </div>
          </div>
    )
  }
}