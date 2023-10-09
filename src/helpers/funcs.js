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
};

export const isTeacher = () => {
  return JSON.parse(localStorage.getItem("isTeacher")) || false;
};

export const dateFormate = (date = "0-0-0") => {
  const dateArr = date.split("-");
  switch (dateArr[1]) {
    case "01":
      return `${dateArr[2]} Jan`;
    case "02":
      return `${dateArr[2]} Feb`;
    case "03":
      return `${dateArr[2]} Mar`;
    case "04":
      return `${dateArr[2]} Apr`;
    case "05":
      return `${dateArr[2]} May`;
    case "06":
      return `${dateArr[2]} Jun`;
    case "07":
      return `${dateArr[2]} Jul`;
    case "08":
      return `${dateArr[2]} Aug`;
    case "09":
      return `${dateArr[2]} Sep`;
    case "10":
      return `${dateArr[2]} Oct`;
    case "11":
      return `${dateArr[2]} Nov`;
    case "12":
      return `${dateArr[2]} Dec`;
    default:
      return "";
  }
};

export function capitalize(word) {
  if (!word) return "";
  if (word.length === 0) return word;

  return word.charAt(0).toUpperCase() + word.slice(1);
}

export const formatText = (note) => {
  const regex = /(&nbsp;)+/g;
  const textWithoutTags = note?.body.replace(regex, "\n");
  return textWithoutTags?.trim().replace(/\s+/g, " ").slice(0, 120);
};
