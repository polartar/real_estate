/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import { HTMLStencilElement, JSXBase } from '@stencil/core/internal';


export namespace Components {
  interface AppFooter {}
  interface AppHeader {}
  interface AppMenu {}
  interface AppProfile {
    'name': string;
  }
  interface AppRoot {}
  interface BathroomFilter {
    'clearAll': () => Promise<void>;
    'inModal': boolean;
    'selectAll': () => Promise<void>;
  }
  interface BedroomFilter {
    'clearAll': () => Promise<void>;
    'inModal': boolean;
    'selectAll': () => Promise<void>;
  }
  interface BuildingTypeFilter {
    'clearAll': () => Promise<void>;
    'inModal': boolean;
    'selectAll': () => Promise<void>;
  }
  interface FaqAccordian {}
  interface LazyImage {
    'alt': string;
    'src': string;
  }
  interface ListingCard {
    'contentPadding': boolean;
    'item': any;
  }
  interface ListingList {}
  interface ListingSlider {}
  interface LocationFilter {
    'inModal': boolean;
  }
  interface MediaLogos {}
  interface MobileFilterMenu {}
  interface MoveInDateFilter {
    'inModal': boolean;
  }
  interface NeighborhoodCard {
    'item': any;
  }
  interface NeighborhoodSlider {
    'items': any[];
  }
  interface PageHome {}
  interface PageSearch {
    'headerHeight': number | null;
    'height': number;
    'isMobile': boolean;
    'size': string;
  }
  interface PriceFilter {
    'inModal': boolean;
  }
  interface SearchFilters {}
  interface StarRating {
    'color': string;
    'rating': number;
    'readonly': boolean;
    'size': number;
    'stars': number;
  }
}

declare global {


  interface HTMLAppFooterElement extends Components.AppFooter, HTMLStencilElement {}
  var HTMLAppFooterElement: {
    prototype: HTMLAppFooterElement;
    new (): HTMLAppFooterElement;
  };

  interface HTMLAppHeaderElement extends Components.AppHeader, HTMLStencilElement {}
  var HTMLAppHeaderElement: {
    prototype: HTMLAppHeaderElement;
    new (): HTMLAppHeaderElement;
  };

  interface HTMLAppMenuElement extends Components.AppMenu, HTMLStencilElement {}
  var HTMLAppMenuElement: {
    prototype: HTMLAppMenuElement;
    new (): HTMLAppMenuElement;
  };

  interface HTMLAppProfileElement extends Components.AppProfile, HTMLStencilElement {}
  var HTMLAppProfileElement: {
    prototype: HTMLAppProfileElement;
    new (): HTMLAppProfileElement;
  };

  interface HTMLAppRootElement extends Components.AppRoot, HTMLStencilElement {}
  var HTMLAppRootElement: {
    prototype: HTMLAppRootElement;
    new (): HTMLAppRootElement;
  };

  interface HTMLBathroomFilterElement extends Components.BathroomFilter, HTMLStencilElement {}
  var HTMLBathroomFilterElement: {
    prototype: HTMLBathroomFilterElement;
    new (): HTMLBathroomFilterElement;
  };

  interface HTMLBedroomFilterElement extends Components.BedroomFilter, HTMLStencilElement {}
  var HTMLBedroomFilterElement: {
    prototype: HTMLBedroomFilterElement;
    new (): HTMLBedroomFilterElement;
  };

  interface HTMLBuildingTypeFilterElement extends Components.BuildingTypeFilter, HTMLStencilElement {}
  var HTMLBuildingTypeFilterElement: {
    prototype: HTMLBuildingTypeFilterElement;
    new (): HTMLBuildingTypeFilterElement;
  };

  interface HTMLFaqAccordianElement extends Components.FaqAccordian, HTMLStencilElement {}
  var HTMLFaqAccordianElement: {
    prototype: HTMLFaqAccordianElement;
    new (): HTMLFaqAccordianElement;
  };

  interface HTMLLazyImageElement extends Components.LazyImage, HTMLStencilElement {}
  var HTMLLazyImageElement: {
    prototype: HTMLLazyImageElement;
    new (): HTMLLazyImageElement;
  };

  interface HTMLListingCardElement extends Components.ListingCard, HTMLStencilElement {}
  var HTMLListingCardElement: {
    prototype: HTMLListingCardElement;
    new (): HTMLListingCardElement;
  };

  interface HTMLListingListElement extends Components.ListingList, HTMLStencilElement {}
  var HTMLListingListElement: {
    prototype: HTMLListingListElement;
    new (): HTMLListingListElement;
  };

  interface HTMLListingSliderElement extends Components.ListingSlider, HTMLStencilElement {}
  var HTMLListingSliderElement: {
    prototype: HTMLListingSliderElement;
    new (): HTMLListingSliderElement;
  };

  interface HTMLLocationFilterElement extends Components.LocationFilter, HTMLStencilElement {}
  var HTMLLocationFilterElement: {
    prototype: HTMLLocationFilterElement;
    new (): HTMLLocationFilterElement;
  };

  interface HTMLMediaLogosElement extends Components.MediaLogos, HTMLStencilElement {}
  var HTMLMediaLogosElement: {
    prototype: HTMLMediaLogosElement;
    new (): HTMLMediaLogosElement;
  };

  interface HTMLMobileFilterMenuElement extends Components.MobileFilterMenu, HTMLStencilElement {}
  var HTMLMobileFilterMenuElement: {
    prototype: HTMLMobileFilterMenuElement;
    new (): HTMLMobileFilterMenuElement;
  };

  interface HTMLMoveInDateFilterElement extends Components.MoveInDateFilter, HTMLStencilElement {}
  var HTMLMoveInDateFilterElement: {
    prototype: HTMLMoveInDateFilterElement;
    new (): HTMLMoveInDateFilterElement;
  };

  interface HTMLNeighborhoodCardElement extends Components.NeighborhoodCard, HTMLStencilElement {}
  var HTMLNeighborhoodCardElement: {
    prototype: HTMLNeighborhoodCardElement;
    new (): HTMLNeighborhoodCardElement;
  };

  interface HTMLNeighborhoodSliderElement extends Components.NeighborhoodSlider, HTMLStencilElement {}
  var HTMLNeighborhoodSliderElement: {
    prototype: HTMLNeighborhoodSliderElement;
    new (): HTMLNeighborhoodSliderElement;
  };

  interface HTMLPageHomeElement extends Components.PageHome, HTMLStencilElement {}
  var HTMLPageHomeElement: {
    prototype: HTMLPageHomeElement;
    new (): HTMLPageHomeElement;
  };

  interface HTMLPageSearchElement extends Components.PageSearch, HTMLStencilElement {}
  var HTMLPageSearchElement: {
    prototype: HTMLPageSearchElement;
    new (): HTMLPageSearchElement;
  };

  interface HTMLPriceFilterElement extends Components.PriceFilter, HTMLStencilElement {}
  var HTMLPriceFilterElement: {
    prototype: HTMLPriceFilterElement;
    new (): HTMLPriceFilterElement;
  };

  interface HTMLSearchFiltersElement extends Components.SearchFilters, HTMLStencilElement {}
  var HTMLSearchFiltersElement: {
    prototype: HTMLSearchFiltersElement;
    new (): HTMLSearchFiltersElement;
  };

  interface HTMLStarRatingElement extends Components.StarRating, HTMLStencilElement {}
  var HTMLStarRatingElement: {
    prototype: HTMLStarRatingElement;
    new (): HTMLStarRatingElement;
  };
  interface HTMLElementTagNameMap {
    'app-footer': HTMLAppFooterElement;
    'app-header': HTMLAppHeaderElement;
    'app-menu': HTMLAppMenuElement;
    'app-profile': HTMLAppProfileElement;
    'app-root': HTMLAppRootElement;
    'bathroom-filter': HTMLBathroomFilterElement;
    'bedroom-filter': HTMLBedroomFilterElement;
    'building-type-filter': HTMLBuildingTypeFilterElement;
    'faq-accordian': HTMLFaqAccordianElement;
    'lazy-image': HTMLLazyImageElement;
    'listing-card': HTMLListingCardElement;
    'listing-list': HTMLListingListElement;
    'listing-slider': HTMLListingSliderElement;
    'location-filter': HTMLLocationFilterElement;
    'media-logos': HTMLMediaLogosElement;
    'mobile-filter-menu': HTMLMobileFilterMenuElement;
    'move-in-date-filter': HTMLMoveInDateFilterElement;
    'neighborhood-card': HTMLNeighborhoodCardElement;
    'neighborhood-slider': HTMLNeighborhoodSliderElement;
    'page-home': HTMLPageHomeElement;
    'page-search': HTMLPageSearchElement;
    'price-filter': HTMLPriceFilterElement;
    'search-filters': HTMLSearchFiltersElement;
    'star-rating': HTMLStarRatingElement;
  }
}

declare namespace LocalJSX {
  interface AppFooter extends JSXBase.HTMLAttributes<HTMLAppFooterElement> {}
  interface AppHeader extends JSXBase.HTMLAttributes<HTMLAppHeaderElement> {}
  interface AppMenu extends JSXBase.HTMLAttributes<HTMLAppMenuElement> {}
  interface AppProfile extends JSXBase.HTMLAttributes<HTMLAppProfileElement> {
    'name'?: string;
  }
  interface AppRoot extends JSXBase.HTMLAttributes<HTMLAppRootElement> {}
  interface BathroomFilter extends JSXBase.HTMLAttributes<HTMLBathroomFilterElement> {
    'inModal'?: boolean;
  }
  interface BedroomFilter extends JSXBase.HTMLAttributes<HTMLBedroomFilterElement> {
    'inModal'?: boolean;
  }
  interface BuildingTypeFilter extends JSXBase.HTMLAttributes<HTMLBuildingTypeFilterElement> {
    'inModal'?: boolean;
  }
  interface FaqAccordian extends JSXBase.HTMLAttributes<HTMLFaqAccordianElement> {}
  interface LazyImage extends JSXBase.HTMLAttributes<HTMLLazyImageElement> {
    'alt'?: string;
    'src'?: string;
  }
  interface ListingCard extends JSXBase.HTMLAttributes<HTMLListingCardElement> {
    'contentPadding'?: boolean;
    'item'?: any;
  }
  interface ListingList extends JSXBase.HTMLAttributes<HTMLListingListElement> {}
  interface ListingSlider extends JSXBase.HTMLAttributes<HTMLListingSliderElement> {}
  interface LocationFilter extends JSXBase.HTMLAttributes<HTMLLocationFilterElement> {
    'inModal'?: boolean;
  }
  interface MediaLogos extends JSXBase.HTMLAttributes<HTMLMediaLogosElement> {}
  interface MobileFilterMenu extends JSXBase.HTMLAttributes<HTMLMobileFilterMenuElement> {}
  interface MoveInDateFilter extends JSXBase.HTMLAttributes<HTMLMoveInDateFilterElement> {
    'inModal'?: boolean;
  }
  interface NeighborhoodCard extends JSXBase.HTMLAttributes<HTMLNeighborhoodCardElement> {
    'item'?: any;
  }
  interface NeighborhoodSlider extends JSXBase.HTMLAttributes<HTMLNeighborhoodSliderElement> {
    'items'?: any[];
  }
  interface PageHome extends JSXBase.HTMLAttributes<HTMLPageHomeElement> {}
  interface PageSearch extends JSXBase.HTMLAttributes<HTMLPageSearchElement> {
    'headerHeight'?: number | null;
    'height'?: number;
    'isMobile'?: boolean;
    'size'?: string;
  }
  interface PriceFilter extends JSXBase.HTMLAttributes<HTMLPriceFilterElement> {
    'inModal'?: boolean;
  }
  interface SearchFilters extends JSXBase.HTMLAttributes<HTMLSearchFiltersElement> {}
  interface StarRating extends JSXBase.HTMLAttributes<HTMLStarRatingElement> {
    'color'?: string;
    'onRated'?: (event: CustomEvent<number>) => void;
    'rating'?: number;
    'readonly'?: boolean;
    'size'?: number;
    'stars'?: number;
  }

  interface IntrinsicElements {
    'app-footer': AppFooter;
    'app-header': AppHeader;
    'app-menu': AppMenu;
    'app-profile': AppProfile;
    'app-root': AppRoot;
    'bathroom-filter': BathroomFilter;
    'bedroom-filter': BedroomFilter;
    'building-type-filter': BuildingTypeFilter;
    'faq-accordian': FaqAccordian;
    'lazy-image': LazyImage;
    'listing-card': ListingCard;
    'listing-list': ListingList;
    'listing-slider': ListingSlider;
    'location-filter': LocationFilter;
    'media-logos': MediaLogos;
    'mobile-filter-menu': MobileFilterMenu;
    'move-in-date-filter': MoveInDateFilter;
    'neighborhood-card': NeighborhoodCard;
    'neighborhood-slider': NeighborhoodSlider;
    'page-home': PageHome;
    'page-search': PageSearch;
    'price-filter': PriceFilter;
    'search-filters': SearchFilters;
    'star-rating': StarRating;
  }
}

export { LocalJSX as JSX };


declare module "@stencil/core" {
  export namespace JSX {
    interface IntrinsicElements extends LocalJSX.IntrinsicElements {}
  }
}


