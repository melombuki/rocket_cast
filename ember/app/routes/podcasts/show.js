import AuthenticatedRoute from '../authenticated';
import { inject as service } from '@ember/service';

export default AuthenticatedRoute.extend({
  ajax: service(),

  model(params) {
    return this.store.findRecord('podcast', params.podcast_id);
  },

  actions: {
    refresh(podcast) {
      return this.get('ajax').request('/podcasts', {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        data: {
          url: podcast.url,
        }
      })
        .then(() => {
          this.refresh();
        });
    }
  },
});
