import { APIService } from './api.service';

class APIAdminInstance {

  public async getDashboardCounts() {
    try {

      let response = await fetch(APIService.getAPIUrl() + '/admin/dashboard_counts', {
        headers: APIService.getHeaders()
      });

      if (!response.ok) {
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
        throw new Error(response.statusText);
      }

      return await response.json();
    } catch (err) {
      throw new Error(err.message);
    }
  }
}

export const APIAdminService = new APIAdminInstance();
