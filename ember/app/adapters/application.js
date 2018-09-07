import DS from 'ember-data';
import ENV from '../config/environment';

let options = {};

if (ENV.apiHost) {
  options.host = ENV.apiHost;
}

export default DS.JSONAPIAdapter.extend(options);
