import { helper } from '@ember/component/helper';

export function stringify(params/*, hash*/) {
  return params.map(p => JSON.stringify(p));
}

export default helper(stringify);
