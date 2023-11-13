import EventPlanner from '../src/controller/EventPlanner.js';
import DAYOFTHEWEEK from '../src/models/constants/DayOfTheWeek.js';

describe('EventPlanner 테스트', () => {
  const dateInfo = { day: 2, dayOfTheWeek: DAYOFTHEWEEK.SATURDAY };
  const order = { menuCount: { desert: 1, main: 1 }, payment: 10_000 };
  const planner = new EventPlanner(dateInfo, order);
  test('적용 가능 혜택 체크', () => {
    const result = planner.summaryBenefitsResult(10_000);
    const output = {
      discountPrice: { dDay: 1_100, weekday: 0, weekend: 2_023, special: 0 },
      giftPrice: 0,
    };

    expect(result).toEqual(output);
  });

  test('혜택 내역 산출', () => {
    const beneftis = planner.summaryBenefitsResult(10_000);
    const result = EventPlanner.formApplyingBenefitsList(beneftis);
    const output = {
      dDay: { name: '크리스마스 디데이 할인', price: 1_100 },
      weekend: { name: '주말 할인', price: 2_023 },
    };

    expect(result).toEqual(output);
  });
});
