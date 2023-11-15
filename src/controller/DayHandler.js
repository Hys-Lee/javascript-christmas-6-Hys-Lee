import DAYOFTHEWEEK from '../models/constants/DayOfTheWeek';

class DayHandler {
  #day;

  constructor(day) {
    this.#day = day;
  }

  showDayOfTheWeek() {
    return this.#day % 7;
  }
}
export default DayHandler;
