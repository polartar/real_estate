import { Component, h, Prop, Method, Element } from '@stencil/core';

@Component({
  tag: 'apt212-toast',
  styleUrl: 'apt212-toast.scss'
})
export class Apt212Toast {
  @Element() el: HTMLElement;

  @Prop() message: string = '';
  @Prop() duration: number = 5000;
  @Prop() color: 'error' | 'success' | 'neutral' = 'neutral';

  wrapper: HTMLElement;
  messageContainer: HTMLElement;

  @Method('present')
  async present() {
    this.wrapper.classList.add('present');

    setTimeout(() => {
      this.dismiss();
    }, this.duration)
  }

  @Method('dismiss')
  async dismiss() {
    this.el.remove();
  }

  render() {
    const classList = {
      'apt212-toast-component': true,
    };

    classList[this.color] = true;

    return (
      <div class={classList} ref={el => this.wrapper = el as HTMLElement }>
        <div class="message">
          { this.message.split('\n').map(m => <div>{m}</div>) }
        </div>
        <button class="button-reset close" onClick={() => this.dismiss()}>
          Close
        </button>
      </div>
    )
  }
}
