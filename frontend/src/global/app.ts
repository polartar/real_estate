import '@ionic/core';
import 'star-rating-web-component';

// import { setupConfig } from '@ionic/core';
import { setupConfig } from '../services/environment/environment-config';

setupConfig({
    API_URL: '<@API_URL@>',
    BASE_URL: '<@BASE_URL@>',
    APP_ENVIRONMENT: '<@APP_ENVIRONMENT@>'
});

export default () => {
  // setupConfig({
  //   mode: 'ios'
  // });
};
