import { APIService } from './api.service';

class APISearchInstance {

  public async getNamedSearch(name) {
    try {
      let response = await fetch(APIService.getAPIUrl() + '/search/named/' + name, {
        headers: APIService.getHeaders()
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }

      return await response.json();
    } catch (err) {
      throw new Error(err);
    }
  }


  public async search(filters) {
    try {

      const params = encodeURIComponent(JSON.stringify(filters));

      let response = await fetch(APIService.getAPIUrl() + '/search?params=' + params, {
        headers: APIService.getHeaders(),
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }

      return await response.json();
    } catch (err) {
      throw new Error(err);
    }
  }

  public async markerSearch(params) {
    try {
      let response = await fetch(APIService.getAPIUrl() + '/mapMarkers', {
        method: 'POST',
        headers: APIService.getHeaders(),
        body: JSON.stringify(params)
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }

      return await response.json();
    } catch (err) {
      throw new Error(err);
    }
  }

}

export const APISearchService = new APISearchInstance();
