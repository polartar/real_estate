import { APIService } from './api.service';

class APIApartmentsInstance {

  public async getApartment(id: number) {
    try {
      let response = await fetch(APIService.getAPIUrl() + '/apartments/' + id, {
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

export const APIApartmentsService = new APIApartmentsInstance();
