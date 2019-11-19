import { APIService } from './api.service';

class APITaxonomyInstance {

  public async getTaxonomy() {
    try {
      let response = await fetch(APIService.getAPIUrl() + '/taxonomy', {
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

}

export const APITaxonomyService = new APITaxonomyInstance();
