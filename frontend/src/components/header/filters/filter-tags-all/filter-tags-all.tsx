import { Component, h, Prop, State, Element } from '@stencil/core';
import { Store } from "@stencil/redux";
import { FilterTagsService } from '../../../../services/search-filters/filter-tags.service';
import { searchFilterSelectors } from '../../../../store/selectors/search';
import taxonomySelectors from '../../../../store/selectors/taxonomy';

@Component({
  tag: 'filter-tags-all',
  styleUrl: 'filter-tags-all.scss'
})
export class FilterTagsAll {
  @Prop({ context: "store" }) store: Store;

  @Element() el: HTMLElement;

  @State() tags: any[] = [];

  componentWillLoad() {
    this.store.mapStateToProps(this, state => {

      const allFilters = searchFilterSelectors.getAllFilters(state);
      const taxonomy = {
        neighborhoods: taxonomySelectors.getNeighborhoods(state),
        regions: taxonomySelectors.getRegions(state),
        bedroomTypes: taxonomySelectors.getBedroomTypes(state),
        buildingTypes: taxonomySelectors.getBuildingTypes(state)
      };
      return {
        tags: FilterTagsService.getPrioritizedTags(allFilters, taxonomy)
      };
    });
  }

  componentDidRender() {
    if (!this.tags.length) {
      // auto-close if this in a popover
      const popover = this.el.closest('apt212-popover');

      if (popover) {
        popover.dismiss();
      }
    }
  }

  render() {
    return (
      <div class="filter-tags-all-component">
        { this.tags.map(tag => <filter-tag tag={tag} />) }
      </div>
    )
  }
}
