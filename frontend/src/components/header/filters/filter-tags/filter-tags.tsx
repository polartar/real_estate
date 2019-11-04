import { Component, h, Host, Prop, State } from '@stencil/core';
import { Store, Action } from "@stencil/redux";
import { FilterTagsService } from '../../../../services/search-filters/filter-tags.service';
import searchFilterSelectors from '../../../../store/selectors/search-filters';
import neighborhoodSelectors from '../../../../store/selectors/neighborhoods';
import { clearSearchFilter } from '../../../../store/actions/search-filters';

@Component({
  tag: 'filter-tags',
  styleUrl: 'filter-tags.scss'
})
export class FilterTags {
  @Prop({ context: "store" }) store: Store;

  @State() tags: any[] = [];


  clearSearchFilter: Action;

  componentDidLoad() {
    this.store.mapStateToProps(this, state => {

      const allFilters = searchFilterSelectors.getAllFilters(state);
      const neighborhoods = neighborhoodSelectors.getNeighborhoods(state);
      return {
        tags: FilterTagsService.getPrioritizedTags(allFilters, neighborhoods)
      };
    });

    this.store.mapDispatchToProps(this, {
      clearSearchFilter
    });
  }

  showAllFilters() {
    console.log('show all filters');
  }

  render() {
    const moreCount: number = Math.max(0, this.tags.length - 2);

    return (
      <Host class="filter-tags-component">
        <div class="tags">
          { this.tags.map((tag, index) => {
            if (index < 2) {
              return <filter-tag tag={tag} />
            }
          }) }
        </div>
        <div class="controls">
          { this.tags.length ?
            <button aria-label="Clear Filters" class="button-reset clear-filters" onClick={() => { this.clearSearchFilter('all') }}>
              Clear
            </button>
          : null }

          { this.tags.length ?
            <button aria-label="Show all filters" class="button-reset show-all-mobile" onClick={() => { this.showAllFilters() }}>
              {this.tags.length} Filter{ this.tags.length === 1 ? '' : 's' }
            </button>
          : null }

          { moreCount ?
            <button aria-label="Show all filters" class="button-reset show-all" onClick={() => { this.showAllFilters() }}>
              {moreCount} More
            </button>
          : null }
        </div>
      </Host>
    )
  }
}
