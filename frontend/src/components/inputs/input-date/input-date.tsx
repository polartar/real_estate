import { Component, h, Prop } from '@stencil/core';
import { formatDate } from '../../../helpers/utils';

@Component({
  tag: 'input-date',
  styleUrl: 'input-date.scss'
})
export class InputDate {
  @Prop({ reflect: true }) name: string;
  @Prop({ mutable: true, reflect: true }) value: string = "";
  @Prop() label: string;
  @Prop() helpText: string;
  @Prop() format: string = 'm/d/y';
  @Prop() placeholder: string = '';

  async init() {
    const modal: any = document.createElement('ion-modal');
    modal.component = 'input-date-modal';
    modal.componentProps = {
      value: this.value,
      label: this.label,
      helpText: this.helpText
    };

    document.body.append(modal);
    modal.present();

    const data = await modal.onWillDismiss();

    if (data && data.data && data.data.value) {
      this.value = formatDate(data.data.value, this.format);
    }
  }

  getValue() {
    return this.value ? formatDate(this.value, this.format) : '';
  }

  render() {
    return (
      <div class="input-date-component">
        <input
          type="text"
          name={this.name}
          class="apt212-input block"
          autocomplete="off"
          value={this.getValue()}
          onClick={() => this.init() }
          placeholder={this.placeholder}
        />
      </div>
    )
  }
}
