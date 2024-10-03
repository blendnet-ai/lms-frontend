const longToShortForm = (longForm: string) => {
  const shortForm = longForm
    .split(" ")
    .map((word) => word.charAt(0))
    .join("");
  return shortForm;
};

export default longToShortForm;
