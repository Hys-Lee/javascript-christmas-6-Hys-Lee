/**
 * > 주문 조건

- [ ] 음료만 주문 불가능
- [ ] 존재하는 메뉴만 주문 가능
- [ ] 메뉴 주문 시 1개 이상 주문
- [ ] 메뉴 최대 20개까지 주문
- [ ] 중복 메뉴 입력 불가능
 */
import { KOERANMENUNAME } from '../models/constants/MenuData.js';

class InputValidator {
  //
  #totalOrder;

  #appetizerAmount;

  #mainAmout;

  #desertAmount;

  #drinkAmount;

  // 메뉴타입 상수화 해야겠다. 너무 자주 쓰이네. 다른 곳에서도 바꿔야 할 듯.
  constructor(totalOrder) {
    this.#totalOrder = totalOrder;
    this.#appetizerAmount = this.countAmountOnMenuType('appetizer');
    this.#mainAmout = this.countAmountOnMenuType('main');
    this.#desertAmount = this.countAmountOnMenuType('desert');
    this.#drinkAmount = this.countAmountOnMenuType('drink');
  }

  countAmountOnMenuType(menuTypeString) {
    return Object.values(this.#totalOrder[menuTypeString]).reduce(
      (total, amount) => total + amount,
      0,
    );
  }

  static hasRepetition(orderArray) {
    const validMenu = new Set(
      orderArray.map((eachOrder) => Object.keys(eachOrder)[0]),
    );
    return orderArray.length !== validMenu.size;
  }

  // totalOrder에 적용
  hasOnlyDrink() {
    if (
      this.#appetizerAmount === 0 &&
      this.#mainAmout === 0 &&
      this.#desertAmount === 0 &&
      this.#drinkAmount > 0
    ) {
      return true;
    }
    return false;
  }

  static hasNotPositiveAmount(orderArray) {
    return orderArray.reduce(
      (result, order) => Object.values(order)[0] >= 1 || result,
      false,
    ); // 하나라도 true섞이면 true 반환
  }

  // 나머진 valid상황에서..
  hasLargerThanTwenty() {
    return (
      this.#appetizerAmount +
        this.#mainAmout +
        this.#desertAmount +
        this.#drinkAmount >
      20
    );
  }

  static hasNoneExistentMenu(orderArray) {
    const orderedKoreanMenu = orderArray.map(
      (eachOrder) => Object.keys(eachOrder)[0],
    );
    const selectedMenu = orderedKoreanMenu.filter((orderedOne) =>
      Object.values(KOERANMENUNAME).includes(orderedOne),
    );
    return orderedKoreanMenu.length !== selectedMenu.length;
  }
}
export default InputValidator;
