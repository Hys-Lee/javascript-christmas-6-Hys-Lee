class EventsModel {
  /**
   * @param {day, dayOfTheWeek} dateInfo
   * @param { menuCount: { desert, main }, payment } order
   */
  #day;

  #dayOfTheWeek;

  #menuCount;

  #payment;

  constructor(dateInfo, order) {
    this.#day = dateInfo.day;
    this.#dayOfTheWeek = dateInfo.dateInfo;
    this.#menuCount = order.menuCount;
    this.#payment = order.payment;
  }

  calculateDDayDiscount() {
    return (this.#day - 1) * 100 + 1_000;
  }

  calculateWeekdayDiscount() {
    return this.#menuCount.desert * 2_023;
  }
}

export default EventsModel;