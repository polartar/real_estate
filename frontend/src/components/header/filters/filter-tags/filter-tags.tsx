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
  @State() screenWidth: number;


  clearSearchFilter: Action;

  componentDidLoad() {
    this.store.mapStateToProps(this, state => {

      const allFilters = searchFilterSelectors.getAllFilters(state);
      const neighborhoods = neighborhoodSelectors.getNeighborhoods(state);
      return {
        tags: FilterTagsService.getPrioritizedTags(allFilters, neighborhoods),
        screenWidth: state.screenSize.width
      };
    });

    this.store.mapDispatchToProps(this, {
      clearSearchFilter
    });
  }

  showAllFilters() {
    console.log('show all filters');
  }

  async showFiltersPopover(ev) {
    const popover = Object.assign(document.createElement('apt212-popover'), {
      component: 'filter-tags-all',
      styleOverride: {
        width: '491px'
      },
      bindTo: {
        target: 'top right',
        popover: 'top right'
      },
      event: ev
    });

    document.body.appendChild(popover);
  }

  render() {
    let displayTags = [];
    const charsPerTag = 8; // approx char length of padding/margin/x
    let maxChars = 34; // max num of chars before breaking the layout

    // give more chars for wider screens
    maxChars += Math.round((this.screenWidth - 1200) / 24);
    maxChars = Math.min(45, maxChars);

    this.tags.forEach((t, i) => {
      if (i !== 0) {
        maxChars -= charsPerTag;
      }

      if (t.title.length <= maxChars) {
        displayTags.push(t);

        maxChars -= t.title.length;
      }
    });

    const moreCount: number = this.tags.length - displayTags.length;

    return (
      <Host class="filter-tags-component">
        <div class="tags">
          { displayTags.map(tag => {
              return <filter-tag tag={tag} />
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
            <button aria-label="Show all filters" class="button-reset show-all" onClick={e => { this.showFiltersPopover(e) }}>
              {moreCount} More
            </button>
          : null }
        </div>
      </Host>
    )
  }
}
