import { EnvironmentConfigService } from '../services/environment/environment-config.service';

class SEOServiceInstance {
    setTitle(title) {
      document.title = title;
      document.querySelector('meta[name="title"]').setAttribute("content", title);
      document.querySelector('meta[property="og:title"]').setAttribute("content", title);
    }
    
    setDescription(description) {
      document.querySelector('meta[name="description"]').setAttribute("content", description);
      document.querySelector('meta[property="og:description"]').setAttribute("content", description);
    }

    setOG (params) {
      if (params.hasOwnProperty('type')) {
        document.querySelector('meta[property="og:type"]').setAttribute("content", params.type);
      }
      
      if (params.hasOwnProperty('url')) {
        document.querySelector('meta[property="og:url"]').setAttribute("content", params.url);
      }
      
      if (params.hasOwnProperty('image')) {
        document.querySelector('meta[property="og:image"]').setAttribute("content", params.image);
      }
      
      if (params.hasOwnProperty('site_name')) {
        document.querySelector('meta[property="og:site_name"]').setAttribute("content", params.site_name);
      }
    }

    setCanonical(url) {
      document.querySelector('link[rel="canonical"]').setAttribute("href", url);
    }

    /**
     * Update the metatags based on the path
     * 
     * Add new values to seoValues for new pages
     * 
     * @param e 
     */
    update(e) {
      const seoValues = {
        '/': {
          title: 'APT212 - #1 SOURCE FOR NEW YORK CITY FURNISHED APARTMENTS',
          description: "New York City's number 1 source for furnished apartments, sublets, and legal short term rentals. Search, find, and book your furnished apartment today.",
          og: {
            type: 'article',
            url: EnvironmentConfigService.getInstance().get('BASE_URL'),
            image: '/assets/images/og-social.jpg',
            site_name: 'Apt212.com'
          }
        },
        '/search-apartments': {
          title: 'NYC Apartment Finder | Search 1,000+ Short-term Rental in NYC | APT212',
          description: "Search, find 1,000+ furnished apartments in New York City at your fingertips with APT212. Find budget-friendly apartments, private rooms with modern amenities."
        },
      }

      const defaultOG = {
        type: 'article',
        url: EnvironmentConfigService.getInstance().get('BASE_URL') + e.detail.to,
        image: '/assets/images/og-social.jpg',
        site_name: 'Apt212.com'
      };

      const key = seoValues.hasOwnProperty(e.detail.to) ? e.detail.to : false;

      if (key !== false) {
        this.setTitle(seoValues[key].title);
        this.setDescription(seoValues[key].description);

        const ogParams = seoValues[key].hasOwnProperty('og') ? {...defaultOG, ...seoValues[key].og} : defaultOG;

        this.setOG(ogParams);

        this.setCanonical(defaultOG.url);
      }
    }
}
  
  export const SEOService = new SEOServiceInstance();
  