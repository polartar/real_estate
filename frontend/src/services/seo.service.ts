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
        '/nyc-neighborhoods': {
          title: 'NYC Apartments for Rent By Neighborhood | APT212',
          description: "Find your next NYC apartment in in Manhattan by neighborhood, price, amenity, and more at APT212. We are the NYC’s number 1 source to find your long or short term rental."
        },
        '/nyc-neighborhood/battery-park-city/apartments': {
          title: 'Battery Park City Apartments for Rent, NYC, New York | APT212',
          description: "Find your next furnished rental apartment in Battery Park City at great prices with APT212. We are NYC’s number 1 source to find your short or long term rental."
        },
        '/nyc-neighborhood/tribeca/apartments': {
          title: 'Tribeca Apartments for Rent, NYC, New York | APT212',
          description: "Find your next furnished rental apartment in Tribeca at great prices with APT212. We are NYC’s number 1 source to find your short or long term rental."
        },
        '/nyc-neighborhood/financial-district/apartments': {
          title: 'Financial District Apartments for Rent, NYC, New York | APT212',
          description: "Find your next furnished rental apartment in the Financial District at great prices with APT212. We are NYC’s number 1 source to find your short or long term rental."
        },
        '/nyc-neighborhood/nomad/apartments': {
          title: 'Nomad Apartments for Rent, NYC, New York | APT212',
          description: "Find your next furnished rental apartment in Nomad at great prices with APT212. We are NYC’s number 1 source to find your short or long term rental."
        },
        '/nyc-neighborhood/chinatown/apartments': {
          title: 'Chinatown Apartments for Rent, NYC, New York | APT212',
          description: "Find your next furnished rental apartment in Chinatown at great prices with APT212. We are NYC’s number 1 source to find your short or long term rental."
        },
        '/nyc-neighborhood/little-italy/apartments': {
          title: 'Little Italy Apartments for Rent, NYC, New York | APT212',
          description: "Find your next furnished rental apartment in Little Italy at great prices with APT212. We are NYC’s number 1 source to find your short or long term rental."
        },
        '/nyc-neighborhood/nolita/apartments': {
          title: 'Nolita Apartments for Rent, NYC, New York | APT212',
          description: "Find your next furnished rental apartment in Nolita at great prices with APT212. We are NYC’s number 1 source to find your short or long term rental."
        },
        '/nyc-neighborhood/greenwich-village/apartments': {
          title: 'Greenwich Village Apartments for Rent, NYC, New York | APT212',
          description: "Find your next furnished rental apartment in Greenwich Village at great prices with APT212. We are NYC’s number 1 source to find your short or long term rental."
        },
        '/nyc-neighborhood/soho/apartments': {
          title: 'Soho Apartments for Rent, NYC, New York | APT212',
          description: "Find your next furnished rental apartment in Soho at great prices with APT212. We are NYC’s number 1 source to find your short or long term rental."
        },
        '/nyc-neighborhood/noho/apartments': {
          title: 'Noho Apartments for Rent, NYC, New York | APT212',
          description: "Find your next furnished rental apartment in Noho at great prices with APT212. We are NYC’s number 1 source to find your short or long term rental."
        },
        '/nyc-neighborhood/east-village/apartments': {
          title: 'East Village Apartments for Rent, NYC, New York | APT212',
          description: "Find your next furnished rental apartment in East Village at great prices with APT212. We are NYC’s number 1 source to find your short or long term rental."
        },
        '/nyc-neighborhood/west-village/apartments': {
          title: 'West Village Apartments for Rent, NYC, New York | APT212',
          description: "Find your next furnished rental apartment in West Village at great prices with APT212. We are NYC’s number 1 source to find your short or long term rental."
        },
        '/nyc-neighborhood/stuyvesant-town/apartments': {
          title: 'Stuyvesant Town Apartments for Rent, NYC, New York | APT212',
          description: "Find your next furnished rental apartment in Stuyvesant Town at great prices with APT212. We are NYC’s number 1 source to find your short or long term rental."
        },
        '/nyc-neighborhood/gramercy/apartments': {
          title: 'Gramercy Apartments for Rent, NYC, New York | APT212',
          description: "Find your next furnished rental apartment in Gramercy at great prices with APT212. We are NYC’s number 1 source to find your short or long term rental."
        },
        '/nyc-neighborhood/chelsea/apartments': {
          title: 'Chelsea Apartments for Rent, NYC, New York | APT212',
          description: "Find your next furnished rental apartment in Chelsea at great prices with APT212. We are NYC’s number 1 source to find your short or long term rental."
        },
        '/nyc-neighborhood/flatiron/apartments': {
          title: 'Flatiron Apartments for Rent, NYC, New York | APT212',
          description: "Find your next furnished rental apartment in Flatiron at great prices with APT212. We are NYC’s number 1 source to find your short or long term rental."
        },
        '/nyc-neighborhood/midtown-east/apartments': {
          title: 'Midtown East Apartments for Rent, NYC, New York | APT212',
          description: "Find your next furnished rental apartment in Midtown East at great prices with APT212. We are NYC’s number 1 source to find your short or long term rental."
        },
        '/nyc-neighborhood/midtown-west/apartments': {
          title: 'Midtown Westr Apartments for Rent, NYC, New York | APT212',
          description: "Find your next furnished rental apartment in Midtown West at great prices with APT212. We are NYC’s number 1 source to find your short or long term rental."
        },
        '/nyc-neighborhood/murray-hill/apartments': {
          title: 'Murray Hill Apartments for Rent, NYC, New York | APT212',
          description: "Find your next furnished rental apartment in Murray Hill at great prices with APT212. We are NYC’s number 1 source to find your short or long term rental."
        },
        '/nyc-neighborhood/midtown/apartments': {
          title: 'Midtown Apartments for Rent, NYC, New York | APT212',
          description: "Find your next furnished rental apartment in Midtown at great prices with APT212. We are NYC’s number 1 source to find your short or long term rental."
        },
        '/nyc-neighborhood/upper-east-side/apartments': {
          title: 'Upper East Side Apartments for Rent, NYC, New York | APT212',
          description: "Find your next furnished rental apartment in Upper East Side at great prices with APT212. We are NYC’s number 1 source to find your short or long term rental."
        },
        '/nyc-neighborhood/upper-west-side/apartments': {
          title: 'Upper West Side Apartments for Rent, NYC, New York | APT212',
          description: "Find your next furnished rental apartment in Upper West Side at great prices with APT212. We are NYC’s number 1 source to find your short or long term rental."
        },
        '/nyc-neighborhood/harlem/apartments': {
          title: 'Harlem Apartments for Rent, NYC, New York | APT212',
          description: "Find your next furnished rental apartment in Harlem at great prices with APT212. We are NYC’s number 1 source to find your short or long term rental."
        }
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

      // set a body class based on first section of url
      const handler = e.detail.to.split('/')[1];
      document.body.classList.forEach(className => {
        if (className.startsWith('page-')) {
          document.body.classList.remove(className);
        }
      });

      document.body.classList.add(`page-${handler}`);
    }
}

  export const SEOService = new SEOServiceInstance();
