import { Component, h, Prop, Element, Method } from '@stencil/core';
import { Store, Action } from '@stencil/redux';
import searchFilterSelectors from '../../../../../store/selectors/search-filters';
import { setBuildingTypesFilter } from '../../../../../store/actions/search-filters';

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

  structure: any = [
    {
      name: 'Walk Up',
      value: 'walkup',
      rating: 3,
    },
    {
      name: 'Elevator',
      value: 'elevator',
      rating: 4,
    },
    {
      name: 'Elevator / Doorman',
      value: 'elevator-doorman',
      rating: 5,
    }
  ]

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

  componentDidLoad() {
    // fix issue with checked-binding on ion-checkbox
    let checkboxes = this.el.querySelectorAll('ion-checkbox[data-checked="checked"]');

    checkboxes.forEach(checkbox => {
      if (checkbox.getAttribute('data-checked') && !checkbox.getAttribute('checked')) {
        // we need to explicitly re-set the checked prop
        checkbox.setAttribute('checked', 'checked');
      }
    });
  }

  @Method()
  async selectAll() {
    const checkboxes = this.el.querySelectorAll('ion-checkbox');

    this.value = [];

    checkboxes.forEach(checkbox => {
      this.check(checkbox);
    });

    this.setBuildingTypesFilter(this.value);
  }

  @Method()
  async clearAll() {
    const checkboxes = this.el.querySelectorAll('ion-checkbox');

    this.value = [];

    checkboxes.forEach(checkbox => {
      this.uncheck(checkbox);
    });

    this.setBuildingTypesFilter(this.value);
  }

  closePopover() {
    const popover = document.querySelector('ion-popover');

    if (popover) {
      popover.dismiss();
    }
  }

  check(cb) {
    cb.setAttribute('checked', 'checked');
    cb.setAttribute('data-checked', 'checked');
  }

  uncheck(cb) {
    cb.removeAttribute('checked');
    cb.removeAttribute('data-checked');
  }

  isChecked(cb) {
    return !!cb.getAttribute('checked') || !!cb.getAttribute('data-checked');
  }

  toggleCheckbox(e) {
    let cb;

    if (e.target.tagName === 'LABEL') {
      cb = e.target.querySelector('ion-checkbox');

      if (this.isChecked(cb)) {
        this.uncheck(cb);
      }
      else {
        this.check(cb);
      }
    }
  }

  valueChanged(e) {
    if (!!e.detail.checked) {
      this.value.push(e.detail.value);
    }
    else {
      this.value = this.value.filter(val => {
        return val !== e.detail.value;
      })
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
              onIonChange: e => this.valueChanged(e)
            };

            if (this.value.indexOf(item.value) > -1) {
              checkboxProps.checked = 'checked';
              checkboxProps['data-checked'] = 'checked';
            }

            return (
              <label onClick={e => this.toggleCheckbox(e)}>
                <ion-checkbox {...checkboxProps} /> <star-rating rating={item.rating} stars="5" color="#f3b445" size="16" /> {item.name}
              </label>
            )
          })}
        </div>

        { this.inModal ?
        <ion-button fill="clear" class="close" onClick={() => this.closePopover()}>
          <ion-icon name="close" slot="icon-only" />
        </ion-button>
        : null }
      </div>
    );
  }
}
