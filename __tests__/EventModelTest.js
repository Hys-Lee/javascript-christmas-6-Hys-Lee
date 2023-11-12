import EventModels from '../src/models/domain/EventModel';
import DayOfTheWeek from '../src/models/constants/DayOfTheWeek';

describe('EventModel 테스트', () => {
  test('D-day 할인 테스트', () => {
    const dateInfo = { day: 2, dayOfTheWeek: DayOfTheWeek.SATURDAY };
    const order = { menuCount: { desert: 1, main: 1 }, payment: 10_000 };
    const eventModel = new EventModels(dateInfo, order);
    const result = eventModel.calculateDDayDiscount();
    const output = 1_100;
    expect(result).toBe(output);
  });
});
