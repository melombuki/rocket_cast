import AuthenticatedRoute from '../authenticated';

export default AuthenticatedRoute.extend({
  model(params) {
    return this.store.findRecord('podcast', params.podcast_id);
  }
});
