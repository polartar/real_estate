import { Component, h, Prop, State, Event, EventEmitter, Element } from '@stencil/core';
import { Store, Action } from "@stencil/redux";
import { FilterTagsService } from '../../../../services/search-filters/filter-tags.service';
import { searchFilterSelectors,searchSelectors } from '../../../../store/selectors/search';
import taxonomySelectors from '../../../../store/selectors/taxonomy';
import { clearSearchFilter } from '../../../../store/actions/search';
import Debounce from 'debounce-decorator';

@Component({
  tag: 'filter-tags',
  styleUrl: 'filter-tags.scss'
})
export class FilterTags {
  @Prop({ context: "store" }) store: Store;
  @Element() el: HTMLElement;

  @State() tags: any[] = [];
  @State() screenWidth: number;
  @State() searchResultsCount: number;

  @Event() showAllTags: EventEmitter<void>;

  clearSearchFilter: Action;

  componentDidLoad() {
    this.store.mapStateToProps(this, state => {

      const taxonomy = {
        neighborhoods: taxonomySelectors.getNeighborhoods(state),
        regions: taxonomySelectors.getRegions(state),
        bedroomTypes: taxonomySelectors.getBedroomTypes(state),
        buildingTypes: taxonomySelectors.getBuildingTypes(state)
      };

      const allFilters = searchFilterSelectors.getAllFilters(state);

      return {
        tags: FilterTagsService.getPrioritizedTags(allFilters, taxonomy),
        screenWidth: state.screenSize.width,
        searchResultsCount: searchSelectors.getListingsCount(state),
      };
    });

    this.store.mapDispatchToProps(this, {
      clearSearchFilter
    });
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
      target: ev.currentTarget
    });

    document.body.appendChild(popover);
  }

  /**
   * This fucking monstrous piece of is bullshit brought to you by
   * Daniel's insistence that *every* fucking pixel be utilized
   * So it has to render ALL tags in a hidden div to measure the width of them and
   * then calculate what can fit into the container.
   * Once a list of fitting tags are made they are manually inserted into the visible container
   * and manually removed/re-added on re-render
   *
   * Considering they want the site to be as fast and efficient as possible they sure
   * do choose to be picky as hell over the most inane things.
   * I had this working with a simple estimation in like 3 lines of code.
   */
  @Debounce(100)
  majorlyFuckWithTheDom() {
    const componentContainer = this.el.querySelector('.filter-tags-component');
    const tagsContainer: any = this.el.querySelector('.tags');
    const moreButton = this.el.querySelector('button.show-all');
    const moreCount: any = this.el.querySelector('.morecount');
    const componentWidth = componentContainer.clientWidth;

    // sum up the width of the tags
    let widthMap = [];
    const tags: any = this.el.querySelectorAll('.tag-measurement filter-tag');
    tags.forEach(tag => {
      tag.classList.remove('hidden');
      const classes = tag.className.split(" ");

      widthMap = [...widthMap, { class: classes.find(c => c.startsWith('tag-')), width: tag.clientWidth}];
    });

    const totalTagWidth = widthMap.reduce((p, c) => p + c.width, 0);

    if (componentWidth < totalTagWidth) {
      // too many tags, need to hide some

      // now calculate with the tags width
      const tagsAvailableWidth = this.el.querySelector('.tags').clientWidth - 5; // minus 5 to account for rounding and a tiny buffer

      let usedWidth = 0;
      tags.forEach(tag => {
        const tagWidth = tag.clientWidth;

        if (tagsAvailableWidth < (usedWidth + tagWidth)) {
          // hide this tag
          tag.classList.add('hidden');
        }
        else {
          usedWidth += tagWidth;
        }
      });
    }

    // sync the contents of the measurement container with the display container
    let replace = false;
    const actualTags = this.el.querySelectorAll('.tag-measurement filter-tag:not(.hidden)');
    const existingTags = this.el.querySelectorAll('.tags filter-tag');

    // compare the texts, if we have the same set we don't need to change anything
    // if different, replace the existing tags with the actual tags
    let actualTexts = [];
    let actualClasses = [];
    actualTags.forEach(tag => {
      const text = tag.getAttribute('data-text');
      const classname = tag.className.split(" ").find(c => c.startsWith('tag-'));

      if (text) {
        actualTexts = [...actualTexts, text];
        actualClasses = [...actualClasses, classname];
      }
    });

    let existingTexts = [];
    existingTags.forEach(tag => {
      const text = tag.getAttribute('data-text');

      if (text) {
        existingTexts = [...existingTexts, text];
      }
    });


    if (actualTexts.length !== existingTexts.length) {
      replace = true;
    }
    else {
      let i = actualTexts.length;
      while (i--) {
        if (actualTexts[i] !== existingTexts[i]) {
          replace = true;
        }
      }
    }

    if (replace) {
      tagsContainer.innerHTML = '';

      actualTexts.forEach((c, i) => {
        const newTag = Object.assign(document.createElement('filter-tag'), {
          tag: this.tags[parseInt(actualClasses[i].replace('tag-', ''))]
        });

        newTag.setAttribute('data-text', c);

        tagsContainer.appendChild(newTag);
      });
    }

    if (componentWidth < totalTagWidth) {
      moreButton.classList.add('visible');
    }
    else {
      moreButton.classList.remove('visible');
    }

    moreCount.innerText = this.el.querySelectorAll('.tag-measurement filter-tag.hidden').length;
  }

  componentDidRender() {
    this.majorlyFuckWithTheDom();
  }


  render() {
    return (
        <div class="filter-tags-component">
          <div class="tags">
            {/* tags will be added here post-render after being measured in the tag-measurement div */}
          </div>
          <div class="controls">


            <div class="show-all-mobile">
              { this.searchResultsCount} { this.searchResultsCount === 1 ? 'Result' : 'Results' }
            </div>


            {
              this.tags.length > 0 ?
                <button aria-label="Clear Filters" class="button-reset clear-filters" onClick={() => { this.clearSearchFilter('all') }}>
                  Clear
                </button>
              : null
            }

            {
              this.tags.length > 0 ?
                <button aria-label="Show all filters" class="button-reset show-all-mobile" onClick={() => { this.showAllTags.emit() }}>
                  {this.tags.length} Filter{ this.tags.length === 1 ? '' : 's' }
                </button>
              : null
            }

            <button aria-label="Show all filters" class="button-reset show-all" onClick={e => { this.showFiltersPopover(e) }}>
              <span class="morecount">00</span> More
            </button>
          </div>

          <div class="tag-measurement">
            { this.tags.map((tag, index) => {
                const classname: any = {};
                classname[`tag-${index}`] = true;

                return <filter-tag tag={tag} class={classname} data-text={tag.title} />
            }) }
          </div>
        </div>
    )
  }
}
