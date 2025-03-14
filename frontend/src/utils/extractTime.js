export function extractTime(dateTime) {
  const date = new Date(dateTime);
  const hours = padZero(date.getHours());
  const minutes = padZero(date.getMinutes());
  return `${hours}:${minutes}`;
}

//To make single digit numbers start with a leading zero
function padZero(number) {
  return number.toString().padStart(2, "0");
}
