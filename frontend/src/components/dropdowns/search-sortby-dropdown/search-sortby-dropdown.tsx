import { Component, h, Prop, State, Element } from '@stencil/core';
import { Store, Action } from "@stencil/redux";
import { searchFilterSelectors } from '../../../store/selectors/search';
import { setSortbyFilter } from '../../../store/actions/search';

@Component({
  tag: 'search-sortby-dropdown',
  styleUrl: 'search-sortby-dropdown.scss'
})
export class SearchSortbyDropdown {
  @Prop({ context: "store" }) store: Store;
  @Element() el: HTMLElement;
  @State() sortBy: any;

  setSortbyFilter: Action;

  componentWillLoad() {
    this.store.mapStateToProps(this, state => {
      return {
        sortBy: searchFilterSelectors.getSortBy(state)
      }
    });

    this.store.mapDispatchToProps(this, {
      setSortbyFilter
    });
  }

  select(value) {
    if (value === this.sortBy) {
      return;
    }

    this.setSortbyFilter(value);

    // close the dropdown
    const dropdown: any = this.el.closest('apt212-popover');
    if (dropdown) {
      dropdown.dismiss();
    }
  }

  render() {
    const optionsMap = [
      {
        label: 'Soonest Available',
        value: 'availability',
        selected: this.sortBy === 'availability'
      },
      {
        label: 'Price - Low to High',
        value: 'price_asc',
        selected: this.sortBy === 'price_asc'
      },
      {
        label: 'Price - High to Low',
        value: 'price_desc',
        selected: this.sortBy === 'price_desc'
      },
      {
        label: 'Size - Small to Big',
        value: 'size_asc',
        selected: this.sortBy === 'size_asc'
      },
      {
        label: 'Size - Big to Small',
        value: 'size_desc',
        selected: this.sortBy === 'size_desc'
      }
    ];

    return (
      <div class="search-sortby-dropdown-component">
        { optionsMap.map(o => <button class={{'button-reset': true, 'sort-by-button': true, selected: o.selected}} onClick={() => this.select(o.value)}>
                                {o.label}
                              </button>
        )}
      </div>
    )
  }
}
