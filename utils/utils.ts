/**
 ** **
 ** ** ** Throw an error on purpose to catch unintentialy missed swich case statements
 ** **
 */
export const assertUnreachable = (x: never): never => {
  throw new Error(
    "Exhaustive check occured!\n It seems like that you may have missed some checks in your swich/case statements."
  );
};

/**
 ** **
 ** ** ** Format the number by adding a sepeartor after each 3 digits
 ** **
 */
export const numberFormatter = (number: number, seperator = ",") => {
  let increment = 3;
  return number
    .toString()
    .split("")
    .reverse()
    .reduce((prev, curr, ind) => {
      if (ind !== increment) return (prev += curr);
      increment += increment;
      return (prev += seperator + curr);
    }, "")
    .split("")
    .reverse();
};
