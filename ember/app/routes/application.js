import Route from '@ember/routing/route';
import { inject as service } from '@ember/service'

export default Route.extend({
  authService: service('auth'),

  beforeModel(transition) {
    if (!this.authService.hasAccessToken()) {
      this.replaceWith('login');
    }
  },
});
