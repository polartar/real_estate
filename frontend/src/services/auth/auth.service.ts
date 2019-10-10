import { APIService } from '../../services/api/api.service';
import { get, set, remove } from '../../services/storage';

class AuthServiceInstance {
  private user = {};

  constructor() {
    get('user').then(user => {
      if (user) {
        this.user = user;
      }
    },
    err => {
      console.log(`error getting user`, err);
    });
  }

  public async authenticate(email: string, password: string) {
    try {
      let user = await APIService.login(email, password);

      if (user) {
        this.login(user);
      }

    } catch (err) {
      console.log(`error athenticating`, err);
    }
  }

  public isLoggedIn(): boolean {
    return this.user.hasOwnProperty('id');
  }

  public login(user: any) {
    this.user = user;

    set('user', user);
  }

  public logout() {
    this.user = {};
    remove('user');
  }

  public getUser() {
    return this.user;
  }
}

export const AuthService = new AuthServiceInstance();
