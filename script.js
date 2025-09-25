/* =========================
   DIGITAL CLOCK FUNCTION
========================= */
const hoursEl = document.querySelector(".hours");
const minutesEl = document.querySelector(".minutes");
const secondsEl = document.querySelector(".seconds");
const formatEl = document.querySelector(".format");
const daysEl = document.querySelector(".days");
const monthsEl = document.querySelector(".months");
const yearsEl = document.querySelector(".years");
const weekdayEls = document.querySelectorAll(".weekday span");

let clockInterval;

function digitalClock(timezone){
  const dateFunction = timezone
    ? new Date(new Date().toLocaleString("en-US",{timeZone: timezone}))
    : new Date();

  let hours = dateFunction.getHours();
  let minutes = dateFunction.getMinutes();
  let seconds = dateFunction.getSeconds();
  let date = dateFunction.getDate();
  let month = dateFunction.getMonth() + 1;
  let year = dateFunction.getFullYear();
  let day = dateFunction.getDay(); 
  let timeFormat = hours >= 12 ? "PM":"AM";

  hours = hours === 0 ? 12 : hours;
  hours = hours > 12 ? hours - 12 : hours;
  hours = hours < 10 ? "0"+hours : hours;
  minutes = minutes < 10 ? "0"+minutes : minutes;
  seconds = seconds < 10 ? "0"+seconds : seconds;
  date = date < 10 ? "0"+date : date;
  month = month < 10 ? "0"+month : month;

  // Update DOM
  hoursEl.textContent = hours;
  minutesEl.textContent = minutes;
  secondsEl.textContent = seconds;
  formatEl.textContent = timeFormat;
  daysEl.textContent = date;
  monthsEl.textContent = month;
  yearsEl.textContent = year;

  // Highlight weekday
  weekdayEls.forEach(el => el.classList.remove("active"));
  weekdayEls[day].classList.add("active");
}

/* =========================
   START CLOCK
========================= */
function startClock(timezone){
  if(clockInterval) clearInterval(clockInterval);
  digitalClock(timezone);
  clockInterval = setInterval(()=>digitalClock(timezone),1000);
}

// initial run
startClock();

/* =========================
   DARK MODE TOGGLE
========================= */
const themeSwitch = document.getElementById("theme-switch");
themeSwitch.addEventListener("click", ()=>{
  document.body.classList.toggle("darkmode");
  if(document.body.classList.contains("darkmode")){
    localStorage.setItem("darkmode","active");
  } else {
    localStorage.setItem("darkmode",null);
  }
});
if(localStorage.getItem("darkmode")==="active"){
  document.body.classList.add("darkmode");
}

/* =========================
   DROPDOWN COUNTRY SELECTION
========================= */
const countryDropdown = document.getElementById("country-dropdown");

// On dropdown change
countryDropdown.addEventListener("change",()=>{
  const selectedOption = countryDropdown.options[countryDropdown.selectedIndex];
  const tz = selectedOption.value;

  if(tz){
    startClock(tz);
    localStorage.setItem("selectedCountry", tz);
  } else {
    startClock();
    localStorage.removeItem("selectedCountry");
  }
});

// Restore previous selection on load
window.addEventListener("load",()=>{
  const savedTz = localStorage.getItem("selectedCountry");
  if(savedTz){
    countryDropdown.value = savedTz;
    startClock(savedTz);
  } else {
    startClock();
  }
});