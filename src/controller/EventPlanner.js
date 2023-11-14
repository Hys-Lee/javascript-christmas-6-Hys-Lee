import Events from '../models/domain/Events.js';
import BENEFITSNAMES from '../models/constants/CommentConstants.js';
import { MENULIST } from '../models/constants/MenuData.js';

class EventPlanner {
  #totalPayment;

  #totalBenefits;

  #estimatedPayment;

  #orderedMenuTypesCount;

  #events;

  #eventResult;

  /**
   * @param {day, dayOfTheWeek} dateInfo
   * @param { menuCount: { desert, main }, payment } order
   */
  constructor(dateInfo, rawOrder) {
    this.#totalBenefits = 0;
    this.#estimatedPayment = 0;
    this.initOrderMenuTypesCount();
    const menuCount = EventPlanner.countMenuType(rawOrder);
    this.#totalPayment = EventPlanner.calculateTotalPayment(rawOrder);
    const order = { menuCount, payment: this.#totalPayment };
    this.#events = new Events(dateInfo, order);
    this.#eventResult = {};
  }

  plan() {
    const benefitsResult = this.summaryBenefitsResult(this.#totalPayment);
    const benefitsList = EventPlanner.formApplyingBenefitsList(benefitsResult);
  }

  // rawOrder: 에피타이저의 각 메뉴가 몇 개씩 주문됐는지 등. object로.
  static countMenuType(rawOrder) {
    const order = { appetizer: 0, main: 0, desert: 0, drink: 0 };
    Object.keys(order).forEach((type) => {
      order[type] = Object.keys(rawOrder[type]).reduce(
        (acc, curMenu) => acc + rawOrder[type][curMenu],
        0,
      );
    });
    return order;
  }

  static calculateTotalPayment(rawOrder) {
    const totalPayment = Object.keys(rawOrder).reduce((totalAcc, menuType) => {
      const paymentOnMenuType = Object.keys(rawOrder[menuType]).reduce(
        (acc, menu) =>
          MENULIST[menuType][menu] * rawOrder[menuType][menu] + acc,
        0,
      );
      return totalAcc + paymentOnMenuType;
    }, 0);
    return totalPayment;
  }

  initOrderMenuTypesCount() {
    this.#orderedMenuTypesCount = {
      appetizer: 0,
      main: 0,
      desert: 0,
      drink: 0,
    };
  }

  summaryBenefitsResult(totalPayment) {
    const dDay = this.#events.resultDDayDiscount();
    const weekday = this.#events.resultWeekdayDiscount();
    const weekend = this.#events.resultWeekendDiscount();
    const special = this.#events.resultSpecialDiscount();
    const giftPrice = this.#events.resultGiftPrice(totalPayment);

    return {
      discountPrice: { dDay, weekday, weekend, special },
      giftPrice,
    };
  }

  static benefitDDay(discountPrice) {
    return {
      name: BENEFITSNAMES.DDAYDISCOUNT,
      price: discountPrice.dDay,
    };
  }

  static benefitWeekday(discountPrice) {
    // const { discountPrice } = this.#eventResult;
    return {
      name: BENEFITSNAMES.WEEKDAYDISCOUNT,
      price: discountPrice.weekday,
    };
  }

  static benefitWeekend(discountPrice) {
    return {
      name: BENEFITSNAMES.WEEKENDDISCOUNT,
      price: discountPrice.weekend,
    };
  }

  static bnenfitSpecial(discountPrice) {
    return {
      name: BENEFITSNAMES.SPECIALDISCOUNT,
      price: discountPrice.special,
    };
  }

  static benefitGift(giftPrice) {
    return {
      name: BENEFITSNAMES.GIFT,
      price: giftPrice,
    };
  }

  static formApplyingBenefitsList(benefitsResult) {
    const { discountPrice, giftPrice } = benefitsResult;
    const benefitsList = {};
    if (discountPrice.dDay !== 0)
      benefitsList.dDay = EventPlanner.benefitDDay(discountPrice);
    if (discountPrice.weekday !== 0)
      benefitsList.weekday = EventPlanner.benefitWeekday(discountPrice);
    if (discountPrice.weekend !== 0)
      benefitsList.weekend = EventPlanner.benefitWeekend(discountPrice);
    if (discountPrice.special !== 0)
      benefitsList.special = EventPlanner.bnenfitSpecial(discountPrice);
    if (giftPrice !== 0)
      benefitsList.gift = EventPlanner.benefitGift(giftPrice);
    return benefitsList;
  }
}
export default EventPlanner;
