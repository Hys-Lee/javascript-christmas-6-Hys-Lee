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
  test('음료만 주문 체크', () => {
    const totalOrder = {
      appetizer: { buttonMushroomSoup: 0, tapas: 0, caesarSalad: 0 },
      main: { tBoneSteak: 0, bBQRibs: 0, seafoodPasta: 0, christmasPasta: 0 },
      desert: { chocolateCake: 0, iceCream: 0 },
      drink: { zeroCola: 1, redWine: 1, champagne: 0 },
    };
    const validator = new InputValidator(totalOrder);
    const result = validator.hasOnlyDrink();
    const output = true;
    expect(result).toBe(output);
  });
  test(`양수 개수 주문 체크`, () => {
    const orderArray = [
      { 아이스크림: 1 },
      { 아이스크림: 1 },
      { 초코케이크: 0 },
    ];

    const result = InputValidator.hasNotPositiveAmount(orderArray);
    const output = true;
    expect(result).toBe(output);
  });
  test(`20개 이하 주문 체크`, () => {
    const totalOrder = {
      appetizer: { buttonMushroomSoup: 0, tapas: 0, caesarSalad: 0 },
      main: { tBoneSteak: 20, bBQRibs: 0, seafoodPasta: 0, christmasPasta: 0 },
      desert: { chocolateCake: 0, iceCream: 0 },
      drink: { zeroCola: 1, redWine: 1, champagne: 0 },
    };
    const validator = new InputValidator(totalOrder);
    const result = validator.hasLargerThanTwenty();
    const output = true;
    expect(result).toBe(output);
  });
});
