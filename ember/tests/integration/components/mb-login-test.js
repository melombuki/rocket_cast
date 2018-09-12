import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | mb-login', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`{{mb-login}}`);

    assert.equal(this.element.textContent.trim(), '');

    // Template block usage:
    await render(hbs`
      {{#mb-login}}
        template block text
      {{/mb-login}}
    `);

    assert.equal(this.element.textContent.trim(), 'template block text');
  });
});
