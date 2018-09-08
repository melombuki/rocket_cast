import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr(),
  description: DS.attr(),
  author: DS.attr(),
  image: DS.attr(),
  entries: DS.hasMany('entries'),
});
