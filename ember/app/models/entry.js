import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr(),
  file: DS.attr(),
  summary: DS.attr(),
  podcast: DS.belongsTo('podcast'),
  published_date: DS.attr(),
});
