import EventPlanner from '../src/controller/EventPlanner.js';
import DAYOFTHEWEEK from '../src/models/constants/DayOfTheWeek.js';
import { BENEFITSNAMES } from '../src/view/CommentData.js';

describe('EventPlanner 테스트', () => {
  const dateInfo = { day: 2, dayOfTheWeek: DAYOFTHEWEEK.SATURDAY };
  const totalOrder = {
    appetizer: { buttonMushroomSoup: 1, tapas: 0, caesarSalad: 0 },
    main: { tBoneSteak: 1, bBQRibs: 0, seafoodPasta: 0, christmasPasta: 0 },
    desert: { chocolateCake: 0, iceCream: 1 },
    drink: { zeroCola: 1, redWine: 1, champagne: 0 },
  };
  const planner = new EventPlanner(dateInfo, totalOrder);
  const totalPayment = 6_000 + 55_000 + 5_000 + 3_000 + 60_000;
  test('주문한 메뉴 타입 분류 및 카운팅', () => {
    const result = EventPlanner.countMenuType(totalOrder);
    const output = { appetizer: 1, main: 1, desert: 1, drink: 2 };
    expect(result).toEqual(output);
  });
  test('할인 전 총주문 금액 계산', () => {
    const result = EventPlanner.calculateTotalPayment(totalOrder);
    const output = totalPayment;
    expect(result).toBe(output);
  });
  test('적용 가능 혜택 체크', () => {
    const result = planner.summaryBenefitsResult(totalPayment);
    const output = {
      discountPrice: { dDay: 1_100, weekday: 0, weekend: 2_023, special: 0 },
      giftPrice: 25_000,
    };

    expect(result).toEqual(output);
  });

  test('총혜택 금액 계산', () => {
    const benefitsResult = planner.summaryBenefitsResult(totalPayment);
    const result = EventPlanner.calculateTotalBenefits(benefitsResult);
    const output = 1_100 + 2_023 + 25_000;
    expect(result).toBe(output);
  });
  test('할인 후 예상 결제 금액', () => {
    const benefitsResult = planner.summaryBenefitsResult(totalPayment);
    const result = EventPlanner.calculateEstimatedPayment(
      totalOrder,
      benefitsResult,
    );
    const output = totalPayment - (1_100 + 2_023);
    expect(result).toBe(output);
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
  test('적용된 혜택 유무 확인', () => {
    const inputWithBenefits = {
      dDay: {
        name: BENEFITSNAMES.DDAYDISCOUNT,
        price: 1_100,
      },
    };
    const inputWithoutBenefits = {};
    const resultWithBenefits =
      EventPlanner.hasApplyingBenefits(inputWithBenefits);
    const outputWithBenefits = true;
    expect(resultWithBenefits).toBe(outputWithBenefits);
    const resultWithoutBenefits =
      EventPlanner.hasApplyingBenefits(inputWithoutBenefits);
    const outputWitoutBenefits = false;
    expect(resultWithoutBenefits).toBe(outputWitoutBenefits);
  });
});
