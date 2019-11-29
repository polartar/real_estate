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

      const queryParms = encodeURIComponent(JSON.stringify(params));
      let response = await fetch(APIService.getAPIUrl() + '/search/map_markers?params=' + queryParms, {
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

}

export const APISearchService = new APISearchInstance();
