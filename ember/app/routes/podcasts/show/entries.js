import Route from '@ember/routing/route';
import { inject as service } from '@ember/service'

export default Route.extend({
  authService: service('auth'),

  model(params) {
    return this.store.findRecord('podcast', this.paramsFor('podcasts.show').podcast_id)
      .then(podcast => {
        if (params.page) {
          podcast.set('query-params', { page: params.page })
        }
        return podcast.get('entries').reload();
      });
  },

  queryParams: {
    page: {
      refreshModel: true,
    }
  },
});
