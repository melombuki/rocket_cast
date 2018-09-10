import Controller from '@ember/controller';
import { inject as service } from '@ember/service'

export default Controller.extend({
  authService: service('auth'),

  actions: {
    login() {
      this.authService.login(this.get('email'), this.get('password'))
        .then(_ => {
          const previousTransition = this.previousTransition;
          if (previousTransition) {
            this.set('previousTransition', null);
            previousTransition.retry();
          } else {
            this.transitionToRoute('podcasts');
          }
        });
    },
  },
});
