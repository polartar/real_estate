import { Component, h, Prop } from '@stencil/core';
import { Store, Action } from '@stencil/redux';
import { clearSearchFilter } from '../../store/actions/search';

@Component({
  tag: 'search-state-empty',
  styleUrl: 'search-state-empty.scss'
})
export class SearchStateEmpty {
  @Prop({ context: "store" }) store: Store;
  clearFilters: Action;

  componentWillLoad() {
    this.store.mapDispatchToProps(this, {
      clearFilters: clearSearchFilter
    });
  }

  render() {
    return (
      <div class="search-state-empty-component">
        <div class="not-found text-center">No Results Found</div>
        <p class="try-another text-center">
          Try another location, price range, etc<br />
          or clear all filters
        </p>
        <button class="button-reset" onClick={() => this.clearFilters('all')}>
          Clear All Filters
        </button>
      </div>
    )
  }
}
