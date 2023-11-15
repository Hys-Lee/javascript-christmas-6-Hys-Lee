import InputValidator from '../src/controller/InputValidator';

describe(`InputValidator 테스트`, () => {
  test(`중복 메뉴 체크`, () => {
    const orderArray = [
      { 아이스크림: 1 },
      { 아이스크림: 1 },
      { 초코케이크: 1 },
    ];
    const result = InputValidator.hasRepetition(orderArray);
    const output = true;
    expect(result).toBe(output);
  });
});
