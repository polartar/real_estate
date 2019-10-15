import { Component, h } from '@stencil/core';

@Component({
  tag: 'app-layout-standard',
  styleUrl: 'app-layout-standard.scss'
})
export class AppLayoutStandard {

  render() {
    return (
      <div>
        <div class="header-wrapper section">
          <app-header />
        </div>

        <section>
          <slot />
        </section>

        <footer>
          Footer
        </footer>
      </div>
    );
  }
}
