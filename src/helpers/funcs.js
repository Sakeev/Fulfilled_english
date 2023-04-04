export const getWeekDay = () => {
  const d = new Date();
  let WEEK_DAY = d.getDay();
  switch (WEEK_DAY) {
    case 0:
      return "Sunday";
    case 1:
      return "Monday";
    case 2:
      return "Tuesday";
    case 3:
      return "Wendesday";
    case 4:
      return "Thursday";
    case 5:
      return "Friday";
    case 6:
      return "Saturday";
    default:
      return "Error";
  }
}
