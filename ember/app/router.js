import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function () {
  this.route('login');
  this.route('podcasts', function () {
    this.route('show', { path: '/:podcast_id' }, function () {
      this.route('entries');
    });
  });
  this.route('authenticated');
});

export default Router;
