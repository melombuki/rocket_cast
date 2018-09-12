import Component from '@ember/component';

export default Component.extend({
  actions: {
    subscribe(url) {
      this.sendAction('action', url);
    }
  },
});
