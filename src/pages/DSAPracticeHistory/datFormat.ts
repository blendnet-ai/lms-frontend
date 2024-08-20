function formatDateTime(dateTimeString: string): string {
  const months: string[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const date: Date = new Date(dateTimeString);

  // Convert UTC time to IST
  const ISTOffset = 5.5 * 60 * 60 * 1000;
  const ISTTime = new Date(date.getTime() + ISTOffset);

  const day: number = ISTTime.getDate();
  const month: string = months[ISTTime.getMonth()];
  const year: number = ISTTime.getFullYear();

  let hours: number = ISTTime.getHours();
  const minutes: number = ISTTime.getMinutes();
  const ampm: string = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'

  const minutesStr: string = minutes < 10 ? "0" + minutes : minutes.toString();

  let daySuffix: string;
  if (day >= 11 && day <= 13) {
    daySuffix = "th";
  } else {
    switch (day % 10) {
      case 1:
        daySuffix = "st";
        break;
      case 2:
        daySuffix = "nd";
        break;
      case 3:
        daySuffix = "rd";
        break;
      default:
        daySuffix = "th";
        break;
    }
  }

  return `${day}${daySuffix} ${month} ${year} | ${hours}:${minutesStr} ${ampm}`;
}

export default formatDateTime;
