let today = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[today.getDay()];

let hours = addZero(today.getHours());
let minutes = addZero(today.getMinutes());

function addZero(num) {
  return num < 10 ? `0${num}` : num;
}
let dateElement = document.querySelector(".date");
dateElement.innerHTML = `${day}, ${hours}:${minutes}`;
