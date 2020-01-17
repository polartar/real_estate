import { APIService } from './api.service';

class APINeighborhoodsInstance {

  public async geocodeAddress(address) {
    try {
      let response = await fetch(APIService.getAPIUrl() + '/neighborhoods/geocode/' + encodeURIComponent(address), {
        headers: APIService.getHeaders(),
      });

      if (!response.ok) {
        const statusText = response.statusText;
        const r = await response.json();

        if (r.hasOwnProperty('message')) {
          throw new Error(r.message);
        }

        throw new Error(statusText);
      }

      return await response.json();
    } catch (err) {
      throw new Error(err.message);
    }
  }

  public async neighborhoodsFromPoint(lng, lat) {
    try {
      let response = await fetch(APIService.getAPIUrl() + `/neighborhoods/fromPoint/${lng}/${lat}`, {
        headers: APIService.getHeaders(),
      });

      if (!response.ok) {
        const statusText = response.statusText;
        const r = await response.json();

        if (r.hasOwnProperty('message')) {
          throw new Error(r.message);
        }

        throw new Error(statusText);
      }

      return await response.json();
    } catch (err) {
      throw new Error(err.message);
    }
  }
}

export const APINeighborhoodsService = new APINeighborhoodsInstance();
