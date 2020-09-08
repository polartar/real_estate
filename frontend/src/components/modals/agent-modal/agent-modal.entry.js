import { r as registerInstance, h, d as getElement } from './core-f013bada.js';

const Apt212ModalBookingFrame = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.componentProps = {};
    }
    closeModal() {
        const modal = this.el.closest('ion-modal');
        if (modal) {
            modal.dismiss();
        }
    }
    componentDidLoad() {
        const injectedComponent = Object.assign(document.createElement(this.component), this.componentProps);
        this.el.querySelector('.modal-content').appendChild(injectedComponent);
    }
    render() {
        return (h("ion-content", { class: "apt212-modal-booking-frame-component" }, h("div", { class: "modal-content" }), h("button", { "aria-label": "close", class: "close button-reset", onClick: () => this.closeModal() }, h("img", { src: "/assets/images/icons/cancel.svg" }))));
    }
    get el() { return getElement(this); }
    static get style() { return ".apt212-modal-booking-frame-component {\n  width: 100%;\n  height: 100%;\n  position: relative;\n}\n.apt212-modal-booking-frame-component .close {\n  position: absolute;\n  top: 24px;\n  right: 24px;\n  font-size: 24px;\n  z-index: 1;\n  cursor: pointer;\n}"; }
};

export { Apt212ModalBookingFrame as agent_modal };
