import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function () {
  this.route('login');
  this.route('podcasts', function () { });

  this.route('entry', function () {
    this.route('show', { path: '/podcasts/:podcast_id', resetNamespace: true });
  });
});

export default Router;
