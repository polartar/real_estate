import { APIService } from './api.service';

class APIApartmentsInstance {

  /**
   * Get an individual apartment
   * @param id
   */
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
      throw new Error(err.message);
    }
  }

  public async getApartments(ids: number[]) {
    const queryString = ids.map(id => `ids[]=${id}`).join('&');

    try {
      let response = await fetch(APIService.getAPIUrl() + '/apartments/list?' + queryString, {
        headers: APIService.getHeaders()
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }

      return await response.json();
    } catch (err) {
      throw new Error(err.message);
    }
  }

  public async updateApt(formValues) {
    const method = formValues.id.length ? 'PATCH' : 'POST'
    const endpoint = formValues.id.length ? `${APIService.getAPIUrl()}/apartments/${formValues.id}` : `${APIService.getAPIUrl()}/apartments`;

    try {
      let response = await fetch(endpoint, {
        headers: APIService.getHeaders(),
        method: method,
        body: JSON.stringify(formValues)
      });

      const r = await response.json();

      if (!response.ok) {
        if (r && r.errors) {
          // caller will need to check success
          return {
            success: false,
            errors: r.errors
          };
        }

        throw new Error(response.statusText);
      }

      return {
        success: true,
        apartment: r
      };

    } catch (err) {
      throw new Error(err.message);
    }
  }
}

export const APIApartmentsService = new APIApartmentsInstance();
