import '@ionic/core';

// import { setupConfig } from '@ionic/core';
import { setupConfig } from '../services/environment/environment-config';

setupConfig({
    API_URL: '<@API_URL@>',
    BASE_URL: '<@BASE_URL@>',
    APP_ENVIRONMENT: '<@APP_ENVIRONMENT@>',
    MAPBOX_PUBLIC_TOKEN: '<@MAPBOX_PUBLIC_TOKEN@>',
    STRIPE_PUBLIC_KEY: '<@STRIPE_PUBLIC_KEY@>',
    PLAID_PUBLIC_KEY: '<@PLAID_PUBLIC_KEY@>',
    PLAID_ENVIRONMENT: '<@PLAID_ENVIRONMENT@>'
});

export default () => {
  // setupConfig({
  //   mode: 'ios'
  // });
};
