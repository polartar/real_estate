import { r as registerInstance, h } from './core-f013bada.js';
import { R as RouterService } from './router.service-eedf07d2.js';

const AgentCard = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.items = [];
        this.mode = "";
        this.contentPadding = false;
        this.isMobile = true;
    }
    render() {
        const classObj = { "listing-card": true };
        if (this.mode) {
            classObj[this.mode] = true;
        }
        return [
            h("div", { class: "agent-list" }, h("div", { class: "agent-wrapper" }, this.items.map((_) => (h("div", null, h("div", { class: classObj }, h("maintain-ratio", { width: 322, height: 182 }, h("lazy-image", { src: "/assets/images/corporate-rooms/easy-mobility.png", class: "list-feature-image", alt: "neighborhood name" })), h("div", { class: { "listing-content-padding": this.contentPadding } }, h("h4", { class: "listing-title" }, "East Village"), h("div", { class: "price" }, "1400 per month"), h("div", { class: "bed-bath" }, h("div", null, h("lazy-image", { src: "/assets/images/icons/bedroom.svg", class: "bedrooms", alt: "bedroom" }), " ", "3 Bedroom"), h("div", { class: "divider" }, "|"), h("div", null, h("lazy-image", { src: "/assets/images/icons/bathroom.svg", class: "bathrooms", alt: "bathroom" }), " ", "3 Bathroom")), h("div", { class: "rating-amenities" }, h("star-rating", { stars: 5, size: this.isMobile && this.mode !== "desktop" ? 16 : 16, rating: 4, readonly: true }), h("div", { class: "amenities" }, "Elevator")))))))), h("ion-router-link", { href: RouterService.getRoute("search"), class: "show-all" }, "Show All", " ")),
        ];
    }
    static get style() { return "/*$font-default: \"Proxima Nova\", sans-serif;\n$font-strong: \'Proxima Nova Black\', sans-serif;\n$font-title: \'Proxima Nova Extrabold\', sans-serif;\n*/\n.agent-list .agent-wrapper {\n  display: grid;\n  grid-gap: 40px;\n  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));\n}\n.agent-list listing-card {\n  max-width: 370px;\n}\n.agent-list .show-all {\n  display: inline-block;\n  padding-top: 0.5rem;\n  font-weight: 900;\n}\n\n.listing-card {\n  padding-bottom: 15px;\n}\n.listing-card .listing-title {\n  margin-top: 10px;\n  font-size: 28px;\n  margin-bottom: 5px;\n  text-transform: none;\n}\n\@media (min-width: 768px) {\n  .listing-card .listing-title {\n    font-size: 14px;\n  }\n}\n\@media (min-width: 1200px) {\n  .listing-card .listing-title {\n    font-size: 24px;\n  }\n}\n.listing-card .list-feature-image {\n  width: 100%;\n  height: 100%;\n  -o-object-fit: cover;\n  object-fit: cover;\n}\n.listing-card .price {\n  font-size: 18px;\n  padding-bottom: 0.5rem;\n}\n\@media (min-width: 768px) {\n  .listing-card .price {\n    font-size: 14px;\n  }\n}\n.listing-card .bed-bath {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-align: center;\n  align-items: center;\n  font-size: 18px;\n  padding-bottom: 0.5rem;\n}\n\@media (min-width: 768px) {\n  .listing-card .bed-bath {\n    font-size: 10px;\n  }\n}\n\@media (min-width: 1200px) {\n  .listing-card .bed-bath {\n    font-size: 14px;\n  }\n}\n.listing-card .bed-bath > div {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-align: center;\n  align-items: center;\n}\n.listing-card .bed-bath .divider {\n  padding: 0 0.5rem;\n}\n.listing-card .bedrooms,\n.listing-card .bathrooms {\n  width: 30px;\n  height: 14px;\n  margin-right: 0.25rem;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-align: center;\n  align-items: center;\n}\n\@media (min-width: 768px) {\n  .listing-card .bedrooms,\n.listing-card .bathrooms {\n    width: 0.625rem;\n    height: 0.625rem;\n    margin-right: 0.25rem;\n  }\n}\n\@media (min-width: 1200px) {\n  .listing-card .bedrooms,\n.listing-card .bathrooms {\n    width: 1rem;\n    height: 1rem;\n    margin-right: 0.5rem;\n  }\n}\n.listing-card .rating-amenities {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-align: center;\n  align-items: center;\n  font-size: 18px;\n}\n\@media (min-width: 768px) {\n  .listing-card .rating-amenities {\n    font-size: 10px;\n  }\n}\n.listing-card .rating-amenities .amenities {\n  padding-left: 0.5rem;\n  padding-bottom: 4px;\n}\n.listing-card .listing-content-padding {\n  padding: 0 1rem 0 1rem;\n}\n.listing-card.desktop .listing-title {\n  font-size: 24px;\n}\n.listing-card.desktop .bed-bath {\n  font-size: 14px;\n}\n.listing-card.desktop .bedrooms,\n.listing-card.desktop .bathrooms {\n  width: 1rem;\n  height: 1rem;\n  margin-right: 0.5rem;\n}\n.listing-card.desktop .rating-amenities {\n  font-size: 18px;\n}\n\@media (min-width: 768px) {\n  .listing-card.desktop .rating-amenities {\n    font-size: 14px;\n  }\n}"; }
};

export { AgentCard as agent_card };
