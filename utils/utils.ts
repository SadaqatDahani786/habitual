export const assertUnreachable = (x: never): never => {
  throw new Error(
    "Exhaustive check occured!\n It seems like that you may have missed some checks in your swich/case statements."
  );
};
