import { Component, h } from '@stencil/core';

@Component({
  tag: 'app-layout-standard',
  styleUrl: 'app-layout-standard.scss'
})
export class AppLayoutStandard {

  render() {
    return (
      <app-wrapper>
        <div class="header-wrapper">
          <app-header />
        </div>

        <section>
          <slot />
        </section>

        <footer>
          Footer
        </footer>
      </app-wrapper>
    );
  }
}
