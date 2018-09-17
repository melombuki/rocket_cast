import AjaxService from 'ember-ajax/services/ajax';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default AjaxService.extend({
  authService: service('auth'),

  namespace: '/api',

  host: 'http://localhost:3000/',

  headers: computed('authService.isLoggedIn', {
    get() {
      let headers = {};
      if (this.authService.hasAccessToken()) {
        const authToken = this.authService.getAccessToken();
        headers['Authorization'] = authToken;
      }
      return headers;
    }
  }),
});
