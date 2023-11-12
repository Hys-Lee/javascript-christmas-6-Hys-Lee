import { MENULIST } from '../constants/MenuData';
import DayOfTheWeek from '../constants/DayOfTheWeek';

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
    this.#dayOfTheWeek = dateInfo.dayOfTheWeek;
    this.#menuCount = order.menuCount;
    this.#payment = order.payment;
    this.#specialDiscount = 1_000;
    this.#giftPrice = MENULIST.drink.champagne;
  }

  checkDDayDiscount() {
    return this.#day <= 25;
  }

  resultDDayDiscount() {
    if (!this.checkDDayDiscount()) return 0;
    return (this.#day - 1) * 100 + 1_000;
  }

  checkWeekdayDiscount() {
    const dayOfTheWeekCondition =
      this.#dayOfTheWeek !== DayOfTheWeek.FRIDAY ||
      this.#dayOfTheWeek !== DayOfTheWeek.SATURDAY;
    const menuCondition = this.#menuCount.desert > 0;
    return dayOfTheWeekCondition && menuCondition;
  }

  resultWeekdayDiscount() {
    if (!this.checkWeekdayDiscount()) return 0;
    return this.#menuCount.desert * 2_023;
  }

  checkWeekendDiscount() {
    const dayOfTheWeekCondition =
      this.#dayOfTheWeek === DayOfTheWeek.FRIDAY ||
      this.#dayOfTheWeek === DayOfTheWeek.SATURDAY;
    const menuCondition = this.#menuCount.main > 0;
    return dayOfTheWeekCondition && menuCondition;
  }

  resultWeekendDiscount() {
    if (!this.checkWeekendDiscount()) return 0;
    return this.#menuCount.main * 2_023;
  }

  checkSpecialDiscount() {
    const dayOfTheWeekCondition = this.#dayOfTheWeek === DayOfTheWeek.SUNDAY;
    const CHRISTMAS_DAY = 25;
    return this.#day === CHRISTMAS_DAY || dayOfTheWeekCondition;
  }

  resultSpecialDiscount() {
    if (!this.checkSpecialDiscount()) return 0;
    return this.#specialDiscount;
  }

  // totalPayment는 planner의 정보. 할인 전 총주문 금액
  resultGiftPrice(totalPayment) {
    if (totalPayment < 120_000) return 0;
    return this.#giftPrice;
  }
}

export default EventsModel;
