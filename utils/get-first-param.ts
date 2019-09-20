const getFirstParam = <T>(input: T) =>
  Array.isArray(input) ? input[0] : input;

export { getFirstParam };
