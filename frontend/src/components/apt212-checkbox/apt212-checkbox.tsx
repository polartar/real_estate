import { Component, h, Prop, Element, Method, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'apt212-checkbox',
  styleUrl: 'apt212-checkbox.scss'
})
export class Apt212Checkbox {
  @Prop({ reflect: true }) value: string;
  @Prop() name: string;
  @Prop() checked: boolean = false;
  @Element() el: HTMLElement;

  @Event() checkBoxChange: EventEmitter;
  checkboxChangeHandler() {
    const cb = this.getCheckbox();

    this.checkBoxChange.emit({
      name: this.name,
      value: this.value,
      checked: cb.checked
    });
  }

  @Method('check')
  async check() {
    const cb = this.getCheckbox();

    cb.checked = true;

    this.valueChanged();
  }

  @Method('uncheck')
  async uncheck() {
    const cb = this.getCheckbox();

    cb.checked = false;

    this.valueChanged();
  }

  @Method('isChecked')
  async isChecked() {
    const cb = this.getCheckbox();
    return cb.checked;
  }

  getCheckbox() {
    const cb: any = this.el.querySelector('input[type="checkbox"]');

    return cb;
  }

  valueChanged() {
    const cb = this.getCheckbox();

    if (cb.checked) {
      this.el.querySelector('.checkbox').classList.add('checked');
    }
    else {
      this.el.querySelector('.checkbox').classList.remove('checked');
    }

    this.checkboxChangeHandler();
  }

  render() {
    let checkboxProps: any = {
      name: this.name,
      value: this.value,
      onChange: () => this.valueChanged()
    };

    if (this.checked) {
      checkboxProps.checked = true;
    }

    return (
      <label class="apt212-checkbox">
        <input type="checkbox" {...checkboxProps} />
        <span class={{ checkbox: true, checked: this.checked }} />

        <slot />
      </label>
    )
  }
}
