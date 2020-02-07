import { APIService } from './api.service';
import { formatDate } from '../../helpers/utils';

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

    const method = formValues.hasOwnProperty('id') && formValues.id ? 'PATCH' : 'POST'
    const endpoint = formValues.hasOwnProperty('id') && formValues.id ? `${APIService.getAPIUrl()}/apartments/${formValues.id}` : `${APIService.getAPIUrl()}/apartments`;

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
          const errMessages = [];

          Object.keys(r.errors).forEach(re => errMessages.push(r.errors[re][0]));

         throw new Error(errMessages.join('\n'));
        }

        if (r && r.message) {
          throw new Error(r.message);
        }

        throw new Error(response.statusText);
      }

      return r;

    } catch (err) {
      throw new Error(err.message);
    }
  }

  public async deleteApt(id) {
    try {
      let response = await fetch(`${APIService.getAPIUrl()}/apartments/${id}`, {
        headers: APIService.getHeaders(),
        method: 'DELETE'
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

        if (r && r.message) {
          throw new Error(r.message);
        }

        throw new Error(response.statusText);
      }

      return {
        success: true
      };

    } catch (err) {
      throw new Error(err.message);
    }
  }

  public async getBookingDetails(id, checkindate, checkoutdate, guests) {
    const queryString = 'checkindate=' + encodeURIComponent(formatDate(checkindate, 'm/d/Y')) + '&checkoutdate=' + encodeURIComponent(formatDate(checkoutdate, 'm/d/Y')) + '&guests=' + encodeURIComponent(guests);

    try {
      let response = await fetch(APIService.getAPIUrl() + `/apartments/booking_details/${id}?` + queryString, {
        headers: APIService.getHeaders()
      });
      if (!response.ok) {
        const r = await response.json();
        if (r && r.error) {
          throw new Error(r.error);
        }

        throw new Error(response.statusText);
      }

      return await response.json();
    } catch (err) {
      throw new Error(err.message);
    }
  }
}

export const APIApartmentsService = new APIApartmentsInstance();
