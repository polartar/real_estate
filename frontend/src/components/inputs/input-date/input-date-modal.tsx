import { Component, h, Prop, Element } from '@stencil/core';

@Component({
  tag: 'input-date-modal',
  styleUrl: 'input-date-modal.scss'
})
export class InputDateModal {
  @Element() el: HTMLElement;
  @Prop() value: string;
  @Prop() label: string;
  @Prop() helpText: string;

  close(value) {
    const modal: any = this.el.closest('ion-modal');

    modal.dismiss({
      value: value
    });
  }

  render() {
    return (
      <div class="input-date-modal-component">
        {
          this.label ?
            <label htmlFor="input-date-modal-input">{this.label}</label>
          : null
        }
        <apt212-datepicker id="input-date-modal-input" size={1.4} onSelected={e => this.close(e.detail) }/>

        {
          this.helpText ?
            <div class="help-text">{this.helpText}</div>
          : null
        }
      </div>
    )
  }
}
