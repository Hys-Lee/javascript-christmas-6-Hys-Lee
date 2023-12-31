import Events from '../models/domain/Events.js';
import { BENEFITSNAMES } from '../view/CommentData.js';
import { MENULIST } from '../models/constants/MenuData.js';

class EventPlanner {
  #totalPayment;

  #totalBenefits;

  #estimatedPayment;

  #orderedMenuTypesCount;

  #events;

  #eventResult;

  #totalOrder;

  #day;

  #orderList;

  #badge;

  /**
   * @param {day, dayOfTheWeek} dateInfo
   
   */
  constructor(dateInfo, totalOrder) {
    this.#totalBenefits = 0;
    this.#estimatedPayment = 0;
    this.initOrderMenuTypesCount();
    const menuCount = EventPlanner.countMenuType(totalOrder);
    this.#totalPayment = EventPlanner.calculateTotalPayment(totalOrder);
    const coreOrder = { menuCount, payment: this.#totalPayment };
    this.#totalOrder = totalOrder;
    this.#events = new Events(dateInfo, coreOrder);
    this.#eventResult = {};
    this.#day = dateInfo.day;
    this.#orderList = {};
    this.#badge = '';
  }

  prepare(benefitsResult) {
    // 순서가 있게 됨..
    this.#totalBenefits = EventPlanner.calculateTotalBenefits(benefitsResult);
    this.#estimatedPayment = EventPlanner.calculateEstimatedPayment(
      this.#totalOrder,
      benefitsResult,
    );
    this.#orderList = this.formOrderedMenuList();
    this.#badge = Events.giveBadge(this.#totalBenefits);
  }

  plan() {
    const benefitsResult = this.summaryBenefitsResult(this.#totalPayment);
    this.prepare(benefitsResult);
    const benefitsList = EventPlanner.formApplyingBenefitsList(benefitsResult);
    const outputElements = {
      day: this.#day,
      orderList: this.#orderList,
      totalPayment: this.#totalPayment,
      benefitsList,
      totalBenefits: this.#totalBenefits,
      estimatedPayment: this.#estimatedPayment,
      badge: this.#badge,
    };
    return outputElements;
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

  formOrderedMenuList() {
    const orderList = {};
    Object.values(this.#totalOrder).forEach((menuInMenuType) => {
      Object.keys(menuInMenuType).forEach((menuName) => {
        if (menuInMenuType[menuName] > 0)
          orderList[menuName] = menuInMenuType[menuName];
      });
    });
    return orderList;
  }

  static hasApplyingBenefits(benefitsList) {
    return Object.keys(benefitsList).length !== 0;
  }
}
export default EventPlanner;
