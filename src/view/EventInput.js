import InputView from '../InputView.js';
import OutputView from '../OutputView.js';
import InputValidator from '../controller/InputValidator.js';
import DayHandler from '../controller/DayHandler.js';
import OrderHandler from '../controller/OrderHandler.js';
import {
  ASKINGDAY,
  ASKINGORDER,
  DAYERROR,
  ORDERERROR,
  GREETING,
} from './CommentData.js';

class EventInput {
  #dateInfo;

  #orderInfo;

  constructor() {
    this.#dateInfo = {};
    this.#orderInfo = {};
  }

  async startRead() {
    OutputView.print(GREETING);
    await this.readDay();
    await this.readOrder();
    return { dateInfo: this.#dateInfo, order: this.#orderInfo };
  }

  async readDay() {
    const rawDay = await InputView.read(ASKINGDAY);
    const dayHandler = new DayHandler(rawDay);
    try {
      InputValidator.checkValidDayForm(rawDay);
      this.#dateInfo = dayHandler.makeDateInfo();
    } catch (error) {
      OutputView.print(DAYERROR);
      await this.readDay();
    }
  }

  async readOrder() {
    const rawOrder = await InputView.read(ASKINGORDER);
    const orderHandler = new OrderHandler(rawOrder);
    try {
      InputValidator.checkValidOrderForm(rawOrder);
      this.#orderInfo = orderHandler.makeOrderInfo();
    } catch (error) {
      OutputView.print(ORDERERROR);
      await this.readOrder();
    }
  }
}
export default EventInput;
