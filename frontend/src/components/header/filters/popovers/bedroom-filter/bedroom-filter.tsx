import { Component, h, Prop, Element } from '@stencil/core';
import { Store, Action } from '@stencil/redux';
import searchFilterSelectors from '../../../../../store/selectors/search-filters';
import { setBedsFilter } from '../../../../../store/actions/search-filters';

@Component({
  tag: 'bedroom-filter',
  styleUrl: 'bedroom-filter.scss'
})
export class BedroomFilter {
  @Prop({ context: "store" }) store: Store;
  @Element() el: HTMLElement;

  value: any[] = [];
  setBedsFilter: Action;

  componentWillLoad() {
    this.store.mapStateToProps(this, state => {
      return {
        value: searchFilterSelectors.getBeds(state)
      }
    });

    this.store.mapDispatchToProps(this, {
      setBedsFilter: setBedsFilter
    });
  }

  componentDidLoad() {
    const buttons = this.el.querySelectorAll('.beds ion-button');

    buttons.forEach(button => {
      let val = button.getAttribute('data-value');
      if (this.value.indexOf(val) > -1) {
        button.classList.remove('inactive');
      }
    });
  }

  setValue(e) {
    if (e.target.classList.contains('inactive')) {
      e.target.classList.remove('inactive');

      this.value.push(e.target.getAttribute('data-value'));
    }
    else {
      e.target.classList.add('inactive');
      this.value = this.value.filter(val => {
        return val !== e.target.getAttribute('data-value');
      });
    }

    this.setBedsFilter(this.value);
  }

  closePopover() {
    const popover = document.querySelector('ion-popover');

    if (popover) {
      popover.dismiss();
    }
  }

  render() {
    return (
      <div class="bedroom-filter">
        <div class="title">Number of beds</div>

        <div class="beds">
          <ion-grid>
            <ion-row>
              <ion-col size="3">
                <ion-button class="inactive" expand="full" data-value="room" onClick={(e) => this.setValue(e)}>Room</ion-button>
              </ion-col>
              <ion-col size="3">
                <ion-button class="inactive" expand="full" data-value="studio" onClick={(e) => this.setValue(e)}>Studio</ion-button>
              </ion-col>
              <ion-col size="3">
               <ion-button class="inactive" expand="full" data-value={1} onClick={(e) => this.setValue(e)}>1</ion-button>
              </ion-col>
              <ion-col size="3">
                <ion-button class="inactive" expand="full" data-value={2} onClick={(e) => this.setValue(e)}>2</ion-button>
              </ion-col>
            </ion-row>
            <ion-row>
              <ion-col size="3">
                <ion-button class="inactive" expand="full" data-value={3} onClick={(e) => this.setValue(e)}>3</ion-button>
              </ion-col>
              <ion-col size="3">
                <ion-button class="inactive" expand="full" data-value={4} onClick={(e) => this.setValue(e)}>4</ion-button>
              </ion-col>
              <ion-col size="3">
                <ion-button class="inactive" expand="full" data-value={5} onClick={(e) => this.setValue(e)}>5</ion-button>
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
