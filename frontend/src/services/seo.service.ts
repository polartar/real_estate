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
        },
        '/booking': {
          title: 'APT212 Furnished Apartments, Rooms, Corporate House Booking',
          description: 'Book your furnished apartments, rooms and corporate house online with APT212. We accept all payment mode like Visa, MasterCard and more. For any query call us today.'
        },
        '/corporate-housing': {
          title: 'Corporate Housing - Apartments, Rooms for Business Traveller’s | APT212.com',
          description: 'APT212 is the NYC’s number 1 source for short-term corporate housing solution for business travelers. Search, find, & book your corporate rooms, apartments today.'
        },
        '/faq': {
          title: 'FAQ | APT212',
          description: "We have tried hard to make APT212 a simple platform for all who looking for furnished apartments in New Youk City. If you have any query that aren't answered here, please get in touch."
        },
        '/privacy-policy': {
          title: 'Privacy Policy | APT212',
          description: 'This privacy policy describes you about the type, scope, and purpose of data collection.  We use this data to provide and improve the service.'
        },
        '/referral': {
          title: 'REFER A FRIEND & EARN $200 | APT212',
          description: 'Help your friend find the best short term, furnished rental options in NYC and in turn get a $200 gift card from APT212. We are a trusted player in the market.'
        },
        '/rooms-for-rent': {
          title: 'Private Rooms for Rent in New York, Manhattan NYC | APT212',
          description: 'Welcome to APT212, Your number 1 source to find a room for rent around NYC & Manhattan. Use our quick filters and find your next room for rent in New York City.'
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
  