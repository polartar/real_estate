import { Component, h } from '@stencil/core';

@Component({
  tag: 'app-layout-standard',
  styleUrl: 'app-layout-standard.scss',
})
export class AppLayoutStandard {

  render() {
    return (
      <app-wrapper>
        <app-header />

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
