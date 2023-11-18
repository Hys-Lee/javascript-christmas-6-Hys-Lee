import { MENULIST } from '../constants/MenuData.js';
import DAYOFTHEWEEK from '../constants/DayOfTheWeek.js';

class Events {
  // /**
  //  * @param {day, dayOfTheWeek} dateInfo
  //  * @param { menuCount: { desert, main }, payment } order
  //  */
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
      this.#dayOfTheWeek !== DAYOFTHEWEEK.FRIDAY &&
      this.#dayOfTheWeek !== DAYOFTHEWEEK.SATURDAY;
    const menuCondition = this.#menuCount.desert > 0;
    return dayOfTheWeekCondition && menuCondition;
  }

  resultWeekdayDiscount() {
    if (!this.checkWeekdayDiscount()) return 0;
    return this.#menuCount.desert * 2_023;
  }

  checkWeekendDiscount() {
    const dayOfTheWeekCondition =
      this.#dayOfTheWeek === DAYOFTHEWEEK.FRIDAY ||
      this.#dayOfTheWeek === DAYOFTHEWEEK.SATURDAY;
    const menuCondition = this.#menuCount.main > 0;
    return dayOfTheWeekCondition && menuCondition;
  }

  resultWeekendDiscount() {
    if (!this.checkWeekendDiscount()) return 0;
    return this.#menuCount.main * 2_023;
  }

  checkSpecialDiscount() {
    const dayOfTheWeekCondition = this.#dayOfTheWeek === DAYOFTHEWEEK.SUNDAY;
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

  // totalBenefits은 palnner의 정보. 총혜택 금액
  static giveBadge(totalBenefits) {
    if (totalBenefits < 5_000) return '없음';
    if (totalBenefits < 10_000) return '별';
    if (totalBenefits < 20_000) return '트리';
    return '산타';
  }
}

export default Events;
