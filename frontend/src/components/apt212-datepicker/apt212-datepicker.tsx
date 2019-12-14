import { Component, h, Element, Event, EventEmitter, Prop } from '@stencil/core';
import datepicker from 'js-datepicker'

@Component({
  tag: 'apt212-datepicker',
  styleUrl: 'apt212-datepicker.scss'
})
export class Apt212Datepicker {
  @Element() el: HTMLElement;
  @Prop() size: number = 1.2;
  picker: any;
  @Prop() value: any;
  @Prop() minDate: any = new Date();

  @Event() selected: EventEmitter;

  componentDidLoad() {
    const node = this.el.querySelector('.datepicker');
    this.picker = datepicker(node, {
      alwaysShow: true,
      startDay: 1,
      minDate: this.minDate,
      dateSelected: this.value,
      disableYearOverlay: true,
      onSelect: (_instance, date) => {
        this.selected.emit(date);
      },
      onMonthChange: () => {
        this.padNumbers();
      },
      onShow: () => {
        // need settimeout to allow the component to render before querying the dom nodes
        // doesn't appear to be any better event for it
        setTimeout(() => {
          this.padNumbers();

          const wrapper: any = this.el.querySelector('.picker-wrapper');
          const pickerEl: any = this.el.querySelector('.qs-datepicker-container');

          wrapper.style.width = `${pickerEl.clientWidth}px`;
          wrapper.style.height = `${pickerEl.clientHeight}px`;
          wrapper.style.opacity = '1';
        }, 250);
      }
    });

    if (!this.value) {
      // advance the calendar to the next available date by setting the date
      // then removing it
      // this prevents a current empty-month from showing up
      this.picker.setDate(this.minDate);
      this.picker.setDate();
    }

    this.picker.calendarContainer.style.setProperty('font-size', `${this.size}rem`);
  }

  padNumbers() {
    const squares: any = this.el.querySelectorAll('.qs-square .qs-num');

    squares.forEach(square => {
      if (square.innerText.length === 1) {
        square.innerText = '0' + square.innerText;
      }
    });
  }

  render() {
    return (
      <div class="apt212-datepicker-component">
        <div class="picker-wrapper">
          <div class="datepicker" />
        </div>
      </div>
    )
  }
}
