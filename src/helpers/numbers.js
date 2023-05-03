export const increaseByPercent = (number, percent = 50) => {
  const onePercent = number.div(100);

  return number.add(onePercent.mul(percent));
};

export const shortenAddress = (address, chars = 4) => {
  try {
    const parsed = getAddress(address);
    return `${parsed.substring(0, chars + 2)}...${parsed.substring(42 - chars)}`;
  } catch (error) {
    // throw Error(`Invalid 'address' parameter '${address}'.`);
  }
};