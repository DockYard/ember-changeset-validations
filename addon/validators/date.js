import buildMessage from 'ember-changeset-validations/utils/validation-errors';
import withDefaults from 'ember-changeset-validations/utils/with-defaults';
import { validate } from 'ember-validators';

export default function validateNumber(options = {}) {
  options = withDefaults(options, { allowBlank: false });

  return (key, value) => {
    let result = validate('date', value, options, null, key);
    return (result === true) ? true : buildMessage(key, result);
  };
}
