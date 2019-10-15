import { Component, h, Element } from '@stencil/core';

@Component({
  tag: 'faq-accordian',
  styleUrl: 'faq-accordian.scss'
})
export class FAQAccordian {
  @Element() el: HTMLElement;

  activeInstance: number = 1;

  toggleAccordian(index) {
    if (index == this.activeInstance) {
      let icon = this.el.querySelector('[data-index="' + index + '"] ion-icon');
      let content = this.el.querySelector('[data-index="' + index + '"] .accordian-content');

      // collapse this index
      if (icon.getAttribute('name') == 'remove') {
        icon.setAttribute('name', 'add');
        content.classList.remove('active');
      }
      else {
        icon.setAttribute('name', 'remove');
        content.classList.add('active');
      }

    }
    else {
      // collapse all others
      let icons = this.el.querySelectorAll('.accordian-header ion-icon');
      let contents = this.el.querySelectorAll('.accordian-content');

      icons.forEach(element => {
        element.setAttribute('name', 'add');
      });

      contents.forEach(element => {
        element.classList.remove('active');
      });

      // expand this index
      let icon = this.el.querySelector('[data-index="' + index + '"] ion-icon');
      let content = this.el.querySelector('[data-index="' + index + '"] .accordian-content');

      icon.setAttribute('name', 'remove');
      content.classList.add('active');

    }

    this.activeInstance = index;
  }

  render() {
    return [
      <div class="faq-accordian">
        <div class="accordian-item" data-index="1">
          <button class="accordian-header button-reset flex-col-wrapper" onClick={() => this.toggleAccordian(1)}>
            <h4 class="h1">Why Choose APT212?</h4>
            {this.activeInstance == 1 ? <ion-icon name="remove" /> : <ion-icon name="add" /> }
          </button>
          <p class="accordian-content active">
            All of our apartments are move-in ready. They are complete with contemporary furniture, a fully equipped kitchen (cookware, cutlery, e.t.c.)
            and set up with Wifi and Cable TV.<br /><br />
            Not all units come with linen and towels, but a package is available for purchase at our Soho office.For most units, landlords are able to
            offer bed changes to accommodate larger groups.
          </p>
        </div>

        <div class="accordian-item" data-index="2">
          <button class="accordian-header button-reset flex-col-wrapper" onClick={() => this.toggleAccordian(2)}>
            <h4 class="h1">What Furniture is provided?</h4>
            {this.activeInstance == 2 ? <ion-icon name="remove" /> : <ion-icon name="add" /> }
          </button>
          <p class="accordian-content">
            All of our apartments are move-in ready. They are complete with contemporary furniture, a fully equipped kitchen (cookware, cutlery, e.t.c.)
            and set up with Wifi and Cable TV.<br /><br />
            Not all units come with linen and towels, but a package is available for purchase at our Soho office.For most units, landlords are able to
            offer bed changes to accommodate larger groups.
          </p>
        </div>

        <div class="accordian-item" data-index="3">
          <button class="accordian-header button-reset flex-col-wrapper" onClick={() => this.toggleAccordian(3)}>
            <h4 class="h1">Can I bring my own furniture?</h4>
            {this.activeInstance == 3 ? <ion-icon name="remove" /> : <ion-icon name="add" /> }
          </button>
          <p class="accordian-content">
            All of our apartments are move-in ready. They are complete with contemporary furniture, a fully equipped kitchen (cookware, cutlery, e.t.c.)
            and set up with Wifi and Cable TV.<br /><br />
            Not all units come with linen and towels, but a package is available for purchase at our Soho office.For most units, landlords are able to
            offer bed changes to accommodate larger groups.
          </p>
        </div>

        <div class="accordian-item" data-index="4">
          <button class="accordian-header button-reset flex-col-wrapper" onClick={() => this.toggleAccordian(4)}>
            <h4 class="h1">Can I flex the start-date?</h4>
            {this.activeInstance == 4 ? <ion-icon name="remove" /> : <ion-icon name="add" /> }
          </button>
          <p class="accordian-content">
            All of our apartments are move-in ready. They are complete with contemporary furniture, a fully equipped kitchen (cookware, cutlery, e.t.c.)
            and set up with Wifi and Cable TV.<br /><br />
            Not all units come with linen and towels, but a package is available for purchase at our Soho office.For most units, landlords are able to
            offer bed changes to accommodate larger groups.
          </p>
        </div>
      </div>
    ]
  }
}
