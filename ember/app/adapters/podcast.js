import ApplicationAdapter from './application';

export default ApplicationAdapter.extend({
  findHasMany(store, snapshot, url, relationship) {

    const id = snapshot.id;
    const type = snapshot.modelName;

    url = this.urlPrefix(url, this.buildURL(type, id, null, 'findHasMany'));

    if (relationship.type == "entry" && snapshot.record.get('query-params')) {
      const qp = $.param(snapshot.record.get('query-params'));
      url += "?" + qp;
    }

    return this.ajax(url, 'GET');
  }
});
