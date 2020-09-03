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

  public async checkoutACH(data, token, account_id) {
    try {
      const payload = {...data, token, account_id};

      let response = await fetch(`${APIService.getAPIUrl()}/booking/checkout_ach`, {
        method: 'POST',
        headers: APIService.getHeaders(),
        body: JSON.stringify(payload)
      });

      const r = await response.json();

      if (!response.ok) {
        if (r && r.errors) {
          // caller will need to check success
          const errMessages = [];

          Object.keys(r.errors).forEach(re => errMessages.push(r.errors[re]));

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

  public async sendReferral(data) {
    try {
      const response = await fetch(`${APIService.getAPIUrl()}/booking/referral`, {
        method: 'POST',
        headers: APIService.getHeaders(),
        body: JSON.stringify(data)
      });

      const r = await response.json();

      if (!response.ok) {
        if (r && r.errors) {
          // caller will need to check success
          const errMessages = [];

          Object.keys(r.errors).forEach(re => errMessages.push(r.errors[re]));

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

  public async shareListing(data) {
    try {
      const response = await fetch(`${APIService.getAPIUrl()}/booking/share_apartment`, {
        method: 'POST',
        headers: APIService.getHeaders(),
        body: JSON.stringify(data)
      });

      const r = await response.json();

      if (!response.ok) {
        if (r && r.errors) {
          // caller will need to check success
          const errMessages = [];

          Object.keys(r.errors).forEach(re => errMessages.push(r.errors[re]));

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

  public async sendInquiry(data) {
    try {
      const response = await fetch(`${APIService.getAPIUrl()}/booking/inquiry`, {
        method: 'POST',
        headers: APIService.getHeaders(),
        body: JSON.stringify(data)
      });

      const r = await response.json();

      if (!response.ok) {
        if (r && r.errors) {
          // caller will need to check success
          const errMessages = [];

          Object.keys(r.errors).forEach(re => errMessages.push(r.errors[re]));

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

  public async updatePassword(data) {
    try {
      const response = await fetch(`${APIService.getAPIUrl()}/admin/booking/set_password`, {
        method: 'POST',
        headers: APIService.getHeaders(),
        body: JSON.stringify(data)
      });

      const r = await response.json();

      if (!response.ok) {
        if (r && r.errors) {
          // caller will need to check success
          const errMessages = [];

          Object.keys(r.errors).forEach(re => errMessages.push(r.errors[re]));

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

  public async checkPassword(data) {
    try {
      const response = await fetch(`${APIService.getAPIUrl()}/booking/check_password`, {
        method: 'POST',
        headers: APIService.getHeaders(),
        body: JSON.stringify(data)
      });

      const r = await response.json();

      if (!response.ok) {
        if (r && r.errors) {
          // caller will need to check success
          const errMessages = [];

          Object.keys(r.errors).forEach(re => errMessages.push(r.errors[re]));

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
