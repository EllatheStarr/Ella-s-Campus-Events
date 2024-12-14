// calendar.js

const calendarDays = document.getElementById('calendar-days');
const monthName = document.getElementById('month-name');
const selectedDateDisplay = document.getElementById('selected-date');
const noEventsMessage = document.getElementById('no-events-message');
const eventsTableBody = document.getElementById('events-table-body');

// Modal elements
const modal = document.createElement('div');
modal.classList.add('modal');
modal.style.display = 'none';
modal.innerHTML = `
  <div class="modal-content">
    <span class="close-modal">&times;</span>
    <div id="modal-details"></div>
  </div>
`;
document.body.appendChild(modal);
const modalDetails = document.getElementById('modal-details');
const closeModal = modal.querySelector('.close-modal');
closeModal.addEventListener('click', () => { modal.style.display = 'none'; });

// Initialize current date
let currentDate = new Date();
let selectedDate = null;
let userPreferences = [];
let allEvents = [];

// Function to fetch user and events
async function fetchUserAndEvents() {
  // Fetch user object from localStorage
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user || !user.preferences) {
    console.error('User or preferences not found in localStorage.');
    return;
  }
  userPreferences = user.preferences;

  try {
    // Fetch events from /events route
    const response = await fetch('/events');
    if (!response.ok) throw new Error('Failed to fetch events.');
    allEvents = await response.json();

    // Filter preferred events
    const preferredEvents = allEvents.filter(event => userPreferences.includes(event.id));

    // Populate the calendar with dots for preferred events
    generateCalendar(preferredEvents);
  } catch (error) {
    console.error(error.message);
  }
}

// Function to generate calendar
function generateCalendar(preferredEvents = []) {
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

    const date = new Date(year, month, i);

    // Check if there are events on this date
    const eventsForDay = preferredEvents.filter(event => {
      const eventDate = new Date(event.date);
      return (
        eventDate.getFullYear() === date.getFullYear() &&
        eventDate.getMonth() === date.getMonth() &&
        eventDate.getDate() === date.getDate()
      );
    });

    // Add a dot if there are events
    if (eventsForDay.length > 0) {
      const dot = document.createElement('span');
      dot.classList.add('event-dot');
      dayDiv.appendChild(dot);

      // Add click event to display events in modal
      dayDiv.addEventListener('click', () => {
        selectedDate = date;
        displayModal(eventsForDay);
      });
    } else {
      dayDiv.addEventListener('click', () => {
        selectedDate = date;
        displayModal([]);
      });
    }

    calendarDays.appendChild(dayDiv);
  }
}

// Function to display modal with event details
function displayModal(eventsForDay) {
  modalDetails.innerHTML = '';
  if (eventsForDay.length === 0) {
    modalDetails.innerHTML = '<p>No events for this day.</p>';
  } else {
    eventsForDay.forEach(event => {
      const eventDetails = document.createElement('div');
      eventDetails.classList.add('event-detail');
      eventDetails.innerHTML = `
        <h3>${event.name}</h3>
        <p>Date: ${new Date(event.date).toDateString()}</p>
        <p>Location: ${event.location}</p>
        <p>Capacity: ${event.capacity}</p>
      `;
      modalDetails.appendChild(eventDetails);
    });
  }
  modal.style.display = 'block';
}

// Function to populate events table
function populateEventsTable(preferredEvents) {
  console.log(preferredEvents);
  eventsTableBody.innerHTML = '';
  if (preferredEvents.length === 0) {
    noEventsMessage.style.display = 'block';
    return;
  }
  noEventsMessage.style.display = 'none';

  preferredEvents.forEach(event => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${event.name}</td>
      <td>${new Date(event.date).toDateString()}</td>
      <td>${event.location}</td>
      <td>${event.capacity}</td>
      <td><button class="view-details">View Details</button></td>
    `;
    row.querySelector('.view-details').addEventListener('click', () => {
      displayModal([event]);
    });
    eventsTableBody.appendChild(row);
  });
}

// Change month handlers
document.querySelector('.prev-month').addEventListener('click', () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  generateCalendar(allEvents.filter(event => userPreferences.includes(event.id)));
});

document.querySelector('.next-month').addEventListener('click', () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  generateCalendar(allEvents.filter(event => userPreferences.includes(event.id)));
});

// Load the calendar and fetch user/events on page load
fetchUserAndEvents();
