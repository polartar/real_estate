import { Component, h } from '@stencil/core';

@Component({
  tag: 'search-state-empty',
  styleUrl: 'search-state-empty.scss'
})
export class SearchStateEmpty {
  render() {
    return (
      <div class="search-state-empty-component">
        <div class="not-found text-center">No Results Found</div>
        <p class="try-another text-center">
          Try another location, price range, etc<br />
          or clear all filters
        </p>
        <button class="button-reset">
          Clear All Filters
        </button>
      </div>
    )
  }
}
