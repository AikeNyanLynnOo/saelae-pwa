export const splitInputValue = (val: string) => {
  const [code, value] = (val &&
    val.length > 0 &&
    val.includes(" ") &&
    val.split(" ")) || ["", ""];

  return {
    code,
    value,
  };
};
