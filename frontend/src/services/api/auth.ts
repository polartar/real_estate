import { APIService } from "./api.service";

class APIAuthInstance {
  public async login(email, password) {
    try {
      let data = {
        username: email,
        password: password,
      };

      let response = await fetch(APIService.getAPIUrl() + "/auth", {
        method: "POST",
        body: JSON.stringify(data),
        headers: APIService.getHeaders(),
      });
      let responseJSON = await response.json();
      if (!response.ok) {
        return responseJSON.access_token;
        // throw new Error(response.statusText);
      }

      return responseJSON.access_token;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  public async logout() {
    try {
      let headers = APIService.getHeaders();

      // proactively remove access token to prevent calls
      // that happen during network latency period
      APIService.removeAccessToken();

      return await fetch(APIService.getAPIUrl() + "/logout", {
        method: "POST",
        headers: headers,
      });
    } catch (err) {
      throw new Error(err);
    }
  }

  public async getUser() {
    try {
      let response = await fetch(APIService.getAPIUrl() + "/user", {
        headers: APIService.getHeaders(),
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

export const APIAuthService = new APIAuthInstance();
