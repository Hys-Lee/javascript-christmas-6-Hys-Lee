import OrderHandler from '../src/controller/OrderHandler.js';

describe(`EventOrderHandler 테스트`, () => {
  test(`주문 입력 문자열을 객체로 재구축`, () => {
    const orderString = '해산물파스타-2,레드와인-1,초코케이크-1';
    const orderHandler = new OrderHandler(orderString);
    const result = orderHandler.reconstruct();
    const output = {
      appetizer: { buttonMushroomSoup: 0, tapas: 0, caesarSalad: 0 },
      main: { tBoneSteak: 0, bBQRibs: 0, seafoodPasta: 2, christmasPasta: 0 },
      desert: { chocolateCake: 1, iceCream: 0 },
      drink: { zeroCola: 0, redWine: 1, champagne: 0 },
    };
    expect(result).toEqual(output);
  });
});
