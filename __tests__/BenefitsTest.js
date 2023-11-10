import Benefits from '../src/Benefits/Benefits';

describe('혜택 검사', () => {
  const benefit = new Benefits({ day: 1, theDayOfWeek: 1 });
  test('혜택 내역 확인', () => {
    //
    const purchaseKindList = {
      appetizer: [1, 0, 0],
      main: [0, 0, 0, 0],
      desert: [1, 1],
      drink: [1, 0, 0],
    };
    const purchasePrice = 6_000 + 15_000 + 5_000 + 3_000;
    const output = {
      dDay: 1_000,
      weekday: 0,
      weekend: 0,
      special: 0,
      gift: 0,
    };
    const result = benefit.resultDiscountingPrice(
      purchaseKindList,
      purchasePrice,
    );
    expect(result.dDay).toBe(output.dDay);
    expect(result.weekday).toBe(output.weekday);
    expect(result.weekend).toBe(output.weekend);
    expect(result.special).toBe(output.special);
    expect(result.gift).toBe(output.gift);
  });
});
