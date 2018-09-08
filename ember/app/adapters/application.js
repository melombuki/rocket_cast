import DS from 'ember-data';
import { inject as service } from '@ember/service'
import ENV from '../config/environment';

let options = {
  authService: service('auth'),

  namespace: 'api',

  init() {
    this._super(...arguments);

    this.set('headers', {
      'Authorization': this.authService.getAccessToken(),
    });
  },
};

if (ENV.apiHost) {
  options.host = ENV.apiHost;
}

export default DS.RESTAdapter.extend(options);
