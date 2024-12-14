// calendar.js

const calendarDays = document.getElementById('calendar-days');
const monthName = document.getElementById('month-name');
const selectedDateDisplay = document.getElementById('selected-date');
const noEventsMessage = document.getElementById('no-events-message');
const eventsContainer = document.getElementById('events-container');

// Initialize current date
let currentDate = new Date();
let selectedDate = null;

// Function to generate calendar
function generateCalendar() {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // Set the month name
  monthName.innerText = `${currentDate.toLocaleString('default', { month: 'long' })} ${year}`;

  // Get first day of the month and the number of days in the month
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const totalDays = lastDayOfMonth.getDate();
  const startingDay = firstDayOfMonth.getDay();

  // Clear current calendar days
  calendarDays.innerHTML = '';

  // Generate empty days for the start of the month
  for (let i = 0; i < startingDay; i++) {
    const emptyDay = document.createElement('div');
    calendarDays.appendChild(emptyDay);
  }

  // Generate the calendar days
  for (let i = 1; i <= totalDays; i++) {
    const dayDiv = document.createElement('div');
    dayDiv.classList.add('day');
    dayDiv.innerText = i;

    dayDiv.addEventListener('click', () => {
      selectedDate = new Date(year, month, i);
      selectedDateDisplay.innerText = selectedDate.toDateString();
      fetchEvents(selectedDate); // Fetch events for the selected date
    });

    calendarDays.appendChild(dayDiv);
  }
}

// Function to change month (previous/next)
document.querySelector('.prev-month').addEventListener('click', () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  generateCalendar();
});

document.querySelector('.next-month').addEventListener('click', () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  generateCalendar();
});

// Load the calendar on page load
generateCalendar();

