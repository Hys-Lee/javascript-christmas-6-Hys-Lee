import EventPlanner from '../src/controller/EventPlanner.js';
import DAYOFTHEWEEK from '../src/models/constants/DayOfTheWeek.js';

describe('EventPlanner 테스트', () => {
  const dateInfo = { day: 2, dayOfTheWeek: DAYOFTHEWEEK.SATURDAY };
  const rawOrder = {
    appetizer: { buttonMushroomSoup: 1, tapas: 0, caesarSalad: 0 },
    main: { tBoneSteak: 1, bBQRibs: 0, seafoodPasta: 0, christmasPasta: 0 },
    desert: { chocolateCake: 0, iceCream: 1 },
    drink: { zeroCola: 1, redWine: 1, champagne: 0 },
  };
  const planner = new EventPlanner(dateInfo, rawOrder);
  test('주문한 메뉴 타입 분류 및 카운팅', () => {
    const result = EventPlanner.countMenuType(rawOrder);
    const output = { appetizer: 1, main: 1, desert: 1, drink: 2 };
    expect(result).toEqual(output);
  });
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
