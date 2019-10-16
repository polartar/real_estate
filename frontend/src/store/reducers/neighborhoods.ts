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
          id: 1,
          name: 'Tribeca',
          slug: 'tribeca',
          image: '/assets/images/neighborhoods/tribeca.jpg'
        },
        {
          id: 1,
          name: 'Financial District',
          slug: 'financial-district',
          image: '/assets/images/financial-district.jpg'
        },
        {
          id: 1,
          name: 'Battery Park City',
          slug: 'battery-park-city',
          image: '/assets/images/neighborhoods/battery-park-city.jpg'
        },
        {
          id: 1,
          name: 'Tribeca',
          slug: 'tribeca',
          image: '/assets/images/neighborhoods/tribeca.jpg'
        },
        {
          id: 1,
          name: 'Financial District',
          slug: 'financial-district',
          image: '/assets/images/financial-district.jpg'
        },
        {
          id: 1,
          name: 'Battery Park City',
          slug: 'battery-park-city',
          image: '/assets/images/neighborhoods/battery-park-city.jpg'
        },
        {
          id: 1,
          name: 'Tribeca',
          slug: 'tribeca',
          image: '/assets/images/neighborhoods/tribeca.jpg'
        },
        {
          id: 1,
          name: 'Financial District',
          slug: 'financial-district',
          image: '/assets/images/financial-district.jpg'
        },
        {
          id: 1,
          name: 'Battery Park City',
          slug: 'battery-park-city',
          image: '/assets/images/neighborhoods/battery-park-city.jpg'
        },
        {
          id: 1,
          name: 'Tribeca',
          slug: 'tribeca',
          image: '/assets/images/neighborhoods/tribeca.jpg'
        },
        {
          id: 1,
          name: 'Financial District',
          slug: 'financial-district',
          image: '/assets/images/financial-district.jpg'
        },
        {
          id: 1,
          name: 'Battery Park City',
          slug: 'battery-park-city',
          image: '/assets/images/neighborhoods/battery-park-city.jpg'
        },
        {
          id: 1,
          name: 'Tribeca',
          slug: 'tribeca',
          image: '/assets/images/neighborhoods/tribeca.jpg'
        },
        {
          id: 1,
          name: 'Financial District',
          slug: 'financial-district',
          image: '/assets/images/financial-district.jpg'
        },
        {
          id: 1,
          name: 'Battery Park City',
          slug: 'battery-park-city',
          image: '/assets/images/neighborhoods/battery-park-city.jpg'
        },
        {
          id: 1,
          name: 'Tribeca',
          slug: 'tribeca',
          image: '/assets/images/neighborhoods/tribeca.jpg'
        },
        {
          id: 1,
          name: 'Financial District',
          slug: 'financial-district',
          image: '/assets/images/financial-district.jpg'
        },
        {
          id: 1,
          name: 'Battery Park City',
          slug: 'battery-park-city',
          image: '/assets/images/neighborhoods/battery-park-city.jpg'
        },
        {
          id: 1,
          name: 'Tribeca',
          slug: 'tribeca',
          image: '/assets/images/neighborhoods/tribeca.jpg'
        },
        {
          id: 1,
          name: 'Financial District',
          slug: 'financial-district',
          image: '/assets/images/financial-district.jpg'
        },
      ],
      'Midtown': [
        {
          id: 1,
          name: 'Battery Park City',
          slug: 'battery-park-city',
          image: '/assets/images/neighborhoods/battery-park-city.jpg'
        },
        {
          id: 1,
          name: 'Tribeca',
          slug: 'tribeca',
          image: '/assets/images/neighborhoods/tribeca.jpg'
        },
        {
          id: 1,
          name: 'Financial District',
          slug: 'financial-district',
          image: '/assets/images/financial-district.jpg'
        },
      ],
      'Upper East': [
        {
          id: 1,
          name: 'Battery Park City',
          slug: 'battery-park-city',
          image: '/assets/images/neighborhoods/battery-park-city.jpg'
        },
        {
          id: 1,
          name: 'Tribeca',
          slug: 'tribeca',
          image: '/assets/images/neighborhoods/tribeca.jpg'
        },
        {
          id: 1,
          name: 'Financial District',
          slug: 'financial-district',
          image: '/assets/images/financial-district.jpg'
        },
      ],
      'Upper West': [
        {
          id: 1,
          name: 'Battery Park City',
          slug: 'battery-park-city',
          image: '/assets/images/neighborhoods/battery-park-city.jpg'
        },
        {
          id: 1,
          name: 'Tribeca',
          slug: 'tribeca',
          image: '/assets/images/neighborhoods/tribeca.jpg'
        },
        {
          id: 1,
          name: 'Financial District',
          slug: 'financial-district',
          image: '/assets/images/financial-district.jpg'
        },
      ],
      'Upper Manhattan': [
        {
          id: 1,
          name: 'Battery Park City',
          slug: 'battery-park-city',
          image: '/assets/images/neighborhoods/battery-park-city.jpg'
        },
        {
          id: 1,
          name: 'Tribeca',
          slug: 'tribeca',
          image: '/assets/images/neighborhoods/tribeca.jpg'
        },
        {
          id: 1,
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
