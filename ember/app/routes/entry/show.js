import Route from '@ember/routing/route';

export default Route.extend({
  model({ podcast_id }) {
    return this.store.findRecord('podcast', podcast_id)
  }
});
