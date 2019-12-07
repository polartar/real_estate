import { Component, h, Prop, Element, Method } from '@stencil/core';
import { Store, Action } from '@stencil/redux';
import { searchFilterSelectors } from '../../../../../store/selectors/search';
import taxonomySelectors from '../../../../../store/selectors/taxonomy';
import { setBuildingTypesFilter } from '../../../../../store/actions/search';

@Component({
  tag: 'building-type-filter',
  styleUrl: 'building-type-filter.scss'
})
export class BuildingTypeFilter {
  @Prop({ context: "store" }) store: Store;
  @Prop() inModal: boolean = false;
  @Element() el: HTMLElement;

  value: any[] = [];
  buildingTypes: any[] = [];
  setBuildingTypesFilter: Action;

  componentWillLoad() {
    this.store.mapStateToProps(this, state => {
      return {
        value: searchFilterSelectors.getBuildingTypes(state),
        buildingTypes: taxonomySelectors.getBuildingTypes(state)
      }
    });

    this.store.mapDispatchToProps(this, {
      setBuildingTypesFilter: setBuildingTypesFilter
    });
  }

  @Method()
  async selectAll() {
    const checkboxes: any = this.el.querySelectorAll('apt212-checkbox');

    this.value = [];

    let promises = [];

    checkboxes.forEach(checkbox => {
      promises.push(checkbox.check());
    });

    Promise.all(promises).then(() => {
      // checkbox event handler takes care of the rest
    });
  }

  @Method()
  async clearAll() {
    const checkboxes: any = this.el.querySelectorAll('apt212-checkbox');

    this.value = [];

    checkboxes.forEach(checkbox => {
      checkbox.uncheck();
    });

    this.setBuildingTypesFilter(this.value);
  }

  closePopover() {
    const popover = this.el.closest('apt212-popover');

    if (popover) {
      popover.dismiss();
    }
  }

  check(cb) {
    cb.check();
  }

  uncheck(cb) {
    cb.checked = false;
  }

  valueChanged(e) {
    if (e.detail.checked) {
      this.value.push(parseInt(e.detail.value));
    }
    else {
      this.value = this.value.filter(val => {
        return val !== e.detail.value;
      });
    }

    this.setBuildingTypesFilter(this.value);
  }

  render() {
    return (
      <div class="building-type-filter">
        <div class="title">Building Type</div>

        <div class="building-types">
          {this.buildingTypes.map(item => {
            const checkboxProps: any = {
              value: item.id,
              onCheckBoxChange: e => this.valueChanged(e)
            };

            if (this.value.indexOf(item.id) > -1) {
              checkboxProps.checked = 'checked';
            }

            return (
              <apt212-checkbox {...checkboxProps}>
                <star-rating rating={item.rating} stars={5} size={16} readonly /> {item.name}
              </apt212-checkbox>
            )
          })}
        </div>

        { this.inModal ?
        <ion-button aria-label="close" fill="clear" class="close reset" onClick={() => this.closePopover()}>
          <ion-icon src="/assets/images/icons/cancel.svg" slot="icon-only" />
        </ion-button>
        : null }
      </div>
    );
  }
}
