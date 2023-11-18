import DAYOFTHEWEEK from '../models/constants/DayOfTheWeek.js';
import InputValidator from './InputValidator.js';

class DayHandler {
  #dayString;

  constructor(dayString) {
    this.#dayString = dayString;
  }

  static showDayOfTheWeek(dayNumber) {
    return dayNumber % 7;
  }

  checkValidDay() {
    if (!InputValidator.isValidDay(this.#dayString))
      throw Error(`날짜가 아닙니다`);
  }

  makeDateInfo() {
    const dayNumber = Number(this.#dayString);
    const dayOfTheWeek = DayHandler.showDayOfTheWeek(dayNumber);
    return { day: dayNumber, dayOfTheWeek };
  }
}
export default DayHandler;
