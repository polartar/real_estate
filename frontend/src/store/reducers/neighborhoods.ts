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
          image: '/assets/images/neighborhoods/battery-park-city.jpg',
          coordinates: [
            [
               [
                  -73.99439,
                  40.719485
              ],
              [
                  -73.99468,
                  40.719596
              ],
              [
                  -73.99538,
                  40.719889
              ],
              [
                  -73.99656,
                  40.720353
              ],
              [
                  -73.99704,
                  40.720545
              ],
              [
                  -73.99738,
                  40.72069
              ],
              [
                  -73.997676,
                  40.720804
              ],
              [
                  -73.99764,
                  40.720864
              ],
              [
                  -73.99761,
                  40.72093
              ],
              [
                  -73.99757,
                  40.721054
              ],
              [
                  -73.99738,
                  40.721537
              ],
              [
                  -73.997154,
                  40.722107
              ],
              [
                  -73.99704,
                  40.722476
              ],
              [
                  -73.99693,
                  40.722819
              ],
              [
                  -73.9968,
                  40.723183
              ],
              [
                  -73.996669,
                  40.723448
              ],
              [
                  -73.99654,
                  40.723629
              ],
              [
                  -73.99618,
                  40.724062
              ],
              [
                  -73.995379,
                  40.72505
              ],
              [
                  -73.9953,
                  40.725025
              ],
              [
                  -73.99451,
                  40.72474
              ],
              [
                  -73.994407,
                  40.724708
              ],
              [
                  -73.994121,
                  40.724646
              ],
              [
                  -73.99397,
                  40.724589
              ],
              [
                  -73.992823,
                  40.724183
              ],
              [
                  -73.99261,
                  40.724108
              ],
              [
                  -73.99267,
                  40.723916
              ],
              [
                  -73.993,
                  40.723056
              ],
              [
                  -73.99334,
                  40.722162
              ],
              [
                  -73.99362,
                  40.721385
              ],
              [
                  -73.993713,
                  40.721147
              ],
              [
                  -73.99398,
                  40.720491
              ],
              [
                  -73.99433,
                  40.719608
              ],
              [
                  -73.99439,
                  40.719485
              ]
            ]
          ]
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
          image: '/assets/images/financial-district.jpg',
          coordinates: [
            [
               [
                  -73.9968,
                  40.725406
               ],
               [
                  -73.99633,
                  40.725946
               ],
               [
                  -73.995529,
                  40.726892
               ],
               [
                  -73.99466,
                  40.727942
               ],
               [
                  -73.99337,
                  40.729468
               ],
               [
                  -73.99242,
                  40.730579
               ],
               [
                  -73.991305,
                  40.73012
               ],
               [
                  -73.99056,
                  40.729804
               ],
               [
                  -73.990111,
                  40.729627
               ],
               [
                  -73.9899,
                  40.729552
               ],
               [
                  -73.99038,
                  40.728881
               ],
               [
                  -73.991206,
                  40.727698
               ],
               [
                  -73.991237,
                  40.727654
               ],
               [
                  -73.9914,
                  40.727386
               ],
               [
                  -73.99147,
                  40.727256
               ],
               [
                  -73.99164,
                  40.726879
               ],
               [
                  -73.991937,
                  40.725991
               ],
               [
                  -73.99229,
                  40.725008
               ],
               [
                  -73.99261,
                  40.724108
               ],
               [
                  -73.992823,
                  40.724183
               ],
               [
                  -73.99397,
                  40.724589
               ],
               [
                  -73.994121,
                  40.724646
               ],
               [
                  -73.994407,
                  40.724708
               ],
               [
                  -73.99451,
                  40.72474
               ],
               [
                  -73.9953,
                  40.725025
               ],
               [
                  -73.995379,
                  40.72505
               ],
               [
                  -73.99552,
                  40.725094
               ],
               [
                  -73.99592,
                  40.7252
               ],
               [
                  -73.99665,
                  40.725369
               ],
               [
                  -73.9968,
                  40.725406
               ]
            ]
         ]
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
          image: '/assets/images/neighborhoods/tribeca.jpg',
          coordinates: [
            [
               [
                  -73.988654,
                  40.722917
               ],
               [
                  -73.98858,
                  40.723072
               ],
               [
                  -73.988491,
                  40.723229
               ],
               [
                  -73.98829,
                  40.72354
               ],
               [
                  -73.9882,
                  40.723654
               ],
               [
                  -73.98764,
                  40.724447
               ],
               [
                  -73.98731,
                  40.724847
               ],
               [
                  -73.98714,
                  40.725066
               ],
               [
                  -73.98699,
                  40.725277
               ],
               [
                  -73.98664,
                  40.725769
               ],
               [
                  -73.98848,
                  40.726549
               ],
               [
                  -73.99025,
                  40.727292
               ],
               [
                  -73.991206,
                  40.727698
               ],
               [
                  -73.99038,
                  40.728881
               ],
               [
                  -73.9899,
                  40.729552
               ],
               [
                  -73.989581,
                  40.729989
               ],
               [
                  -73.98864,
                  40.731277
               ],
               [
                  -73.98798,
                  40.732187
               ],
               [
                  -73.9872,
                  40.733279
               ],
               [
                  -73.98655,
                  40.733003
               ],
               [
                  -73.98544,
                  40.732532
               ],
               [
                  -73.98421,
                  40.732015
               ],
               [
                  -73.98297,
                  40.731492
               ],
               [
                  -73.98258,
                  40.731331
               ],
               [
                  -73.9819,
                  40.731043
               ],
               [
                  -73.98036,
                  40.730391
               ],
               [
                  -73.98007,
                  40.73027
               ],
               [
                  -73.97849,
                  40.729602
               ],
               [
                  -73.97718,
                  40.729055
               ],
               [
                  -73.97586,
                  40.728498
               ],
               [
                  -73.97463,
                  40.727972
               ],
               [
                  -73.97361,
                  40.727529
               ],
               [
                  -73.97329,
                  40.727393
               ],
               [
                  -73.97249,
                  40.727048
               ],
               [
                  -73.9719,
                  40.726788
               ],
               [
                  -73.971613,
                  40.72677
               ],
               [
                  -73.971663,
                  40.726477
               ],
               [
                  -73.971701,
                  40.726239
               ],
               [
                  -73.971763,
                  40.725829
               ],
               [
                  -73.971816,
                  40.725832
               ],
               [
                  -73.971868,
                  40.725501
               ],
               [
                  -73.97193,
                  40.725168
               ],
               [
                  -73.972005,
                  40.724806
               ],
               [
                  -73.972195,
                  40.724044
               ],
               [
                  -73.972448,
                  40.722988
               ],
               [
                  -73.972912,
                  40.721022
               ],
               [
                  -73.973126,
                  40.720109
               ],
               [
                  -73.973233,
                  40.719711
               ],
               [
                  -73.973409,
                  40.719107
               ],
               [
                  -73.973522,
                  40.718735
               ],
               [
                  -73.973564,
                  40.718616
               ],
               [
                  -73.97451,
                  40.718767
               ],
               [
                  -73.975168,
                  40.718854
               ],
               [
                  -73.97602,
                  40.71902
               ],
               [
                  -73.97706,
                  40.719241
               ],
               [
                  -73.97722,
                  40.719282
               ],
               [
                  -73.977346,
                  40.719325
               ],
               [
                  -73.97746,
                  40.719366
               ],
               [
                  -73.97788,
                  40.719542
               ],
               [
                  -73.97805,
                  40.719614
               ],
               [
                  -73.97853,
                  40.719819
               ],
               [
                  -73.97876,
                  40.719897
               ],
               [
                  -73.97888,
                  40.719941
               ],
               [
                  -73.97917,
                  40.720034
               ],
               [
                  -73.979914,
                  40.720258
               ],
               [
                  -73.98004,
                  40.720297
               ],
               [
                  -73.98127,
                  40.720693
               ],
               [
                  -73.98258,
                  40.721062
               ],
               [
                  -73.98394,
                  40.721478
               ],
               [
                  -73.98534,
                  40.7219
               ],
               [
                  -73.98632,
                  40.722201
               ],
               [
                  -73.98724,
                  40.722486
               ],
               [
                  -73.988654,
                  40.722917
               ]
            ]
         ]
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
