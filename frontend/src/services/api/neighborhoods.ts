import { APIService } from './api.service';

class APINeighborhoodsInstance {

  public async getNeighborhoodTaxonomy() {
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

export const APINeighborhoodsService = new APINeighborhoodsInstance();
