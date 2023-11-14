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
  constructor(dateInfo, totalOrder) {
    this.#totalBenefits = 0;
    this.#estimatedPayment = 0;
    this.initOrderMenuTypesCount();
    const menuCount = EventPlanner.countMenuType(totalOrder);
    this.#totalPayment = EventPlanner.calculateTotalPayment(totalOrder);
    const coreOrder = { menuCount, payment: this.#totalPayment };

    this.#events = new Events(dateInfo, coreOrder);
    this.#eventResult = {};
  }

  plan() {
    const benefitsResult = this.summaryBenefitsResult(this.#totalPayment);
    this.#totalBenefits = EventPlanner.calculateTotalBenefits(benefitsResult);
    const benefitsList = EventPlanner.formApplyingBenefitsList(benefitsResult);
  }

  static countMenuType(totalOrder) {
    const order = { appetizer: 0, main: 0, desert: 0, drink: 0 };
    Object.keys(order).forEach((type) => {
      order[type] = Object.keys(totalOrder[type]).reduce(
        (acc, curMenu) => acc + totalOrder[type][curMenu],
        0,
      );
    });
    return order;
  }

  static calculateTotalPayment(totalOrder) {
    const totalPayment = Object.keys(totalOrder).reduce(
      (totalAcc, menuType) => {
        const paymentOnMenuType = Object.keys(totalOrder[menuType]).reduce(
          (acc, menu) =>
            MENULIST[menuType][menu] * totalOrder[menuType][menu] + acc,
          0,
        );
        return totalAcc + paymentOnMenuType;
      },
      0,
    );

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

  static calculateDiscount(benefitsResult) {
    const discountPrice = Object.keys(benefitsResult.discountPrice).reduce(
      (acc, menuType) => acc + benefitsResult.discountPrice[menuType],
      0,
    );
    return discountPrice;
  }

  static calculateTotalBenefits(benefitsResult) {
    const discountPrice = EventPlanner.calculateDiscount(benefitsResult);
    const { giftPrice } = benefitsResult;
    return discountPrice + giftPrice;
  }

  static calculateEstimatedPayment(totalOrder, benefitsResult) {
    return (
      EventPlanner.calculateTotalPayment(totalOrder) -
      EventPlanner.calculateDiscount(benefitsResult)
    );
  }

  static benefitDDay(discountPrice) {
    return {
      name: BENEFITSNAMES.DDAYDISCOUNT,
      price: discountPrice.dDay,
    };
  }

  static benefitWeekday(discountPrice) {
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
