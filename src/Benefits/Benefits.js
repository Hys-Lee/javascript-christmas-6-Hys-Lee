export default class Benefits {
  #dateInfo;

  constructor(dateInfo) {
    this.#dateInfo = dateInfo;
  }

  // 일단 10_000원 넘게 구매했다 가정.
  resultDiscountingPrice(purchaseKindList, OriginalPruchasePrice) {
    const isWeekEnd =
      this.#dateInfo.theDayOfWeek === 1 || this.#dateInfo.theDayOfWeek === 2;
    const isStarDay =
      this.#dateInfo.day === 25 || this.#dateInfo.theDayOfWeek === 3;
    const dDayDiscount = (this.#dateInfo.day - 1) * 100 + 1_000;
    const weekdayDiscount = isWeekEnd
      ? 0
      : purchaseKindList.desert.reduce((acc, cur) => acc + cur, 0) * 2_023;
    const weekendDiscount = isWeekEnd
      ? purchaseKindList.main.reduce((acc, cur) => acc + cur, 0) * 2_023
      : 0;
    const specialDiscount = isStarDay ? 1_000 : 0;
    const giftPrice = OriginalPruchasePrice >= 120_000 ? 25000 : 0;
    return {
      dDay: dDayDiscount,
      weekday: weekdayDiscount,
      weekend: weekendDiscount,
      special: specialDiscount,
      gift: giftPrice,
    };
  }
}
