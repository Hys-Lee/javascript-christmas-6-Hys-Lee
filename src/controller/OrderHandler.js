import { MENULIST, KOERANMENUNAME } from '../models/constants/MenuData.js';
import InputValidator from './InputValidator.js';

class OrderHandler {
  #orderStirng;

  constructor(order) {
    this.#orderStirng = order;
  }

  convertToArray() {
    const orderArray = this.#orderStirng.split(',').map((oneOrder) => {
      const menu = oneOrder.split('-')[0];
      const amount = Number(oneOrder.split('-')[1]);
      const intermeditate = {};
      intermeditate[menu] = amount;
      return intermeditate;
    });
    return orderArray;
  }

  static makeResultTemplate() {
    const result = {};
    Object.keys(MENULIST).forEach((menuType) => {
      result[menuType] = {};
      Object.keys(MENULIST[menuType]).forEach((menu) => {
        result[menuType][menu] = 0;
      });
    });
    return result;
  }

  static translate(koreanName) {
    const menuTranslation = Object.entries(KOERANMENUNAME);
    const englishName = menuTranslation.filter((namePair) => {
      const korean = namePair[1];
      const english = namePair[0];
      if (korean === koreanName) return english;
    })[0][0];

    return englishName;
  }

  reconstruct() {
    const orderArray = this.convertToArray();
    const orderResult = OrderHandler.makeResultTemplate();
    orderArray.forEach((priceOnMenu) => {
      const koreanMenuName = Object.keys(priceOnMenu)[0];
      const menuName = OrderHandler.translate(Object.keys(priceOnMenu)[0]);
      const amount = priceOnMenu[koreanMenuName];
      Object.keys(orderResult).forEach((menuType) => {
        Object.keys(orderResult[menuType]).forEach((menu) => {
          if (menuName === menu) orderResult[menuType][menu] = amount;
        });
      });
    });
    return orderResult;
  }

  makeOrderInfo() {
    const orderArray = this.convertToArray();
    if (InputValidator.hasRepetition(orderArray)) throw Error('[ERROR]');
    if (InputValidator.hasNotPositiveAmount(orderArray)) throw Error('[ERROR]');
    if (InputValidator.hasNoneExistentMenu(orderArray)) throw Error('[ERROR]');
    const orderObject = this.reconstruct();
    const validator = new InputValidator(orderObject);
    if (validator.hasOnlyDrink()) throw Error('[ERROR]');
    if (validator.hasLargerThanTwenty()) throw Error('[ERROR]');

    return orderObject;
  }
}
export default OrderHandler;
