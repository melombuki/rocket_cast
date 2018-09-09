import Route from '@ember/routing/route';

export default Route.extend({
  model(params) {
    return this.store.query('podcast', {
      page: {
        number: params.page,
      }
    });
  },

  queryParams: {
    page: {
      refreshModel: true,
    }
  },
});
