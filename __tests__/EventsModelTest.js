import EventsModel from '../src/models/domain/EventsModel.js';
import DayOfTheWeek from '../src/models/constants/DayOfTheWeek.js';

// 테스트도 코드다.
// 중복 된 것들을 refactor하자.
// 근데, 각 테스트마다 메서드를 다르게 해야 하는데, 이거는 찍어낼 수 없는데.
// 다른 dateInfo, order, output은 인자로 넣어서 찍어낼 수 있지만 크게 차이 안날 듯...
// 결국 가장 좋은 것은, 각 기능마다 describe로 쪼개고, test는 정상, 예외 체크로 해야..
describe('EventModel 테스트', () => {
  test('D-day 할인 테스트', () => {
    const dateInfo = { day: 2, dayOfTheWeek: DayOfTheWeek.SATURDAY };
    const order = { menuCount: { desert: 1, main: 1 }, payment: 10_000 };
    const eventsModel = new EventsModel(dateInfo, order);
    const result = eventsModel.resultDDayDiscount();
    const output = 1_100;
    expect(result).toBe(output);
  });

  test('평일 할인 테스트', () => {
    const dateInfo = { day: 4, dayOfTheWeek: DayOfTheWeek.MONDAY };
    const order = { menuCount: { desert: 2, main: 3 }, payment: 10_000 };
    const eventsModel = new EventsModel(dateInfo, order);
    const result = eventsModel.resultWeekdayDiscount();
    const output = 2_023 * 2;
    expect(result).toBe(output);
  });
  test('주말 할인 테스트', () => {
    const dateInfo = { day: 1, dayOfTheWeek: DayOfTheWeek.FRIDAY };
    const order = { menuCount: { desert: 2, main: 3 }, payment: 10_000 };
    const eventsModel = new EventsModel(dateInfo, order);
    const conditionResult = eventsModel.checkWeekendDiscount();
    const result = eventsModel.resultWeekendDiscount();
    const output = 2_023 * 3;
    expect(conditionResult).toBe(true);
    expect(result).toBe(output);
  });
  test('특별 할인 테스트', () => {
    const dateInfo = { day: 25, dayOfTheWeek: DayOfTheWeek.MONDAY };
    const order = { menuCount: { desert: 2, main: 3 }, payment: 10_000 };
    const eventsModel = new EventsModel(dateInfo, order);
    const result = eventsModel.resultSpecialDiscount();
    const output = 1_000;
    expect(result).toBe(output);
  });

  test('증정 메뉴의 가격 테스트', () => {
    const dateInfo = { day: 25, dayOfTheWeek: DayOfTheWeek.MONDAY };
    const order = { menuCount: { desert: 2, main: 12 }, payment: 121_000 };
    const eventsModel = new EventsModel(dateInfo, order);
    const result = eventsModel.resultGiftPrice(order.payment);
    const output = 25_000;
    expect(result).toBe(output);
  });
  test('뱃지 부여 테스트', () => {
    const output = {
      none: '없음',
      star: '별',
      tree: '트리',
      santa: '산타',
    };
    const result = {
      none: EventsModel.giveBadge(500),
      star: EventsModel.giveBadge(5_000),
      tree: EventsModel.giveBadge(10_000),
      santa: EventsModel.giveBadge(20_000),
    };
    expect(result.none).toBe(output.none);
    expect(result.star).toBe(output.star);
    expect(result.tree).toBe(output.tree);
    expect(result.santa).toBe(output.santa);
  });
});
