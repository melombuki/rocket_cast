import Route from '@ember/routing/route';
import { inject as service } from '@ember/service'

export default Route.extend({
  authService: service('auth'),

  model() {
    return this.store.findRecord('podcast', this.paramsFor('podcasts.show').podcast_id)
      .then(podcast => podcast.get('entries'));
  },

  queryParams: {
    page: {
      refreshModel: true,
    },
  },
});
