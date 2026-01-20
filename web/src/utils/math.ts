function makeRoundingFunction(fn: (number: number) => number) {
  return (value: number, precision = 0): number => {
    const roundingFactor = Math.pow(10, precision);
    const nonDecimalsValue = fn(value * roundingFactor);
    const decimalsAdjustedValue = nonDecimalsValue / roundingFactor;

    return decimalsAdjustedValue;
  };
}

export const round = makeRoundingFunction(Math.round);

export const floor = makeRoundingFunction(Math.floor);

export const ceiling = makeRoundingFunction(Math.ceil);
