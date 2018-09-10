import Service from '@ember/service';

export default Service.extend({
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
        return auth_token;
      })
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
