export const gameType = 'progression';

export const rulesGame = 'What number is missing in the progression?';

const getPositiveNaturalNumber = (max) => Math.floor(Math.random() * max);

const makeArithmeticProgression = () => {
  const startNumber = getPositiveNaturalNumber(21);
  const commonDifference = getPositiveNaturalNumber(11) + 1;
  const progressionArr = [startNumber];

  for (let i = 1; i < 10; i += 1) {
    const nextNumber = progressionArr[progressionArr.length - 1] + commonDifference;
    progressionArr.push(nextNumber);
  }

  return progressionArr;
};

export const makeQuestion = () => {
  const arithmeticProgression = makeArithmeticProgression();
  const indexOfHiddenNumber = getPositiveNaturalNumber(arithmeticProgression.length);
  return arithmeticProgression.reduce((acc, el, index) => {
    let accumulator = acc;
    if (index === indexOfHiddenNumber) {
      accumulator += '.. ';
    } else {
      accumulator += `${el} `;
    }

    return accumulator;
  }, '');
};

export const getHiddenNumber = (progressionStr) => {
  const arrProgression = progressionStr.trim().split(' ');
  const hiddenNumberIndex = arrProgression.indexOf('..');

  let a = arrProgression[0];
  let b = arrProgression[1];
  if (hiddenNumberIndex === 0
    || hiddenNumberIndex === 1
    || hiddenNumberIndex === arrProgression.length - 1
    || hiddenNumberIndex === arrProgression.length - 2) {
    // eslint-disable-next-line prefer-destructuring
    a = arrProgression[4];
    // eslint-disable-next-line prefer-destructuring
    b = arrProgression[5];
  }

  const commonDifference = Math.abs(+a - +b);
  let hiddenNumber = 0;
  if (hiddenNumberIndex === 0) {
    const secondNumberInProgression = +arrProgression[1];

    hiddenNumber = secondNumberInProgression - commonDifference;
  } else if (hiddenNumberIndex === arrProgression.length - 1) {
    const penultimateNumberInProgression = +arrProgression[arrProgression.length - 2];

    hiddenNumber = penultimateNumberInProgression + commonDifference;
  } else {
    const beforeHiddenNumberInProgression = +arrProgression[hiddenNumberIndex - 1];

    hiddenNumber = beforeHiddenNumberInProgression + commonDifference;
  }

  return hiddenNumber;
};