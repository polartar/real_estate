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
      let response = await fetch(APIService.getAPIUrl() + '/search', {
        method: 'POST',
        headers: APIService.getHeaders(),
        body: JSON.stringify(filters)
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
