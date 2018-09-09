import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({
  normalizeQueryResponse(store, clazz, payload) {
    const result = this._super(...arguments);
    result.meta = result.meta || {};

    if (payload.links) {
      result.meta.pagination = this.createPageMeta(payload.links);
    }

    return result;
  },

  createPageMeta(data) {
    return Object.getOwnPropertyNames(data).reduce((acc, name) => {
      if (data[name]) {
        acc[name] = this.getPageNumber(data[name]);
      }
      return acc;
    }, {});
  },

  getPageNumber(link) {
    let [, pageNumber] = link.match(/page%5Bnumber%5D=(\d+)/) || [];
    return pageNumber;
  }
});
