import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  authService: service('auth'),

  beforeModel() {
    if (!this.authService.hasAccessToken()) {
      this.replaceWith('login');
    }
  },

  actions: {
    logout() {
      this.authService.logout();
      this.transitionTo('login');
    },
  },
});
