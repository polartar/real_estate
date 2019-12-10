/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import { HTMLStencilElement, JSXBase } from '@stencil/core/internal';
import {
  prefetchComponentInterface,
} from './components/component-prefetch/component-prefetch';

export namespace Components {
  interface AppFooter {
    'noMargin': boolean;
  }
  interface AppHeader {
    'hideSearchButton': boolean;
  }
  interface AppMenu {}
  interface AppProfile {
    'name': string;
  }
  interface AppRoot {}
  interface Apt212Checkbox {
    'check': () => Promise<void>;
    'checked': boolean;
    'isChecked': () => Promise<any>;
    'name': string;
    'uncheck': () => Promise<void>;
    'value': string;
  }
  interface Apt212Popover {
    'animateSrc'?: string;
    'bindTo': any;
    'component': string;
    'componentProps': any;
    'dismiss': () => Promise<void>;
    'styleOverride': any;
    'target': any;
  }
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
  interface ComponentPrefetch {
    /**
    * @param components an array of component information to prefetch  [ { tag: 'my-component', props: { myProp: value, otherProp, otherValue } } ]
    */
    'setComponents': (components: prefetchComponentInterface[]) => Promise<void>;
    'setDelay': (delay: number) => Promise<void>;
  }
  interface Content404 {}
  interface FaqAccordian {}
  interface FilterTag {
    'tag': any;
  }
  interface FilterTags {}
  interface FilterTagsAll {}
  interface LazyImage {
    'alt': string;
    'expand': boolean;
    'src': string;
  }
  interface ListingCard {
    'contentPadding': boolean;
    'item': any;
  }
  interface ListingList {
    'items': any[];
  }
  interface ListingMap {
    'item': any;
  }
  interface ListingSlider {
    'items': any[];
  }
  interface ListingTable {
    'items': any[];
  }
  interface LocationFilter {
    'inModal': boolean;
  }
  interface MaintainRatio {
    'height': number;
    'maxHeight'?: number;
    'maxWidth'?: number;
    'minHeight'?: number;
    'minWidth'?: number;
    'width': number;
  }
  interface MapListingCard {
    'item': any;
  }
  interface MapListingDetails {
    'markerId': any;
  }
  interface MapListingMarker {
    'markerId': any;
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
  interface Page404 {}
  interface PageHome {
    'prefetching': boolean;
  }
  interface PageListing {
    'apartmentId': number;
  }
  interface PageListingBody {
    'item': any;
  }
  interface PageListingCheckin {}
  interface PageListingImageModal {
    'src': string;
  }
  interface PageListingImageSlider {
    'item': any;
  }
  interface PageSearch {
    'location': any;
    'neighborhoods': any;
    'prefetching': boolean;
    'size': string;
    'width': any;
  }
  interface PageWishlist {}
  interface PriceFilter {
    'inModal': boolean;
  }
  interface SearchFilters {
    'closeable': boolean;
  }
  interface SearchListingCard {
    'contentPadding': boolean;
    'item': any;
  }
  interface SearchMap {
    'addNeighborhood': (slug: any, coords: any) => Promise<void>;
    'autoInit': boolean;
    'init': () => Promise<void>;
    'listingHover': number | boolean;
    'loading': boolean;
    'location': any;
    'mapMarkers': any[];
    'removeNeighborhood': (slug: any) => Promise<void>;
    'resize': () => Promise<void>;
    'searchFilters': any;
    'showDetails': (markerId: any) => Promise<void>;
  }
  interface SearchShareselectedDropdown {}
  interface SearchSortbyDropdown {}
  interface SearchStateEmpty {}
  interface StarRating {
    'color': string;
    'rating': number;
    'readonly': boolean;
    'size': number;
    'stars': number;
  }
  interface YoutubeVideo {
    /**
    * Explicit height of the video
    */
    'height': string;
    /**
    * The youtube video URL
    */
    'src': string;
    /**
    * Title of the video
    */
    'videoTitle': string;
    /**
    * Explicit width of the video
    */
    'width': string;
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

  interface HTMLApt212CheckboxElement extends Components.Apt212Checkbox, HTMLStencilElement {}
  var HTMLApt212CheckboxElement: {
    prototype: HTMLApt212CheckboxElement;
    new (): HTMLApt212CheckboxElement;
  };

  interface HTMLApt212PopoverElement extends Components.Apt212Popover, HTMLStencilElement {}
  var HTMLApt212PopoverElement: {
    prototype: HTMLApt212PopoverElement;
    new (): HTMLApt212PopoverElement;
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

  interface HTMLComponentPrefetchElement extends Components.ComponentPrefetch, HTMLStencilElement {}
  var HTMLComponentPrefetchElement: {
    prototype: HTMLComponentPrefetchElement;
    new (): HTMLComponentPrefetchElement;
  };

  interface HTMLContent404Element extends Components.Content404, HTMLStencilElement {}
  var HTMLContent404Element: {
    prototype: HTMLContent404Element;
    new (): HTMLContent404Element;
  };

  interface HTMLFaqAccordianElement extends Components.FaqAccordian, HTMLStencilElement {}
  var HTMLFaqAccordianElement: {
    prototype: HTMLFaqAccordianElement;
    new (): HTMLFaqAccordianElement;
  };

  interface HTMLFilterTagElement extends Components.FilterTag, HTMLStencilElement {}
  var HTMLFilterTagElement: {
    prototype: HTMLFilterTagElement;
    new (): HTMLFilterTagElement;
  };

  interface HTMLFilterTagsElement extends Components.FilterTags, HTMLStencilElement {}
  var HTMLFilterTagsElement: {
    prototype: HTMLFilterTagsElement;
    new (): HTMLFilterTagsElement;
  };

  interface HTMLFilterTagsAllElement extends Components.FilterTagsAll, HTMLStencilElement {}
  var HTMLFilterTagsAllElement: {
    prototype: HTMLFilterTagsAllElement;
    new (): HTMLFilterTagsAllElement;
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

  interface HTMLListingMapElement extends Components.ListingMap, HTMLStencilElement {}
  var HTMLListingMapElement: {
    prototype: HTMLListingMapElement;
    new (): HTMLListingMapElement;
  };

  interface HTMLListingSliderElement extends Components.ListingSlider, HTMLStencilElement {}
  var HTMLListingSliderElement: {
    prototype: HTMLListingSliderElement;
    new (): HTMLListingSliderElement;
  };

  interface HTMLListingTableElement extends Components.ListingTable, HTMLStencilElement {}
  var HTMLListingTableElement: {
    prototype: HTMLListingTableElement;
    new (): HTMLListingTableElement;
  };

  interface HTMLLocationFilterElement extends Components.LocationFilter, HTMLStencilElement {}
  var HTMLLocationFilterElement: {
    prototype: HTMLLocationFilterElement;
    new (): HTMLLocationFilterElement;
  };

  interface HTMLMaintainRatioElement extends Components.MaintainRatio, HTMLStencilElement {}
  var HTMLMaintainRatioElement: {
    prototype: HTMLMaintainRatioElement;
    new (): HTMLMaintainRatioElement;
  };

  interface HTMLMapListingCardElement extends Components.MapListingCard, HTMLStencilElement {}
  var HTMLMapListingCardElement: {
    prototype: HTMLMapListingCardElement;
    new (): HTMLMapListingCardElement;
  };

  interface HTMLMapListingDetailsElement extends Components.MapListingDetails, HTMLStencilElement {}
  var HTMLMapListingDetailsElement: {
    prototype: HTMLMapListingDetailsElement;
    new (): HTMLMapListingDetailsElement;
  };

  interface HTMLMapListingMarkerElement extends Components.MapListingMarker, HTMLStencilElement {}
  var HTMLMapListingMarkerElement: {
    prototype: HTMLMapListingMarkerElement;
    new (): HTMLMapListingMarkerElement;
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

  interface HTMLPage404Element extends Components.Page404, HTMLStencilElement {}
  var HTMLPage404Element: {
    prototype: HTMLPage404Element;
    new (): HTMLPage404Element;
  };

  interface HTMLPageHomeElement extends Components.PageHome, HTMLStencilElement {}
  var HTMLPageHomeElement: {
    prototype: HTMLPageHomeElement;
    new (): HTMLPageHomeElement;
  };

  interface HTMLPageListingElement extends Components.PageListing, HTMLStencilElement {}
  var HTMLPageListingElement: {
    prototype: HTMLPageListingElement;
    new (): HTMLPageListingElement;
  };

  interface HTMLPageListingBodyElement extends Components.PageListingBody, HTMLStencilElement {}
  var HTMLPageListingBodyElement: {
    prototype: HTMLPageListingBodyElement;
    new (): HTMLPageListingBodyElement;
  };

  interface HTMLPageListingCheckinElement extends Components.PageListingCheckin, HTMLStencilElement {}
  var HTMLPageListingCheckinElement: {
    prototype: HTMLPageListingCheckinElement;
    new (): HTMLPageListingCheckinElement;
  };

  interface HTMLPageListingImageModalElement extends Components.PageListingImageModal, HTMLStencilElement {}
  var HTMLPageListingImageModalElement: {
    prototype: HTMLPageListingImageModalElement;
    new (): HTMLPageListingImageModalElement;
  };

  interface HTMLPageListingImageSliderElement extends Components.PageListingImageSlider, HTMLStencilElement {}
  var HTMLPageListingImageSliderElement: {
    prototype: HTMLPageListingImageSliderElement;
    new (): HTMLPageListingImageSliderElement;
  };

  interface HTMLPageSearchElement extends Components.PageSearch, HTMLStencilElement {}
  var HTMLPageSearchElement: {
    prototype: HTMLPageSearchElement;
    new (): HTMLPageSearchElement;
  };

  interface HTMLPageWishlistElement extends Components.PageWishlist, HTMLStencilElement {}
  var HTMLPageWishlistElement: {
    prototype: HTMLPageWishlistElement;
    new (): HTMLPageWishlistElement;
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

  interface HTMLSearchListingCardElement extends Components.SearchListingCard, HTMLStencilElement {}
  var HTMLSearchListingCardElement: {
    prototype: HTMLSearchListingCardElement;
    new (): HTMLSearchListingCardElement;
  };

  interface HTMLSearchMapElement extends Components.SearchMap, HTMLStencilElement {}
  var HTMLSearchMapElement: {
    prototype: HTMLSearchMapElement;
    new (): HTMLSearchMapElement;
  };

  interface HTMLSearchShareselectedDropdownElement extends Components.SearchShareselectedDropdown, HTMLStencilElement {}
  var HTMLSearchShareselectedDropdownElement: {
    prototype: HTMLSearchShareselectedDropdownElement;
    new (): HTMLSearchShareselectedDropdownElement;
  };

  interface HTMLSearchSortbyDropdownElement extends Components.SearchSortbyDropdown, HTMLStencilElement {}
  var HTMLSearchSortbyDropdownElement: {
    prototype: HTMLSearchSortbyDropdownElement;
    new (): HTMLSearchSortbyDropdownElement;
  };

  interface HTMLSearchStateEmptyElement extends Components.SearchStateEmpty, HTMLStencilElement {}
  var HTMLSearchStateEmptyElement: {
    prototype: HTMLSearchStateEmptyElement;
    new (): HTMLSearchStateEmptyElement;
  };

  interface HTMLStarRatingElement extends Components.StarRating, HTMLStencilElement {}
  var HTMLStarRatingElement: {
    prototype: HTMLStarRatingElement;
    new (): HTMLStarRatingElement;
  };

  interface HTMLYoutubeVideoElement extends Components.YoutubeVideo, HTMLStencilElement {}
  var HTMLYoutubeVideoElement: {
    prototype: HTMLYoutubeVideoElement;
    new (): HTMLYoutubeVideoElement;
  };
  interface HTMLElementTagNameMap {
    'app-footer': HTMLAppFooterElement;
    'app-header': HTMLAppHeaderElement;
    'app-menu': HTMLAppMenuElement;
    'app-profile': HTMLAppProfileElement;
    'app-root': HTMLAppRootElement;
    'apt212-checkbox': HTMLApt212CheckboxElement;
    'apt212-popover': HTMLApt212PopoverElement;
    'bathroom-filter': HTMLBathroomFilterElement;
    'bedroom-filter': HTMLBedroomFilterElement;
    'building-type-filter': HTMLBuildingTypeFilterElement;
    'component-prefetch': HTMLComponentPrefetchElement;
    'content-404': HTMLContent404Element;
    'faq-accordian': HTMLFaqAccordianElement;
    'filter-tag': HTMLFilterTagElement;
    'filter-tags': HTMLFilterTagsElement;
    'filter-tags-all': HTMLFilterTagsAllElement;
    'lazy-image': HTMLLazyImageElement;
    'listing-card': HTMLListingCardElement;
    'listing-list': HTMLListingListElement;
    'listing-map': HTMLListingMapElement;
    'listing-slider': HTMLListingSliderElement;
    'listing-table': HTMLListingTableElement;
    'location-filter': HTMLLocationFilterElement;
    'maintain-ratio': HTMLMaintainRatioElement;
    'map-listing-card': HTMLMapListingCardElement;
    'map-listing-details': HTMLMapListingDetailsElement;
    'map-listing-marker': HTMLMapListingMarkerElement;
    'media-logos': HTMLMediaLogosElement;
    'mobile-filter-menu': HTMLMobileFilterMenuElement;
    'move-in-date-filter': HTMLMoveInDateFilterElement;
    'neighborhood-card': HTMLNeighborhoodCardElement;
    'neighborhood-slider': HTMLNeighborhoodSliderElement;
    'page-404': HTMLPage404Element;
    'page-home': HTMLPageHomeElement;
    'page-listing': HTMLPageListingElement;
    'page-listing-body': HTMLPageListingBodyElement;
    'page-listing-checkin': HTMLPageListingCheckinElement;
    'page-listing-image-modal': HTMLPageListingImageModalElement;
    'page-listing-image-slider': HTMLPageListingImageSliderElement;
    'page-search': HTMLPageSearchElement;
    'page-wishlist': HTMLPageWishlistElement;
    'price-filter': HTMLPriceFilterElement;
    'search-filters': HTMLSearchFiltersElement;
    'search-listing-card': HTMLSearchListingCardElement;
    'search-map': HTMLSearchMapElement;
    'search-shareselected-dropdown': HTMLSearchShareselectedDropdownElement;
    'search-sortby-dropdown': HTMLSearchSortbyDropdownElement;
    'search-state-empty': HTMLSearchStateEmptyElement;
    'star-rating': HTMLStarRatingElement;
    'youtube-video': HTMLYoutubeVideoElement;
  }
}

declare namespace LocalJSX {
  interface AppFooter extends JSXBase.HTMLAttributes<HTMLAppFooterElement> {
    'noMargin'?: boolean;
  }
  interface AppHeader extends JSXBase.HTMLAttributes<HTMLAppHeaderElement> {
    'hideSearchButton'?: boolean;
  }
  interface AppMenu extends JSXBase.HTMLAttributes<HTMLAppMenuElement> {}
  interface AppProfile extends JSXBase.HTMLAttributes<HTMLAppProfileElement> {
    'name'?: string;
  }
  interface AppRoot extends JSXBase.HTMLAttributes<HTMLAppRootElement> {}
  interface Apt212Checkbox extends JSXBase.HTMLAttributes<HTMLApt212CheckboxElement> {
    'checked'?: boolean;
    'name'?: string;
    'onCheckBoxChange'?: (event: CustomEvent<any>) => void;
    'value'?: string;
  }
  interface Apt212Popover extends JSXBase.HTMLAttributes<HTMLApt212PopoverElement> {
    'animateSrc'?: string;
    'bindTo'?: any;
    'component': string;
    'componentProps'?: any;
    'styleOverride'?: any;
    'target'?: any;
  }
  interface BathroomFilter extends JSXBase.HTMLAttributes<HTMLBathroomFilterElement> {
    'inModal'?: boolean;
  }
  interface BedroomFilter extends JSXBase.HTMLAttributes<HTMLBedroomFilterElement> {
    'inModal'?: boolean;
  }
  interface BuildingTypeFilter extends JSXBase.HTMLAttributes<HTMLBuildingTypeFilterElement> {
    'inModal'?: boolean;
  }
  interface ComponentPrefetch extends JSXBase.HTMLAttributes<HTMLComponentPrefetchElement> {}
  interface Content404 extends JSXBase.HTMLAttributes<HTMLContent404Element> {}
  interface FaqAccordian extends JSXBase.HTMLAttributes<HTMLFaqAccordianElement> {}
  interface FilterTag extends JSXBase.HTMLAttributes<HTMLFilterTagElement> {
    'tag'?: any;
  }
  interface FilterTags extends JSXBase.HTMLAttributes<HTMLFilterTagsElement> {
    'onShowAllTags'?: (event: CustomEvent<void>) => void;
  }
  interface FilterTagsAll extends JSXBase.HTMLAttributes<HTMLFilterTagsAllElement> {}
  interface LazyImage extends JSXBase.HTMLAttributes<HTMLLazyImageElement> {
    'alt'?: string;
    'expand'?: boolean;
    'src'?: string;
  }
  interface ListingCard extends JSXBase.HTMLAttributes<HTMLListingCardElement> {
    'contentPadding'?: boolean;
    'item'?: any;
  }
  interface ListingList extends JSXBase.HTMLAttributes<HTMLListingListElement> {
    'items'?: any[];
  }
  interface ListingMap extends JSXBase.HTMLAttributes<HTMLListingMapElement> {
    'item': any;
  }
  interface ListingSlider extends JSXBase.HTMLAttributes<HTMLListingSliderElement> {
    'items'?: any[];
  }
  interface ListingTable extends JSXBase.HTMLAttributes<HTMLListingTableElement> {
    'items'?: any[];
  }
  interface LocationFilter extends JSXBase.HTMLAttributes<HTMLLocationFilterElement> {
    'inModal'?: boolean;
  }
  interface MaintainRatio extends JSXBase.HTMLAttributes<HTMLMaintainRatioElement> {
    'height': number;
    'maxHeight'?: number;
    'maxWidth'?: number;
    'minHeight'?: number;
    'minWidth'?: number;
    'width': number;
  }
  interface MapListingCard extends JSXBase.HTMLAttributes<HTMLMapListingCardElement> {
    'item': any;
  }
  interface MapListingDetails extends JSXBase.HTMLAttributes<HTMLMapListingDetailsElement> {
    'markerId': any;
  }
  interface MapListingMarker extends JSXBase.HTMLAttributes<HTMLMapListingMarkerElement> {
    'markerId': any;
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
  interface Page404 extends JSXBase.HTMLAttributes<HTMLPage404Element> {}
  interface PageHome extends JSXBase.HTMLAttributes<HTMLPageHomeElement> {
    'prefetching'?: boolean;
  }
  interface PageListing extends JSXBase.HTMLAttributes<HTMLPageListingElement> {
    'apartmentId'?: number;
  }
  interface PageListingBody extends JSXBase.HTMLAttributes<HTMLPageListingBodyElement> {
    'item': any;
  }
  interface PageListingCheckin extends JSXBase.HTMLAttributes<HTMLPageListingCheckinElement> {}
  interface PageListingImageModal extends JSXBase.HTMLAttributes<HTMLPageListingImageModalElement> {
    'src': string;
  }
  interface PageListingImageSlider extends JSXBase.HTMLAttributes<HTMLPageListingImageSliderElement> {
    'item': any;
  }
  interface PageSearch extends JSXBase.HTMLAttributes<HTMLPageSearchElement> {
    'location'?: any;
    'neighborhoods'?: any;
    'prefetching'?: boolean;
    'size'?: string;
    'width'?: any;
  }
  interface PageWishlist extends JSXBase.HTMLAttributes<HTMLPageWishlistElement> {}
  interface PriceFilter extends JSXBase.HTMLAttributes<HTMLPriceFilterElement> {
    'inModal'?: boolean;
  }
  interface SearchFilters extends JSXBase.HTMLAttributes<HTMLSearchFiltersElement> {
    'closeable'?: boolean;
  }
  interface SearchListingCard extends JSXBase.HTMLAttributes<HTMLSearchListingCardElement> {
    'contentPadding'?: boolean;
    'item'?: any;
  }
  interface SearchMap extends JSXBase.HTMLAttributes<HTMLSearchMapElement> {
    'autoInit'?: boolean;
    'listingHover'?: number | boolean;
    'loading'?: boolean;
    'location'?: any;
    'mapMarkers'?: any[];
    'onMapLoaded'?: (event: CustomEvent<void>) => void;
    'searchFilters'?: any;
  }
  interface SearchShareselectedDropdown extends JSXBase.HTMLAttributes<HTMLSearchShareselectedDropdownElement> {}
  interface SearchSortbyDropdown extends JSXBase.HTMLAttributes<HTMLSearchSortbyDropdownElement> {}
  interface SearchStateEmpty extends JSXBase.HTMLAttributes<HTMLSearchStateEmptyElement> {}
  interface StarRating extends JSXBase.HTMLAttributes<HTMLStarRatingElement> {
    'color'?: string;
    'onRated'?: (event: CustomEvent<number>) => void;
    'rating'?: number;
    'readonly'?: boolean;
    'size'?: number;
    'stars'?: number;
  }
  interface YoutubeVideo extends JSXBase.HTMLAttributes<HTMLYoutubeVideoElement> {
    /**
    * Explicit height of the video
    */
    'height'?: string;
    /**
    * The youtube video URL
    */
    'src': string;
    /**
    * Title of the video
    */
    'videoTitle'?: string;
    /**
    * Explicit width of the video
    */
    'width'?: string;
  }

  interface IntrinsicElements {
    'app-footer': AppFooter;
    'app-header': AppHeader;
    'app-menu': AppMenu;
    'app-profile': AppProfile;
    'app-root': AppRoot;
    'apt212-checkbox': Apt212Checkbox;
    'apt212-popover': Apt212Popover;
    'bathroom-filter': BathroomFilter;
    'bedroom-filter': BedroomFilter;
    'building-type-filter': BuildingTypeFilter;
    'component-prefetch': ComponentPrefetch;
    'content-404': Content404;
    'faq-accordian': FaqAccordian;
    'filter-tag': FilterTag;
    'filter-tags': FilterTags;
    'filter-tags-all': FilterTagsAll;
    'lazy-image': LazyImage;
    'listing-card': ListingCard;
    'listing-list': ListingList;
    'listing-map': ListingMap;
    'listing-slider': ListingSlider;
    'listing-table': ListingTable;
    'location-filter': LocationFilter;
    'maintain-ratio': MaintainRatio;
    'map-listing-card': MapListingCard;
    'map-listing-details': MapListingDetails;
    'map-listing-marker': MapListingMarker;
    'media-logos': MediaLogos;
    'mobile-filter-menu': MobileFilterMenu;
    'move-in-date-filter': MoveInDateFilter;
    'neighborhood-card': NeighborhoodCard;
    'neighborhood-slider': NeighborhoodSlider;
    'page-404': Page404;
    'page-home': PageHome;
    'page-listing': PageListing;
    'page-listing-body': PageListingBody;
    'page-listing-checkin': PageListingCheckin;
    'page-listing-image-modal': PageListingImageModal;
    'page-listing-image-slider': PageListingImageSlider;
    'page-search': PageSearch;
    'page-wishlist': PageWishlist;
    'price-filter': PriceFilter;
    'search-filters': SearchFilters;
    'search-listing-card': SearchListingCard;
    'search-map': SearchMap;
    'search-shareselected-dropdown': SearchShareselectedDropdown;
    'search-sortby-dropdown': SearchSortbyDropdown;
    'search-state-empty': SearchStateEmpty;
    'star-rating': StarRating;
    'youtube-video': YoutubeVideo;
  }
}

export { LocalJSX as JSX };


declare module "@stencil/core" {
  export namespace JSX {
    interface IntrinsicElements extends LocalJSX.IntrinsicElements {}
  }
}


