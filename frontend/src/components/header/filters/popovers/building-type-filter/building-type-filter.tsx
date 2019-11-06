import { Component, h, Prop, Element, Method } from '@stencil/core';
import { Store, Action } from '@stencil/redux';
import { searchFilterSelectors } from '../../../../../store/selectors/search';
import { setBuildingTypesFilter } from '../../../../../store/actions/search';
import { getBuildingTypeStructure } from '../../../../../helpers/filters';

@Component({
  tag: 'building-type-filter',
  styleUrl: 'building-type-filter.scss'
})
export class BuildingTypeFilter {
  @Prop({ context: "store" }) store: Store;
  @Prop() inModal: boolean = false;
  @Element() el: HTMLElement;

  value: any[] = [];
  setBuildingTypesFilter: Action;

  structure: any = getBuildingTypeStructure();

  componentWillLoad() {
    this.store.mapStateToProps(this, state => {
      return {
        value: searchFilterSelectors.getBuildingTypes(state)
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
      // console.log('checking checkbox');
      // checkbox.check().then(() => { console.log('done check')});
      promises.push(checkbox.check());
    });

    Promise.all(promises).then(() => {
      // this.setBuildingTypesFilter(this.value);
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
      this.value.push(e.detail.value);
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
          {this.structure.map(item => {
            const checkboxProps: any = {
              value: item.value,
              onCheckBoxChange: e => this.valueChanged(e)
            };

            if (this.value.indexOf(item.value) > -1) {
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
