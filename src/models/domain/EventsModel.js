import { MENULIST } from '../constants/MenuData';

class EventsModel {
  /**
   * @param {day, dayOfTheWeek} dateInfo
   * @param { menuCount: { desert, main }, payment } order
   */
  #day;

  #dayOfTheWeek;

  #menuCount;

  #payment;

  #specialDiscount;

  #giftPrice;

  constructor(dateInfo, order) {
    this.#day = dateInfo.day;
    this.#dayOfTheWeek = dateInfo.dateInfo;
    this.#menuCount = order.menuCount;
    this.#payment = order.payment;
    this.#specialDiscount = 1_000;
    this.#giftPrice = MENULIST.drink.champagne;
  }

  calculateDDayDiscount() {
    return (this.#day - 1) * 100 + 1_000;
  }

  calculateWeekdayDiscount() {
    return this.#menuCount.desert * 2_023;
  }

  calculateWeekendDiscount() {
    return this.#menuCount.main * 2_023;
  }

  calculateSpecialDiscount() {
    return this.#specialDiscount;
  }

  calculateGiftPrice() {
    return this.#giftPrice;
  }
}

export default EventsModel;
