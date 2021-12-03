import mexp from 'math-expression-evaluator';
const REPLACE_OPERATORS = [[new RegExp(/==/g), 'Eq'], [new RegExp(/>=/g), 'Gte'], [new RegExp(/<=/g), 'Lte'], [new RegExp(/>/g), 'Gt'], [new RegExp(/</g), 'Lt']];
const TOKENS = [{
  type: 3,
  token: 'x',
  show: 'x',
  value: 'x'
}, {
  type: 2,
  token: '&',
  show: '&',
  value: (a, b) => a & b
}, {
  type: 2,
  token: '|',
  show: '|',
  value: (a, b) => a | b
}, {
  type: 2,
  token: 'and',
  show: 'and',
  value: (a, b) => a && b
}, {
  type: 2,
  token: 'xor',
  show: 'xor',
  value: (a, b) => a ^ b
}, {
  type: 2,
  token: 'or',
  show: 'or',
  value: (a, b) => Number(a || b)
}, {
  type: 2,
  token: 'Eq',
  show: 'Eq',
  value: (a, b) => Number(a === b)
}, {
  type: 2,
  token: 'Lt',
  show: 'Lt',
  value: (a, b) => Number(a < b)
}, {
  type: 2,
  token: 'Lte',
  show: 'Lte',
  value: (a, b) => Number(a <= b)
}, {
  type: 2,
  token: 'Gt',
  show: 'Gt',
  value: (a, b) => Number(a > b)
}, {
  type: 2,
  token: 'Gte',
  show: 'Gte',
  value: (a, b) => Number(a >= b)
}];
export function evalExpression(expression, value) {
  var _subExpressions$;

  let parsedExpression = expression; // replace `<` with `Lt` (and others) to avoid clashes with builtin function operators
  // that are not needed in Superset.

  REPLACE_OPERATORS.forEach(([key, value]) => {
    parsedExpression = parsedExpression.replace(key, value);
  });
  const subExpressions = String(parsedExpression).split('=');
  parsedExpression = (_subExpressions$ = subExpressions[1]) != null ? _subExpressions$ : subExpressions[0]; // we can ignore the type requirement on `TOKENS`, as value is always `number`
  // and doesn't need to consider `number | underfined`.
  // @ts-ignore

  return Number(mexp.eval(parsedExpression, TOKENS, {
    x: value
  }));
}
export function isValidExpression(expression) {
  try {
    evalExpression(expression, 0);
  } catch (err) {
    return false;
  }

  return true;
}