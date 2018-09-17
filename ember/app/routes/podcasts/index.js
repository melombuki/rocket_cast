import AuthenticatedRoute from '../authenticated';
import { inject as service } from '@ember/service'

export default AuthenticatedRoute.extend({
  ajax: service(),

  model(params) {
    return this.store.query('podcast', {
      page: {
        number: params.page,
      }
    });
  },

  actions: {
    subscribe(url) {
      return this.get('ajax').request('/podcasts', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        data: {
          url: url,
        }
      })
        .then(() => {
          this.set('url', null);
          this.refresh();
        });
    },

    unsubscribe(podcast) {
      console.log(podcast);
      podcast.destroyRecord();
    },
  },

  queryParams: {
    page: {
      refreshModel: true,
    }
  },
});
