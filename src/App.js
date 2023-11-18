import { Console } from '@woowacourse/mission-utils';
import EventInput from './view/EventInput.js';
import EventOutput from './view/EventOutput.js';
import EventPlanner from './controller/EventPlanner.js';

class App {
  #eventInput;

  constructor() {
    this.#eventInput = new EventInput();
  }

  async run() {
    const { dateInfo, order } = await this.#eventInput.startRead();
    console.log('::', order);
    const eventPlanner = new EventPlanner(dateInfo, order);
    const outputElements = eventPlanner.plan();
    console.log(':', outputElements);
    const eventOutput = new EventOutput(outputElements);
    eventOutput.startPrint();
  }
}

export default App;
