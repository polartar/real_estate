import { ActionTypes } from "../actions/index";

interface neighborhoodsState {
  neighborhoods: any;
}

const getInitialState = () => {
  return {
    neighborhoods: {
      'Downtown': [
        {
          id: 1,
          name: 'Battery Park City',
          slug: 'battery-park-city',
          image: '/assets/images/neighborhoods/battery-park-city.jpg'
        },
        {
          id: 2,
          name: 'Tribeca',
          slug: 'tribeca',
          image: '/assets/images/neighborhoods/tribeca.jpg'
        },
        {
          id: 3,
          name: 'Financial District',
          slug: 'financial-district',
          image: '/assets/images/financial-district.jpg'
        },
        {
          id: 4,
          name: 'Fulton/Seaport',
          slug: 'fulton-seaport',
          image: '/assets/images/neighborhoods/battery-park-city.jpg'
        },
        {
          id: 5,
          name: 'Civic/Center',
          slug: 'civic-center',
          image: '/assets/images/neighborhoods/tribeca.jpg'
        },
        {
          id: 6,
          name: 'Chinatown',
          slug: 'chinatown',
          image: '/assets/images/financial-district.jpg'
        },
        {
          id: 7,
          name: 'Two Bridges',
          slug: 'two-bridges',
          image: '/assets/images/neighborhoods/battery-park-city.jpg'
        },
        {
          id: 8,
          name: 'Lower East Side',
          slug: 'lower-east-side',
          image: '/assets/images/neighborhoods/tribeca.jpg'
        },
        {
          id: 9,
          name: 'Little Italy',
          slug: 'little-italy',
          image: '/assets/images/financial-district.jpg'
        },
        {
          id: 10,
          name: 'Nolita',
          slug: 'nolita',
          image: '/assets/images/neighborhoods/battery-park-city.jpg'
        },
        {
          id: 11,
          name: 'Soho',
          slug: 'soho',
          image: '/assets/images/neighborhoods/tribeca.jpg'
        },
        {
          id: 12,
          name: 'Noho',
          slug: 'noho',
          image: '/assets/images/financial-district.jpg'
        },
        {
          id: 13,
          name: 'Greenwich Village',
          slug: 'greenwich-village',
          image: '/assets/images/neighborhoods/battery-park-city.jpg'
        },
        {
          id: 14,
          name: 'East Village',
          slug: 'east-village',
          image: '/assets/images/neighborhoods/tribeca.jpg'
        },
        {
          id: 15,
          name: 'West Village',
          slug: 'west-village',
          image: '/assets/images/financial-district.jpg'
        },
        {
          id: 16,
          name: 'Stuyvesant Town',
          slug: 'stuyvesant-town',
          image: '/assets/images/neighborhoods/battery-park-city.jpg'
        },
        {
          id: 17,
          name: 'Gramercy Park',
          slug: 'gramercy-park',
          image: '/assets/images/neighborhoods/tribeca.jpg'
        },
        {
          id: 18,
          name: 'Chelsea',
          slug: 'chelsea',
          image: '/assets/images/financial-district.jpg'
        },
        {
          id: 19,
          name: 'West Chelsea',
          slug: 'west-chelsea',
          image: '/assets/images/neighborhoods/battery-park-city.jpg'
        },
        {
          id: 20,
          name: 'Flatiron',
          slug: 'flatiron',
          image: '/assets/images/neighborhoods/tribeca.jpg'
        }
      ],
      'Midtown': [
        {
          id: 22,
          name: 'Midtown East',
          slug: 'midtown-east',
          image: '/assets/images/neighborhoods/battery-park-city.jpg'
        },
        {
          id: 23,
          name: 'Kips Bay',
          slug: 'kips-bay',
          image: '/assets/images/neighborhoods/tribeca.jpg'
        },
        {
          id: 24,
          name: 'Murray Hill',
          slug: 'murray-hill',
          image: '/assets/images/financial-district.jpg'
        },
        {
          id: 25,
          name: 'Turtle Bay',
          slug: 'turtle-bay',
          image: '/assets/images/neighborhoods/battery-park-city.jpg'
        },
        {
          id: 26,
          name: 'Beekman',
          slug: 'beekman',
          image: '/assets/images/neighborhoods/tribeca.jpg'
        },
        {
          id: 27,
          name: 'Sutton Place',
          slug: 'sutton-place',
          image: '/assets/images/financial-district.jpg'
        },
        {
          id: 28,
          name: 'Midtown',
          slug: 'midtown',
          image: '/assets/images/financial-district.jpg'
        },
        {
          id: 29,
          name: 'Central Park South',
          slug: 'central-park-south',
          image: '/assets/images/financial-district.jpg'
        },
        {
          id: 30,
          name: 'Midtown South',
          slug: 'midtown-south',
          image: '/assets/images/financial-district.jpg'
        },
        {
          id: 31,
          name: 'Midtown West',
          slug: 'midtown-west',
          image: '/assets/images/financial-district.jpg'
        },
        {
          id: 32,
          name: 'Roosevelt Island',
          slug: 'roosevelt-island',
          image: '/assets/images/financial-district.jpg'
        },
      ],
      'Upper East': [
        {
          id: 33,
          name: 'Upper East Side',
          slug: 'upper-east-side',
          image: '/assets/images/neighborhoods/battery-park-city.jpg'
        },
        {
          id: 34,
          name: 'Lenox Hill',
          slug: 'lenox-hill',
          image: '/assets/images/neighborhoods/tribeca.jpg'
        },
        {
          id: 35,
          name: 'Yorkville',
          slug: 'yorkville',
          image: '/assets/images/financial-district.jpg'
        },
        {
          id: 36,
          name: 'Carnegie Hill',
          slug: 'carnegie-hill',
          image: '/assets/images/financial-district.jpg'
        },
        {
          id: 37,
          name: 'Upper Carnegie Hill',
          slug: 'upper-carnegie-hill',
          image: '/assets/images/financial-district.jpg'
        }
      ],
      'Upper West': [
        {
          id: 38,
          name: 'Upper West Side',
          slug: 'upper-west-side',
          image: '/assets/images/neighborhoods/battery-park-city.jpg'
        },
        {
          id: 39,
          name: 'Lincoln Square',
          slug: 'lincoln-square',
          image: '/assets/images/neighborhoods/tribeca.jpg'
        },
        {
          id: 40,
          name: 'Manhattan Valley',
          slug: 'manhattan-valley',
          image: '/assets/images/financial-district.jpg'
        },
        {
          id: 41,
          name: 'Morningside Heights',
          slug: 'morningside-heights',
          image: '/assets/images/morningside-heights.jpg'
        }
      ],
      'Upper Manhattan': [
        {
          id: 42,
          name: 'Harlem',
          slug: 'harlem',
          image: '/assets/images/neighborhoods/battery-park-city.jpg'
        },
        {
          id: 43,
          name: 'East Harlem',
          slug: 'east-harlem',
          image: '/assets/images/neighborhoods/tribeca.jpg'
        },
        {
          id: 44,
          name: 'South Harlem',
          slug: 'south-harlem',
          image: '/assets/images/financial-district.jpg'
        },
        {
          id: 45,
          name: 'Central Harlem',
          slug: 'central-harlem',
          image: '/assets/images/financial-district.jpg'
        },
        {
          id: 46,
          name: 'West Harlem',
          slug: 'west-harlem',
          image: '/assets/images/financial-district.jpg'
        },
        {
          id: 47,
          name: 'Manhattanville',
          slug: 'manhattanville',
          image: '/assets/images/financial-district.jpg'
        },
        {
          id: 48,
          name: 'Hamilton Heights',
          slug: 'hamilton-heights',
          image: '/assets/images/financial-district.jpg'
        },
        {
          id: 49,
          name: 'Washington Heights',
          slug: 'washington-heights',
          image: '/assets/images/financial-district.jpg'
        },
        {
          id: 50,
          name: 'Fort George',
          slug: 'fort-george',
          image: '/assets/images/financial-district.jpg'
        },
        {
          id: 51,
          name: 'Hudson Heights',
          slug: 'hudson-heights',
          image: '/assets/images/financial-district.jpg'
        },
        {
          id: 52,
          name: 'Inwood',
          slug: 'inwood',
          image: '/assets/images/financial-district.jpg'
        },
        {
          id: 53,
          name: 'Marble Hill',
          slug: 'marble-hill',
          image: '/assets/images/financial-district.jpg'
        },
      ]
    }
  };
};

const neighborhoodsReducer = (
  state: neighborhoodsState = getInitialState(),
  action: ActionTypes
) => {
  switch (action.type) {
    // case Actions.TOGGLE_SEARCH_FILTER_DISPLAY: {
    //   return {
    //     ...state,
    //     displayFilter: action.payload
    //   };
    // }
  }

  return state;
};

export default neighborhoodsReducer;
