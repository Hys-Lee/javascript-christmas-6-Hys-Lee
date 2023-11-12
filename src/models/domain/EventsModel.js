class EventsModel {
  /**
   * @param {day, dayOfTheWeek} dateInfo
   *
   */
  #day;

  #dayOfTheWeek;

  #order;

  constructor(dateInfo, order) {
    this.#day = dateInfo.day;
    this.#dayOfTheWeek = dateInfo.dateInfo;
    this.#order = order;
  }

  calculateDDayDiscount() {
    return (this.#day - 1) * 100 + 1_000;
  }
}

export default EventsModel;
