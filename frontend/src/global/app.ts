import '@ionic/core';
// import { setupConfig } from '@ionic/core';
import { setupConfig } from '../services/environment/environment-config';

setupConfig({
    API_URL: '<@API_URL@>',
    BASE_URL: '<@BASE_URL@>'
});

export default () => {
  // setupConfig({
  //   mode: 'ios'
  // });
};
