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
  test(`존재하지 않는 메뉴 주문 체크`, () => {
    const invalidOrderArray = [
      { 아이스아메리카노: 1 },
      { 아이스크림: 1 },
      { 초코케이크: 1 },
    ];
    const invalidResult = InputValidator.hasNoneExistentMenu(invalidOrderArray);
    const invalidOutput = true;
    expect(invalidResult).toBe(invalidOutput);
    const validOrderArray = [
      { 티본스테이크: 1 },
      { 아이스크림: 1 },
      { 초코케이크: 1 },
    ];
    const validResult = InputValidator.hasNoneExistentMenu(validOrderArray);
    const validOutput = false;
    expect(validResult).toBe(validOutput);
  });

  // 날짜 조건
  test('1~31 사이의 정수 날짜 값 확인', () => {
    const day = '32';
    const result = InputValidator.isValidDay();
    const output = false;
    expect(result).toBe(output);
  });

  // 형식
  test('정수 확인 (날짜 정수 형식 확인)', () => {
    const valiidNumberString = '123';
    const validResult = InputValidator.isValidNumber(valiidNumberString);
    const validOutput = true;
    expect(validResult).toBe(validOutput);
    const invalidNoneNumberString = 'asdf';
    const invalidNoneNumberResult = InputValidator.isValidNumber(
      invalidNoneNumberString,
    );
    const invalidNoneNumberOutput = false;
    expect(invalidNoneNumberResult).toBe(invalidNoneNumberOutput);
    const invalidFloatString = '1.0';
    const invalidFloatResult = InputValidator.isValidNumber(invalidFloatString);
    const invalidFloatOutput = false;
    expect(invalidFloatResult).toBe(invalidFloatOutput);
  });

  test('주문 형식 확인', () => {
    const validOrder = '아이스크림-1,초코케이크-2';
    const validResult = InputValidator.isValidOrder(validOrder);
    const validOutput = true;
    expect(validResult).toBe(validOutput);
    const invalidOrderWithNoBar = '아이스크림_1, 초코케이크_2';
    const invalidResultWithNoBar = InputValidator.isValidOrder(
      invalidOrderWithNoBar,
    );
    const invalidOutputWithNoBar = false;
    expect(invalidResultWithNoBar).toBe(invalidOutputWithNoBar);
    const invalidOrderWithNoIntegerAmount = '아이스크림-일,초코케이크-2';
    const invalidResultWithNoIntegerAmount = InputValidator.isValidOrder(
      invalidOrderWithNoIntegerAmount,
    );
    const invalidOutputWithNoIntegerAmount = false;
    expect(invalidResultWithNoIntegerAmount).toBe(
      invalidOutputWithNoIntegerAmount,
    );
    const invalidOrderWithSpace = '아이스크림-1, 초코케이크-2';
    const invalidResultWithSpace = InputValidator.isValidOrder(
      invalidOrderWithSpace,
    );
    const invalidOutputWithSpace = false;
    expect(invalidResultWithSpace).toBe(invalidOutputWithSpace);
  });
});
