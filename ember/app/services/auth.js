import Service from '@ember/service';
import { inject as service } from '@ember/service';

export default Service.extend({
  ajax: service(),

  init() {
    this._super(...arguments);

    this.set('isLoggedIn', this.getAccessToken());
  },

  login(email, password) {
    return this.get('ajax').request('/authenticate', {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      data: {
        email: email,
        password: password,
      },
    })
      .then(({ auth_token }) => {
        this.setAccessToken(auth_token);
        this.set('isLoggedIn', true);
        return auth_token;
      });
  },

  logout() {
    this.set('isLoggedIn', false);
    this.clearAccessToken();
  },

  setAccessToken(token) {
    sessionStorage.setItem('access_token', token);
  },

  getAccessToken() {
    return sessionStorage.getItem('access_token');
  },

  clearAccessToken() {
    sessionStorage.removeItem('access_token');
  },

  hasAccessToken() {
    return !!sessionStorage.getItem('access_token');
  }

});
