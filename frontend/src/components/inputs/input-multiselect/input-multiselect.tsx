import { Component, h, Prop, State, EventEmitter, Event, Method } from '@stencil/core';
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
  @State() internalOptions: any[] = [];

  @Event() onValueChange: EventEmitter;

  renderNode: HTMLElement;
  closeIcon: HTMLElement;
  instance: any;

  componentWillLoad() {
    this.internalValue = this.value;
    this.internalOptions = this.options;
  }

  componentDidLoad() {
    if (!this.options.length) {
      return;
    }

    this.initializeInput();
  }

  @Method()
  async updateOptions(options: any[]) {
    this.internalOptions = [...options];

    const possibleValues = options.map(v => v.value);

    this.internalValue = [...this.internalValue].filter(v => possibleValues.includes(v));

    this.initializeInput();
  }

  initializeInput() {
    if (this.instance) {
      // remove old instance
      this.renderNode.innerHTML = '';
    }

    this.instance = new SelectPure(this.renderNode, {
      options: this.internalOptions,
      multiple: true,
      value: this.internalValue,
      onChange: () => this.valueChanged(),
      inlineIcon: this.closeIcon
    });
  }

  valueChanged() {
    this.internalValue = [...this.instance.value()];

    this.onValueChange.emit(this.internalValue);
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
