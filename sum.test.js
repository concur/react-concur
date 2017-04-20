const sum = require('./sum');

test('adds parameters when both are supplied at once', () => {
  expect(sum(1, 2)).toBe(3);
});

test('adds 1 + 2 with parameters applied once per function call', () => {
  expect(sum(1)(2)).toBe(3);
});
