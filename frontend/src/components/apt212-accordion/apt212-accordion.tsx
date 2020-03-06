import { Component, State, EventEmitter, Event, Prop, h } from '@stencil/core';

@Component({
  tag: 'apt212-accordion',
  styleUrl: 'apt212-accordion.scss'
})

export class Apt212Accordion {

  @State() toggle: boolean = false;
  @Event() onToggle: EventEmitter;
  @Prop() label: string;
  @Prop() description: string;
  @Prop() questionID: string;
 

  toggleComponent() {
    this.toggle = !this.toggle;
    this.onToggle.emit({ visible: this.toggle });
  }

  render() {

    return (
      <div>
      <button id={this.questionID} class="accordion"
      onClick={() => this.toggleComponent()}>
      {this.label}
      {this.toggle ? <ion-icon class="chevron" src="assets/images/icons/chevron_down.svg" />  : <ion-icon class="chevron" src="assets/images/icons/chevron_up.svg" /> }
      </button>
      <div class={`content-box ${this.toggle ? 'open-question' : 'close-question'}`}
>
      <p>{this.description}</p>
      </div>
      </div>
    )
  }
}