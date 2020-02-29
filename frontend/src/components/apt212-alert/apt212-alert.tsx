import { Component, h, Prop, Element } from '@stencil/core';

@Component({
  tag: 'apt212-alert',
  styleUrl: 'apt212-alert.scss'
})
export class Apt212Alert {
  @Element() el: HTMLElement;
  @Prop() header?: string;
  @Prop() subheader?: string;
  @Prop() message: string;
  @Prop() buttons: any[] = [];

  wrapper: HTMLElement;

  componentDidRender() {
    const mw: any = this.el.closest('.modal-wrapper');

    if (mw) {
      mw.style.setProperty('--height', `${this.wrapper.clientHeight + 40}px`);
    }
  }

  buttonAction(b) {
    if (b.handler) {
      b.handler();
    }

    const modal = this.el.closest('ion-modal');
    if (modal) {
      modal.dismiss();
    }
  }

  render() {
    return (
      <div class="apt212-alert-component">
        <div class="alert-content" ref={el => this.wrapper = el as HTMLElement }>
          <div class="alert-head">
            {
              this.header ?
              <div class="header">{ this.header }</div>
              : null
            }

            {
              this.subheader ?
              <div class="subheader">{ this.subheader }</div>
              : null
            }
          </div>

          {
            this.message ?
            <div class="message">{this.message}</div>
            : null
          }
        </div>

        {
          this.buttons.length ?
            <div class="buttons">
              {
                this.buttons.map(b => {
                  let cssClass = {
                    'button-reset': true,
                    button: true
                  };

                  if (b.cssClass) {
                    b.cssClass.split(' ').forEach(className => {
                      cssClass[className] = true;
                    });
                  }

                  return (
                    <button class={cssClass} role={b.role ? b.role : false} onClick={() => this.buttonAction(b)}>
                      {b.text}
                    </button>
                  )
              })
              }
            </div>
          : null
        }
      </div>
    )
  }
}
