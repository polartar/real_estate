import { Component, h, Prop, Element } from '@stencil/core';
import { Store, Action } from '@stencil/redux';
import searchFilterSelectors from '../../../../../store/selectors/search-filters';
import { setBathroomsFilter } from '../../../../../store/actions/search-filters';

@Component({
  tag: 'bathroom-filter',
  styleUrl: 'bathroom-filter.scss'
})
export class BathroomFilter {
  @Prop({ context: "store" }) store: Store;
  @Element() el: HTMLElement;

  value: any = undefined;
  setBathroomsFilter: Action;

  componentWillLoad() {
    this.store.mapStateToProps(this, state => {
      return {
        value: searchFilterSelectors.getBathrooms(state)
      }
    });

    this.store.mapDispatchToProps(this, {
      setBathroomsFilter: setBathroomsFilter
    });
  }

  componentDidLoad() {
    const buttons = this.el.querySelectorAll('.bathrooms ion-button');

    buttons.forEach(button => {
      if (button.getAttribute('data-value') === this.value) {
        button.classList.remove('inactive');
      }
    });
  }

  setValue(e) {
    const buttons = this.el.querySelectorAll('.bathrooms ion-button');

    buttons.forEach(button => {
      if (button.getAttribute('data-value') != e.target.getAttribute('data-value')) {
        button.classList.add('inactive');
      }
    });

    e.target.classList.remove('inactive');

    this.setBathroomsFilter(e.target.getAttribute('data-value'));
  }

  closePopover() {
    const popover = document.querySelector('ion-popover');

    if (popover) {
      popover.dismiss();
    }
  }

  render() {
    return (
      <div class="bathroom-filter">
        <div class="title">Number of bathrooms</div>

        <div class="bathrooms">
          <ion-grid>
            <ion-row>
              <ion-col size="3">
                <ion-button class="inactive" expand="full" data-value={1} onClick={(e) => this.setValue(e)}>1</ion-button>
              </ion-col>
              <ion-col size="3">
                <ion-button class="inactive" expand="full" data-value={1.5} onClick={(e) => this.setValue(e)}>1.5</ion-button>
              </ion-col>
              <ion-col size="3">
               <ion-button class="inactive" expand="full" data-value={2} onClick={(e) => this.setValue(e)}>2</ion-button>
              </ion-col>
              <ion-col size="3">
                <ion-button class="inactive" expand="full" data-value={2.5} onClick={(e) => this.setValue(e)}>2.5</ion-button>
              </ion-col>
            </ion-row>
            <ion-row>
              <ion-col size="3">
                <ion-button class="inactive" expand="full" data-value={3} onClick={(e) => this.setValue(e)}>3</ion-button>
              </ion-col>
              <ion-col size="3">
                <ion-button class="inactive" expand="full" data-value={3.5} onClick={(e) => this.setValue(e)}>3.5</ion-button>
              </ion-col>
              <ion-col size="3">
                <ion-button class="inactive" expand="full" data-value={4} onClick={(e) => this.setValue(e)}>4</ion-button>
              </ion-col>
            </ion-row>
          </ion-grid>
        </div>

        <ion-button fill="clear" class="close" onClick={() => this.closePopover()}>
          <ion-icon name="close" slot="icon-only" />
        </ion-button>
      </div>
    );
  }
}
