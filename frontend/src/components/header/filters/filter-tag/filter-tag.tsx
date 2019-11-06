import { Component, h, Prop } from '@stencil/core';
import { Store, Action } from '@stencil/redux';
import { clearSearchFilter } from '../../../../store/actions/search';

@Component({
  tag: 'filter-tag',
  styleUrl: 'filter-tag.scss'
})
export class FilterTag {
  @Prop({ context: "store" }) store: Store;
  @Prop() tag: any;

  clearSearchFilter: Action;

  componentWillLoad() {
    this.store.mapDispatchToProps(this, {
      clearSearchFilter
    });
  }

  render() {
    return (
      <div class="filter-tag-component">
        { this.tag.title }

        <button aria-label={`Remove Filter: ${this.tag.title}`} class="button-reset" onClick={() => this.clearSearchFilter(this.tag.type, this.tag.value)}>
          <img src="/assets/images/icons/cancel.svg" />
        </button>
      </div>
    )
  }
}
