import { EnvironmentConfigService } from './environment/environment-config.service';

class GeocodeServiceInstance {
  async geocode(address) {
    const search = encodeURIComponent(address);
    const mapboxAPIkey = EnvironmentConfigService.getInstance().get('MAPBOX_PUBLIC_TOKEN');

    try {
      // @TODO - use palces-permanent to conform to mapbox TOS, waiting for apt212 account upgrade
      // const place = await fetch('https://api.mapbox.com/geocoding/v5/mapbox.places-permanent/' + search + '.json?access_token=' + mapboxAPIkey + '&cachebuster=' + Date.now());
      const place = await fetch('https://api.mapbox.com/geocoding/v5/mapbox.places/' + search + '.json?access_token=' + mapboxAPIkey + '&cachebuster=' + Date.now());

      const result = await place.json();

      if (result.features && result.features.length) {
        return result.features[0];
      }

      throw new Error('Could not find location');
    } catch(err) {
      throw new Error(err.message);
    }
  }

  async getLngLat(address) {
    try {
      const geocode = await GeocodeService.geocode(address);

      return {
        lng: geocode.center[0],
        lat: geocode.center[1]
      }
    } catch (err) {
      throw new Error(err.message);
    }
  }
}

export const GeocodeService = new GeocodeServiceInstance();
