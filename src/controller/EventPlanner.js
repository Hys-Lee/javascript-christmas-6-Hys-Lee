import Events from '../models/domain/Events.js';
import BENEFITSNAMES from '../models/constants/CommentConstants.js';

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
  constructor(dateInfo, order) {
    this.#totalPayment = 0;
    this.#totalBenefits = 0;
    this.#estimatedPayment = 0;
    this.initOrderMenuTypesCount();
    this.#events = new Events(dateInfo, order);
    this.#eventResult = {};
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

  plan() {
    // this.storeEventResult(this.#totalPayment, this.#totalBenefits);
    // this.#eventResult = this.#events.eventResult;
    const benefitsResult = this.summaryBenefitsResult(this.#totalPayment);
    const benefitsList = EventPlanner.formApplyingBenefitsList(benefitsResult);
  }
}
export default EventPlanner;
