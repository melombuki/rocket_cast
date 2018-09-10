import Route from '@ember/routing/route';
import { inject as service } from '@ember/service'

export default Route.extend({
  authService: service('auth'),

  model() {
    let url = `${this.store.adapterFor('entry').host}/api/podcasts/${this.paramsFor('podcasts.show').podcast_id}/entries`;

    return fetch(url, {
      headers: {
        "Authorization": this.authService.getAccessToken(),
      },
    })
      .then(resp => resp.json())
      .then(({ data }) => {
        data.forEach(entry => {
          entry.type = 'entry'
          this.store.push({ data: entry });
        });;
        return this.store.peekAll('entry');
      });
  },

  queryParams: {
    page: {
      refreshModel: true,
    },
  },
});
