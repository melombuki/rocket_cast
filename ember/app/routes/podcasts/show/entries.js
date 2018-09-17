import AuthenticatedRoute from '../../authenticated';

export default AuthenticatedRoute.extend({
  model(params) {
    return this.store.findRecord('podcast', this.paramsFor('podcasts.show').podcast_id)
      .then(podcast => {
        if (params.page) {
          podcast.set('query-params', { page: params.page, sort: '-published_date' })
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
