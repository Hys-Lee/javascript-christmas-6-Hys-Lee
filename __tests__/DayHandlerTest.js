import DayHandler from '../src/controller/DayHandler.js';
import DAYOFTHEWEEK from '../src/models/constants/DayOfTheWeek.js';

describe(`DayHandler 테스트`, () => {
  //
  test('요일 확인', () => {
    const dayOnDecember = '2';
    const result = DayHandler.showDayOfTheWeek(Number(dayOnDecember));
    const output = DAYOFTHEWEEK.SATURDAY;
    expect(result).toBe(output);
  });
});
