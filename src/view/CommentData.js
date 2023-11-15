export const NOTHING = Object.freeze('없음');

export const DAYERROR = Object.freeze(
  `[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.`,
);
export const ORDERERROR = Object.freeze(
  `[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.`,
);

export const BENEFITSNAMES = Object.freeze({
  DDAYDISCOUNT: '크리스마스 디데이 할인',
  WEEKDAYDISCOUNT: '평일 할인',
  WEEKENDDISCOUNT: '주말 할인',
  SPECIALDISCOUNT: '특별 할인',
  GIFT: '증정 이벤트',
});

export const GREETING = Object.freeze(
  '안녕하세요! 우테코 식당 12월 이벤트 플래너입니다.',
);
export const ASKINGDAY = Object.freeze(
  '12월 중 식당 예상 방문 날짜는 언제인가요? (숫자만 입력해 주세요!)\n',
);

export const ASKINGORDER = Object.freeze(
  '주문하실 메뉴를 메뉴와 개수를 알려 주세요. (e.g. 해산물파스타-2,레드와인-1,초코케이크-1)\n',
);

export const previewAtInputDay = (day) =>
  `12월 ${day}일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!`;

export const ORDERMENUTITLE = Object.freeze('\n<주문 메뉴>');
export const orderMenuFormat = (koreanMenuName, amount) =>
  `${koreanMenuName} ${amount}개`;

export const TOTALPAYMENTTITLE = Object.freeze('\n<할인 전 총주문 금액>');
export const totalPaymentFormat = (totalPayment) => `${totalPayment}원`;
export const GIFTTITLE = Object.freeze('\n<증정 메뉴>');
export const GIFTCONTENT = Object.freeze('샴페인 1개');
export const BENEFITSTITLE = Object.freeze('\n<혜택 내역>');
export const beneiftsFormat = (beneftisName, benefitPrice) =>
  `${beneftisName}: -${benefitPrice}원`;
export const TOTALBENEFITSPRICETITLE = Object.freeze('\n<총혜택 금액>');
export const totalBenefitsPriceFormat = (totalBenefits) =>
  `-${totalBenefits}원`;
export const ESTIMATEDPAYMENTTITLE =
  Object.freeze('\n<할인 후 예상 결제 금액>');
export const estimatedPaymentFormat = (estimatedPayment) =>
  `${estimatedPayment}원`;
export const BADGETITLE = Object.freeze('\n<12월 이벤트 배지>');
export const badgeFormat = (badge) => `${badge}`;
