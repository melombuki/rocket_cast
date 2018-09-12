import AuthenticatedRoute from '../authenticated';

export default AuthenticatedRoute.extend({
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
