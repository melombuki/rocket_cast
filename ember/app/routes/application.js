import Route from '@ember/routing/route';
import { inject as service } from '@ember/service'

export default Route.extend({
  authService: service('auth'),

  beforeModel(transition) {
    if (!this.authService.hasAccessToken()) {
      console.log("Should be replacing with login");
      this.replaceWith('login');
    } else {
      this.replaceWith('podcasts');
    }
  },
});
