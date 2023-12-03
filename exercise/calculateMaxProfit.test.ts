const { calculateMaxProfit } = require('./index');
const list = [
  { list: [6, 20, 3, 2, 9, 10], result: 14 },
  { list: [4, 3, 2, 1], result: 0 },
  { list: [6, 8, 2, 1, 4, 4], result: 3 },
  { list: [1, 2, 3, 9, 8, 8], result: 8 },
  { list: [4, 4, 4, 1, 5, 8], result: 7 },
];
describe('Calculate max profit', () => {
  list.forEach((ele) => {
    test(`Max profit of ${JSON.stringify(ele)}`, () => {
      expect(calculateMaxProfit(ele.list)).toBe(ele.result);
    });
  });
});
