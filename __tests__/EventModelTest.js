import EventsModel from '../src/models/domain/EventsModel.js';
import DayOfTheWeek from '../src/models/constants/DayOfTheWeek.js';

describe('EventModel 테스트', () => {
  test('D-day 할인 테스트', () => {
    const dateInfo = { day: 2, dayOfTheWeek: DayOfTheWeek.SATURDAY };
    const order = { menuCount: { desert: 1, main: 1 }, payment: 10_000 };
    const eventsModel = new EventsModel(dateInfo, order);
    const result = eventsModel.calculateDDayDiscount();
    const output = 1_100;
    expect(result).toBe(output);
  });

  test('평일 할인 테스트', () => {
    const dateInfo = { day: 4, dayOfTheWeek: DayOfTheWeek.MONDAY };
    const order = { menuCount: { desert: 2, main: 3 }, payment: 10_000 };
    const eventsModel = new EventsModel(dateInfo, order);
    const result = eventsModel.calculateWeekdayDiscount();
    const output = 2_023 * 2;
    expect(result).toBe(output);
  });
  test('주말 할인 테스트', () => {
    const dateInfo = { day: 4, dayOfTheWeek: DayOfTheWeek.MONDAY };
    const order = { menuCount: { desert: 2, main: 3 }, payment: 10_000 };
    const eventsModel = new EventsModel(dateInfo, order);
    const result = eventsModel.calculateWeekendDiscount();
    const output = 2_023 * 3;
    expect(result).toBe(output);
  });
});
