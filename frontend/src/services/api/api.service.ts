import { EnvironmentConfigService } from '../../services/environment/environment-config.service';
import { get, set } from '../../services/storage';

class APIServiceInstance {
  private API_URL: string = EnvironmentConfigService.getInstance().get('API_URL');
  // private BASE_URL: string = EnvironmentConfigService.getInstance().get('BASE_URL');
  private API_CLIENT_ID: string = EnvironmentConfigService.getInstance().get('API_CLIENT_ID');
  private API_CLIENT_SECRET: string = EnvironmentConfigService.getInstance().get('API_CLIENT_SECRET');
  private access_token: '';

  constructor() {
    get('api_access_token').then(token => {
      if (token) {
        this.access_token = token;
      }
    },
    err => {
      console.log(`error getting access token`, err);
    });
  }

  public async getTest() {
    try {
      let response = await fetch(this.API_URL + '/test');
      if (!response.ok) {
        throw new Error(response.statusText);
      }

      return await response.json();
    } catch (err) {
      throw new Error(err);
    }
  }

  public async login(email, password) {
    try {
      let data = {
          'grant_type': 'password',
          'client_id': this.API_CLIENT_ID,
          'client_secret': this.API_CLIENT_SECRET,
          'username': email,
          'password': password,
          'scope': '',
      };

      let response = await fetch(this.API_URL + '/auth', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      let responseJSON = await response.json();

      this.setAccessToken(responseJSON.access_token);

      let userResponse = await fetch(this.API_URL + '/user', {
        headers: this.getHeaders()
      });

      let user = await userResponse.json();

      return user;
    } catch (err) {
      throw new Error(err);
    }
  }

  public async getUser() {
    try {
      let response = await fetch(this.API_URL + '/user', {
        headers: this.getHeaders()
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }

      return await response.json();
    } catch (err) {
      throw new Error(err);
    }
  }

  private getHeaders(overrides = {}) {
    let headers: any = {
      'Accept': 'application/json'
    };

    if (this.access_token) {
      headers.Authorization = 'Bearer ' + this.access_token;
    }

    headers = {...headers, ...overrides};

    return headers;
  }

  private setAccessToken(token) {
    this.access_token = token;

    set('api_access_token', token);
  }
}

export const APIService = new APIServiceInstance();
