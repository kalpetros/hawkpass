import { commaSeparateNumber } from '../src/utils';

test('10000 to be 10,000', () => {
  expect(commaSeparateNumber(10000)).toBe('10,000');
});

test('105000 to be 105,000', () => {
  expect(commaSeparateNumber(105000)).toBe('105,000');
});
