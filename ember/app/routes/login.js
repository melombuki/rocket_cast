import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  authService: service('auth'),

  actions: {
    login(email, password) {
      this.authService.login(email, password)
        .then(_ => {
          const previousTransition = this.previousTransition;
          if (previousTransition) {
            this.set('previousTransition', null);
            previousTransition.retry();
          } else {
            this.transitionTo('podcasts');
          }
        });
    },
  }
});
