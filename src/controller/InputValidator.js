/**
 * > 주문 조건

- [ ] 음료만 주문 불가능
- [ ] 존재하는 메뉴만 주문 가능
- [ ] 메뉴 주문 시 1개 이상 주문
- [ ] 메뉴 최대 20개까지 주문
- [ ] 중복 메뉴 입력 불가능
 */

class InputValidator {
  //
  #totalOrder;

  constructor(totalOrder) {
    this.#totalOrder = totalOrder;
  }

  static hasRepetition(orderArray) {
    const validMenu = new Set(
      orderArray.map((eachOrder) => Object.keys(eachOrder)[0]),
    );
    return orderArray.length !== validMenu.size;
  }

  checkOnlyDrink() {
    const appetizerAmount = Object.values(this.#totalOrder.appetizer).reduce(
      (total, amount) => total + amount,
      0,
    );
    // const mainAmount =
  }
}
export default InputValidator;
