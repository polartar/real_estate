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
          name: 'Battery Park City',
          slug: 'battery-park-city',
          image: '/assets/images/neighborhoods/battery-park-city.jpg'
        },
        {
          id: 5,
          name: 'Tribeca',
          slug: 'tribeca',
          image: '/assets/images/neighborhoods/tribeca.jpg'
        },
        {
          id: 6,
          name: 'Financial District',
          slug: 'financial-district',
          image: '/assets/images/financial-district.jpg'
        },
        {
          id: 7,
          name: 'Battery Park City',
          slug: 'battery-park-city',
          image: '/assets/images/neighborhoods/battery-park-city.jpg'
        },
        {
          id: 8,
          name: 'Tribeca',
          slug: 'tribeca',
          image: '/assets/images/neighborhoods/tribeca.jpg'
        },
        {
          id: 9,
          name: 'Financial District',
          slug: 'financial-district',
          image: '/assets/images/financial-district.jpg'
        },
        {
          id: 10,
          name: 'Battery Park City',
          slug: 'battery-park-city',
          image: '/assets/images/neighborhoods/battery-park-city.jpg'
        },
        {
          id: 11,
          name: 'Tribeca',
          slug: 'tribeca',
          image: '/assets/images/neighborhoods/tribeca.jpg'
        },
        {
          id: 12,
          name: 'Financial District',
          slug: 'financial-district',
          image: '/assets/images/financial-district.jpg'
        },
        {
          id: 13,
          name: 'Battery Park City',
          slug: 'battery-park-city',
          image: '/assets/images/neighborhoods/battery-park-city.jpg'
        },
        {
          id: 14,
          name: 'Tribeca',
          slug: 'tribeca',
          image: '/assets/images/neighborhoods/tribeca.jpg'
        },
        {
          id: 15,
          name: 'Financial District',
          slug: 'financial-district',
          image: '/assets/images/financial-district.jpg'
        },
        {
          id: 16,
          name: 'Battery Park City',
          slug: 'battery-park-city',
          image: '/assets/images/neighborhoods/battery-park-city.jpg'
        },
        {
          id: 17,
          name: 'Tribeca',
          slug: 'tribeca',
          image: '/assets/images/neighborhoods/tribeca.jpg'
        },
        {
          id: 18,
          name: 'Financial District',
          slug: 'financial-district',
          image: '/assets/images/financial-district.jpg'
        },
        {
          id: 19,
          name: 'Battery Park City',
          slug: 'battery-park-city',
          image: '/assets/images/neighborhoods/battery-park-city.jpg'
        },
        {
          id: 20,
          name: 'Tribeca',
          slug: 'tribeca',
          image: '/assets/images/neighborhoods/tribeca.jpg'
        },
        {
          id: 21,
          name: 'Financial District',
          slug: 'financial-district',
          image: '/assets/images/financial-district.jpg'
        },
      ],
      'Midtown': [
        {
          id: 22,
          name: 'Battery Park City',
          slug: 'battery-park-city',
          image: '/assets/images/neighborhoods/battery-park-city.jpg'
        },
        {
          id: 23,
          name: 'Tribeca',
          slug: 'tribeca',
          image: '/assets/images/neighborhoods/tribeca.jpg'
        },
        {
          id: 24,
          name: 'Financial District',
          slug: 'financial-district',
          image: '/assets/images/financial-district.jpg'
        },
      ],
      'Upper East': [
        {
          id: 25,
          name: 'Battery Park City',
          slug: 'battery-park-city',
          image: '/assets/images/neighborhoods/battery-park-city.jpg'
        },
        {
          id: 26,
          name: 'Tribeca',
          slug: 'tribeca',
          image: '/assets/images/neighborhoods/tribeca.jpg'
        },
        {
          id: 27,
          name: 'Financial District',
          slug: 'financial-district',
          image: '/assets/images/financial-district.jpg'
        },
      ],
      'Upper West': [
        {
          id: 28,
          name: 'Battery Park City',
          slug: 'battery-park-city',
          image: '/assets/images/neighborhoods/battery-park-city.jpg'
        },
        {
          id: 29,
          name: 'Tribeca',
          slug: 'tribeca',
          image: '/assets/images/neighborhoods/tribeca.jpg'
        },
        {
          id: 30,
          name: 'Financial District',
          slug: 'financial-district',
          image: '/assets/images/financial-district.jpg'
        },
      ],
      'Upper Manhattan': [
        {
          id: 31,
          name: 'Battery Park City',
          slug: 'battery-park-city',
          image: '/assets/images/neighborhoods/battery-park-city.jpg'
        },
        {
          id: 32,
          name: 'Tribeca',
          slug: 'tribeca',
          image: '/assets/images/neighborhoods/tribeca.jpg'
        },
        {
          id: 33,
          name: 'Financial District',
          slug: 'financial-district',
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
