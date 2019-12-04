import { Component, h } from '@stencil/core';

@Component({
  tag: 'content-404',
  styleUrl: 'content-404.scss'
})
export class Content404 {
  render() {
    return (
      <section class="section content-404">
        <div class="text-center">
          <h1>Not Found</h1>
          <p>The page you navigated to could not be found...</p>
          <ion-button href="/">Return Home</ion-button>
        </div>
      </section>
    )
  }
}
