import { EnvironmentConfigService } from '../../services/environment/environment-config.service';

class APIServiceInstance {
  private API_URL: string = EnvironmentConfigService.getInstance().get('API_URL');
  // private BASE_URL: string = EnvironmentConfigService.getInstance().get('BASE_URL');

  private access_token: '';

  public getAPIUrl() {
    return this.API_URL;
  }

  public getAccessToken() {
    return this.access_token;
  }

  public removeAccessToken() {
    this.access_token = '';
  }

  public getHeaders(overrides = {}) {
    let headers: any = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };

    if (this.access_token) {
      headers.Authorization = 'Bearer ' + this.access_token;
    }

    headers = {...headers, ...overrides};

    return headers;
  }

  public setAccessToken(token) {
    this.access_token = token;
  }
}

export const APIService = new APIServiceInstance();
