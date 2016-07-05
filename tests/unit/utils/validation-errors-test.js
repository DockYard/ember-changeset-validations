import {
  default as buildMessage,
  formatDescription,
  formatMessage
} from 'dummy/utils/validation-errors';
import { module, test } from 'qunit';

module('Unit | Utility | validation errors');

test('#formatDescription formats a key into a description', function(assert) {
  assert.equal(formatDescription('firstName'), 'First name');
  assert.equal(formatDescription('first name'), 'First name');
  assert.equal(formatDescription('first_name'), 'First name');
  assert.equal(formatDescription('first-name'), 'First name');
});

test('#formatMessage formats a blank message', function(assert) {
  assert.equal(formatMessage('{foo} is {bar}', { foo: 'foo', bar: 'bar' }), 'foo is bar');
});

test('#buildMessage builds a validation message', function(assert) {
  assert.equal(buildMessage('firstName', 'invalid'), 'First name is invalid');
});

test('#buildMessage builds a custom message if custom message is string', function(assert) {
  assert.equal(
    buildMessage('firstName', 'custom', 'testValue', { message: "{description} can't be equal to {foo}", foo: 'foo' }),
    "First name can't be equal to foo",
    'Built message is generated correctly'
  );
});

test('#buildMessage builds a custom message if custom message is a function', function(assert) {
  assert.expect(5);

  function message(key, type, value, context) {
    assert.equal(key, 'firstName');
    assert.equal(type, 'custom');
    assert.equal(value, 'testValue');
    assert.equal(context.foo, 'foo');

    return 'some test message';
  }

  assert.equal(
    buildMessage('firstName', 'custom', 'testValue', { message, foo: 'foo' }),
    'some test message',
    'correct custom error message is returned'
  );
});
