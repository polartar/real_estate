import { APIService } from './api.service';

class APIBookingInstance {

  public async getPaymentIntent(data) {
    let queryParts = [];
    Object.keys(data).forEach(k => {
      queryParts.push(encodeURIComponent(k) + '=' + encodeURIComponent(data[k]));
    });

    const endpoint = `${APIService.getAPIUrl()}/booking/payment_intent?${queryParts.join('&')}`;

    try {
      let response = await fetch(endpoint, {
        headers: APIService.getHeaders(),
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


}

export const APIBookingService = new APIBookingInstance();
