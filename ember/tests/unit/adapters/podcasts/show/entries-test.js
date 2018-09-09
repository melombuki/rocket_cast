import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Adapter | podcasts/show/entries', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function(assert) {
    let adapter = this.owner.lookup('adapter:podcasts/show/entries');
    assert.ok(adapter);
  });
});
