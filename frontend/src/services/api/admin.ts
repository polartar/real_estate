import { APIService } from './api.service';

class APIAdminInstance {

  public async getDashboardCounts() {
    try {
      let response = await fetch(APIService.getAPIUrl() + '/admin/dashboard_counts', {
        headers: APIService.getHeaders()
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error(`You have been logged out.  Please log in an try again`);
        }

        throw new Error(response.statusText);
      }

      let responseJSON = await response.json();

      return responseJSON;

    } catch (err) {
      throw new Error(err.message);
    }
  }


  public async getListings(filters) {
    try {

      const params = encodeURIComponent(JSON.stringify({...filters}));

      let response = await fetch(APIService.getAPIUrl() + '/admin/listings?params=' + params, {
        headers: APIService.getHeaders(),
      });
      if (!response.ok) {
        if (response.status === 401) {
          throw new Error(`You have been logged out.  Please log in an try again`);
        }

        throw new Error(response.statusText);
      }

      return await response.json();
    } catch (err) {
      throw new Error(err.message);
    }
  }

  public async updateListing(listing) {
    try {
      let response = await fetch(APIService.getAPIUrl() + `/admin/apartments/${listing.id}`, {
        method: 'PATCH',
        body: JSON.stringify(listing),
        headers: APIService.getHeaders()
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error(`You have been logged out.  Please log in an try again`);
        }

        throw new Error(response.statusText);
      }

      let responseJSON = await response.json();

      return responseJSON.access_token;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  public async getAptOwners() {
    try {
      let response = await fetch(APIService.getAPIUrl() + `/admin/apt-owners`, {
        headers: APIService.getHeaders()
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error(`You have been logged out.  Please log in an try again`);
        }

        throw new Error(response.statusText);
      }

      return await response.json();
    } catch (err) {
      throw new Error(err.message);
    }
  }

  public async updateOwnerGlobal(data) {
    try {
      if (!data.owner_name) {
        throw new Error('Owner Name is required');
      }

      const ownerName = encodeURIComponent(data.owner_name);
      let response = await fetch(APIService.getAPIUrl() + `/admin/owner-global/${ownerName}`, {
        method: 'POST',
        headers: APIService.getHeaders(),
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error(`You have been logged out.  Please log in an try again`);
        }

        throw new Error(response.statusText);
      }

      return await response.json();
    } catch (err) {
      throw new Error(err.message);
    }
  }

  public async getOwnerStats(owner: string) {
    const ownerName = encodeURIComponent(owner);

    try {
      let response = await fetch(APIService.getAPIUrl() + `/admin/owner-global/${ownerName}`, {
        headers: APIService.getHeaders()
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error(`You have been logged out.  Please log in an try again`);
        }

        throw new Error(response.statusText);
      }

      return await response.json();
    } catch (err) {
      throw new Error(err.message);
    }
  }

  public async getAgents() {
    try {

      console.log("trying to get agents...")
     

      let response = await fetch(APIService.getAPIUrl() + '/admin/agents/', {
        headers: APIService.getHeaders(),
      });
      if (!response.ok) {
        if (response.status === 401) {
          throw new Error(`You have been logged out.  Please log in an try again`);
        }

        throw new Error(response.statusText);
      }

      return await response.json();
    } catch (err) {
      throw new Error(err.message);
    }
  }

  public async deleteAgent(id) {
    try {
      let response = await fetch(`${APIService.getAPIUrl()}/admin/agent/${id}`, {
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

  public async getReferrals(filters) {
    try {


      console.log("here we are")
      const params = encodeURIComponent(JSON.stringify({...filters}));

      let response = await fetch(APIService.getAPIUrl() + '/admin/referrals?params=' + params, {
        headers: APIService.getHeaders(),
      });

      console.log("response says: "  + response)
      if (!response.ok) {
        if (response.status === 401) {
          throw new Error(`You have been logged out.  Please log in an try again`);
        }

        throw new Error(response.statusText);
      }

      return await response.json();
    } catch (err) {
      throw new Error(err.message);
    }
  }

  public async deleteReferral(id) {
    try {
      let response = await fetch(`${APIService.getAPIUrl()}/admin/referral/${id}`, {
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
}

export const APIAdminService = new APIAdminInstance();
