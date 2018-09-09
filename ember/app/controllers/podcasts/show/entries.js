import Controller from '@ember/controller';

export default Controller.extend({

  init() {
    this._super(...arguments);

    console.log("in entries controller")
  }
});
