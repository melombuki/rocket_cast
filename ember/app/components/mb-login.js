import Component from '@ember/component';
import { inject as service } from '@ember/service'

export default Component.extend({
  authService: service('auth'),

  actions: {
    logout() {
      this.sendAction();
    }
  },
});
