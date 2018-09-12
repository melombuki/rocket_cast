import Service from '@ember/service';

export default Service.extend({
  isLoogedIn: false,

  login(email, password) {
    return fetch('http://localhost:3000/api/authenticate', {
      method: 'POST',
      mode: 'cors',
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify({ email: email, password: password })
    })
      .then(resp => resp.json())
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
