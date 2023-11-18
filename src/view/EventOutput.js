import OutputView from '../OutputView.js';
import {
  previewAtInputDay,
  ORDERMENUTITLE,
  orderMenuFormat,
  TOTALPAYMENTTITLE,
  totalPaymentFormat,
  GIFTTITLE,
  GIFTCONTENT,
  BENEFITSTITLE,
  beneiftsFormat,
  TOTALBENEFITSPRICETITLE,
  totalBenefitsPriceFormat,
  ESTIMATEDPAYMENTTITLE,
  estimatedPaymentFormat,
  BADGETITLE,
  badgeFormat,
  NOTHING,
} from './CommentData.js';
import { KOERANMENUNAME } from '../models/constants/MenuData.js';

class EventOutput {
  #day;

  #orderList;

  #totalPayment;

  #benefitsList;

  #totalBenefits;

  #estimatedPayment;

  #badge;

  /**
   *
   * @param {day,orderList,totalPayment, benefitsList, totalBenefits, estimatedPayment, badge } outputElements
   */
  constructor(outputElements) {
    this.#day = outputElements.day;
    this.#orderList = outputElements.orderList;
    this.#totalPayment = outputElements.totalPayment;
    this.#benefitsList = outputElements.benefitsList;
    this.#totalBenefits = outputElements.totalBenefits;
    this.#estimatedPayment = outputElements.estimatedPayment;
    this.#badge = outputElements.badge;
  }

  static printOrderMenu(orderList) {
    OutputView.print(ORDERMENUTITLE);
    Object.keys(orderList).forEach((menuName) => {
      const amount = orderList[menuName];
      const koreanMenuName = KOERANMENUNAME[menuName];
      OutputView.print(orderMenuFormat(koreanMenuName, amount));
    });
  }

  printTotalPayment() {
    OutputView.print(TOTALPAYMENTTITLE);
    OutputView.print(totalPaymentFormat(this.#totalPayment));
  }

  printGift() {
    OutputView.print(GIFTTITLE);
    if (!Object.keys(this.#benefitsList).includes('gift')) {
      OutputView.print(NOTHING);
      return;
    }
    OutputView.print(GIFTCONTENT);
  }

  printBeneiftis() {
    OutputView.print(BENEFITSTITLE);
    if (Object.keys(this.#benefitsList).length === 0) {
      OutputView.print(NOTHING);
      return;
    }

    Object.values(this.#benefitsList).forEach((menuNameAndPrice) => {
      OutputView.print(
        beneiftsFormat(menuNameAndPrice.name, menuNameAndPrice.price),
      );
    });
  }

  printTotalBenefits() {
    OutputView.print(TOTALBENEFITSPRICETITLE);
    OutputView.print(totalBenefitsPriceFormat(this.#totalBenefits));
  }

  printEstimatedPayment() {
    OutputView.print(ESTIMATEDPAYMENTTITLE);
    OutputView.print(estimatedPaymentFormat(this.#estimatedPayment));
  }

  printBadge() {
    OutputView.print(BADGETITLE);
    OutputView.print(badgeFormat(this.#badge));
  }

  startPrint() {
    OutputView.print(previewAtInputDay(this.#day));
    EventOutput.printOrderMenu(this.#orderList);
    this.printTotalPayment();
    this.printGift();
    this.printBeneiftis();
    this.printTotalBenefits();
    this.printEstimatedPayment();
    this.printBadge();
  }
}
export default EventOutput;
