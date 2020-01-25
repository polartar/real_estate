import { Component, h, Prop, State } from '@stencil/core';
import SelectPure from 'select-pure';

//https://github.com/dudyn5ky1/select-pure

@Component({
  tag: 'input-multiselect',
  styleUrl: 'input-multiselect.scss'
})
export class InputMultiselect {
  @Prop() name!: string;
  @Prop() options!: any[]; // [{ label: 'string', value: 'string' }]
  @Prop() value: any[] = [];

  @State() internalValue: any[] = [];

  renderNode: HTMLElement;
  closeIcon: HTMLElement;
  instance: any;

  componentWillLoad() {
    this.internalValue = this.value;
  }

  componentDidLoad() {
    if (!this.options.length) {
      return;
    }

    this.instance = new SelectPure(this.renderNode, {
      options: this.options,
      multiple: true,
      value: this.value,
      onChange: () => this.valueChanged(),
      inlineIcon: this.closeIcon
    });
  }

  valueChanged() {
    this.internalValue = [...this.instance.value()];
  }

  render() {
    return (
      <div class="input-multiselect-component">
        <span class="example" ref={el => this.renderNode = el as HTMLElement } />

        <div class="values">
            <img src="/assets/images/icons/cancel-white.svg" alt="close" class="close-icon" ref={el => this.closeIcon = el as HTMLElement } />
          {
            this.internalValue.map(v => <input type="hidden" name={`${this.name}[]`} value={v} />)
          }
        </div>
      </div>
    )
  }
}
