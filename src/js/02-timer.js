import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

// Initialisation of elements

const startBtn = document.querySelector('button[data-start]');
startBtn.disabled = true;
const daysField = document.querySelector('span[data-days]');
const hoursField = document.querySelector('span[data-hours]');
const minutesField = document.querySelector('span[data-minutes]');
const secondsField = document.querySelector('span[data-seconds]');
const dateField = document.querySelector('#datetime-picker');

// add style atributes (make some CSS)

document.querySelector('.timer').style.display = 'flex';
document.querySelector('.timer').style.gap = '24px';
document.querySelector('.timer').style.marginLeft = '48px';
const fields = document.querySelectorAll('.field');
fields.forEach((field) => {
    field.style.display = 'flex';
    field.style.flexDirection = 'column';
    field.style.alignItems = 'center';
})
const numberFields = document.querySelectorAll('.value');
numberFields.forEach((field) => {
    field.style.fontSize = '32px';
})
dateField.style.fontSize = "28px";
dateField.style.textAlign = 'center';
startBtn.style.height = '60px';
startBtn.style.backgroundColor = 'yellow';
startBtn.style.fontSize = '18px';
startBtn.style.borderRadius = '50%';
 startBtn.style.cursor = 'not-allowed';

// calendar

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {

// date validation

        const now = new Date();
        if (selectedDates[0].getTime() > now.getTime()) {
            startBtn.disabled = false;
            startBtn.style.backgroundColor = 'limegreen';
            startBtn.style.cursor = 'pointer';
        } else {
            Notiflix.Notify.failure("Please choose a date in the future");
            startBtn.disabled = true;
            startBtn.style.backgroundColor = 'yellow';
            startBtn.style.cursor = 'not-allowed'
   }
  },
}
flatpickr(dateField, options);

// functions set

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
    if (value.toString().length < 2) {
        return value.toString().padStart(2,"0")
    } else {
        return value
    }
}

function timerChange() {
    
    const setTime = new Date (localStorage.getItem('current-time')).getTime();
    const currentTime = new Date().getTime();
    if (setTime < currentTime) {
        clearInterval(timerInt);
        return
    }
    const result = convertMs(setTime - currentTime);
    daysField.textContent = addLeadingZero(result.days);
    hoursField.textContent = addLeadingZero(result.hours);
    minutesField.textContent = addLeadingZero(result.minutes);
    secondsField.textContent = addLeadingZero(result.seconds);
    return
}

// listener and countdown
let timerInt;

startBtn.addEventListener('click', () => {
    localStorage.setItem('current-time', dateField.value)
    timerInt = setInterval(timerChange,1000)
})