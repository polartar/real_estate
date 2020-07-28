import { Component, h, Prop, Host, State } from '@stencil/core';
import { Store, Action } from "@stencil/redux";
import { toggleSearchFilterDisplay } from "../../../store/actions/search";
import { FilterTagsService } from '../../../services/search-filters/filter-tags.service';
import { searchFilterSelectors } from '../../../store/selectors/search';
import taxonomySelectors from '../../../store/selectors/taxonomy';
import { RouterService } from '../../../services/router.service';

@Component({
  tag: 'search-filters',
  styleUrl: 'search-filters.scss'
})
export class SearchFilters {
  @Prop({ context: "store" }) store: Store;
  @Prop() closeable: boolean = true;
  toggleSearchFilterDisplay: Action;

  @State() tags: any[] = [];
  @State() showAllTags: boolean = false;

  componentDidLoad() {
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

    this.store.mapDispatchToProps(this, {
      toggleSearchFilterDisplay
    });
  }

  async showFilterOptions(ev, component) {
    const popover = Object.assign(document.createElement('apt212-popover'), {
      component: component,
      componentProps: {
        inModal: true
      },
      target: ev.currentTarget
    });

    document.body.appendChild(popover);
  }

  async launchMobileFilterMenu() {
    const modal = Object.assign(document.createElement('ion-modal'), {
      component: 'mobile-filter-menu',
      cssClass: 'app-menu'
    });

    document.body.appendChild(modal);
    return modal.present();
  }

  render() {
    return (
      <Host>
        <div class="search-filters">
          <div class="section">
          <button aria-label="Market filter" class="button-reset dropdown" onClick={(e) => this.showFilterOptions(e, 'market-filter')}>
              Market
              <ion-icon mode="md" name="md-arrow-dropdown"></ion-icon>
            </button>

            <button aria-label="Location filter" class="button-reset dropdown" onClick={(e) => this.showFilterOptions(e, 'location-filter')}>
              Location
              <ion-icon mode="md" name="md-arrow-dropdown"></ion-icon>
            </button>

            <button aria-label="Move in date filter" class="button-reset dropdown" onClick={(e) => this.showFilterOptions(e, 'move-in-date-filter')}>
              Move In Date
              <ion-icon mode="md" name="md-arrow-dropdown"></ion-icon>
            </button>

            <button aria-label="Price filter" class="button-reset dropdown" onClick={(e) => this.showFilterOptions(e, 'price-filter')}>
              Price
              <ion-icon mode="md" name="md-arrow-dropdown"></ion-icon>
            </button>

            <button aria-label="Bedrooms filter" class="button-reset dropdown" onClick={(e) => this.showFilterOptions(e, 'bedroom-filter')}>
              Beds
              <ion-icon mode="md" name="md-arrow-dropdown"></ion-icon>
            </button>

            <button aria-label="Bathrooms filter" class="button-reset dropdown" onClick={(e) => this.showFilterOptions(e, 'bathroom-filter')}>
              Baths
              <ion-icon mode="md" name="md-arrow-dropdown"></ion-icon>
            </button>

            <button aria-label="Building types filter" class="button-reset dropdown" onClick={(e) => this.showFilterOptions(e, 'building-type-filter')}>
              Building Type
              <ion-icon mode="md" name="md-arrow-dropdown"></ion-icon>
            </button>

            { this.closeable ?
            <ion-button aria-label="Search" class="search" href={ RouterService.getRoute('search') }>Search</ion-button>
            : null }

            <ion-button aria-label="Search Filters" class="reset mobile-filters" onClick={() => this.launchMobileFilterMenu()}>
              <ion-icon mode="md" name="md-funnel" slot="start"></ion-icon>
              Filter
            </ion-button>

            <filter-tags onShowAllTags={() => { this.showAllTags = !this.showAllTags} } />

            { this.closeable ?
            <button aria-label="Close Filters" class="button-reset close" onClick={() => this.toggleSearchFilterDisplay(false)}>
              <ion-icon mode="md" name="md-close" slot="icon-only"/>
            </button>
            : null }
          </div>
        </div>

        { this.showAllTags && this.tags.length ?
        <div class="filter-tags-all">
          <filter-tags-all />
        </div>
        : null
        }
      </Host>
    );
  }
}
