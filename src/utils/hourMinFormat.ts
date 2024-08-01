export const hourMinFormat = (timeInMin: number): string => {
  const hours = Math.floor(timeInMin / 60);
  const minutes = timeInMin % 60;
  const hourStr = hours > 0 ? `${hours} hr${hours > 1 ? "s" : ""}` : "";
  const minuteStr = `${minutes} min${minutes > 1 ? "s" : ""}`;
  return hours > 0 ? `${hourStr} ${minuteStr}` : minuteStr;
};
