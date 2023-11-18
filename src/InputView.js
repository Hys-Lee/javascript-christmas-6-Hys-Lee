import { Console } from '@woowacourse/mission-utils';

const InputView = {
  async read(comment) {
    const input = await Console.readLineAsync(comment);
    return input;
  },
};

export default InputView;
