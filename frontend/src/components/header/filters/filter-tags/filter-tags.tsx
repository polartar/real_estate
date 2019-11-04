import { Component, h, Host, Prop, State } from '@stencil/core';
import { Store } from "@stencil/redux";
import { FilterTagsService } from '../../../../services/search-filters/filter-tags.service';
import searchFilterSelectors from '../../../../store/selectors/search-filters';
import neighborhoodSelectors from '../../../../store/selectors/neighborhoods';

@Component({
  tag: 'filter-tags',
  styleUrl: 'filter-tags.scss'
})
export class FilterTags {
  @Prop({ context: "store" }) store: Store;

  @State() tags: any[] = [];

  componentDidLoad() {
    this.store.mapStateToProps(this, state => {

      const allFilters = searchFilterSelectors.getAllFilters(state);
      const neighborhoods = neighborhoodSelectors.getNeighborhoods(state);
      return {
        tags: FilterTagsService.getPrioritizedTags(allFilters, neighborhoods)
      };
    });
  }

  clearFilters() {
    console.log('clearing filters');
  }

  showAllFilters() {
    console.log('show all filters');
  }

  render() {
    return (
      <Host>
        <div class="tags">
          { this.tags.map(tag => <filter-tag tag={tag} />) }
        </div>
        <div class="controls">
          <button aria-label="Clear Filters" class="button-reset clear-filters" onClick={() => { this.clearFilters() }}>
            Clear
          </button>
          <button aria-label="Show all filters" class="button-reset show-all" onClick={() => { this.showAllFilters() }}>
            {this.tags.length} Filter{ this.tags.length === 1 ? '' : 's' }
          </button>
          <button aria-label="Show all filters" class="button-reset show-all" onClick={() => { this.showAllFilters() }}>
            {this.tags.length} More
          </button>
        </div>
      </Host>
    )
  }
}
