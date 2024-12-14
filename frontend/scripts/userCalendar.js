// Select DOM elements
const calendarDays = document.getElementById('calendar-days');
const monthName = document.getElementById('month-name');
const selectedDateDisplay = document.getElementById('selected-date');
const noEventsMessage = document.getElementById('no-events-message');
const eventsTableBody = document.getElementById('events-table-body');

// Initialize current date, events, and user preferences
let currentDate = new Date();
let events = [];
// Retrieve and parse the user data from localStorage
const user = JSON.parse(localStorage.getItem('user'));
console.log('User:', user);

// Safely access the preferences array and map the categories
const userPreferences = user.preferences.map(preference => preference.category);
console.log('User Preferences:', userPreferences);

// Fetch events from the backend
async function fetchEventsFromAPI() {
  try {
    const response = await fetch('/events'); // API endpoint for fetching events
    if (!response.ok) throw new Error('Failed to fetch events');
    events = await response.json();
    generateCalendar(); // Generate calendar with filtered event data
  } catch (error) {
    console.error('Error fetching events:', error);
  }
}

// Generate calendar
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

  // Clear calendar days
  calendarDays.innerHTML = '';

  // Generate empty days for the start of the month
  for (let i = 0; i < startingDay; i++) {
    const emptyDay = document.createElement('div');
    calendarDays.appendChild(emptyDay);
  }

  // Generate calendar days
  for (let i = 1; i <= totalDays; i++) {
    const dayDiv = document.createElement('div');
    dayDiv.classList.add('day');
    dayDiv.innerText = i;

    const currentDate = new Date(year, month, i);
    const currentDateString = currentDate.toISOString().split('T')[0]; // Format: YYYY-MM-DD

    // Check if there are events for this day matching user preferences
    const eventsForDay = events.filter(event => {
      const eventDate = event.date.split('T')[0];
      return (
        eventDate === currentDateString &&
        userPreferences.includes(event.category._id) // Filter by user preferences
      );
    });

    if (eventsForDay.length > 0) {
      dayDiv.classList.add('has-events'); // Highlight the day with events

      // Add dot marker for events
      const dotMarker = document.createElement('div');
      dotMarker.classList.add('event-marker');
      dayDiv.appendChild(dotMarker);
    }

    // Add click listener to populate events for the selected day
    dayDiv.addEventListener('click', () => {
      selectedDateDisplay.innerText = currentDate.toDateString();
      populateEventsTable(eventsForDay); // Populate table with events for the selected day
    });

    calendarDays.appendChild(dayDiv);
  }
}

// Populate events table for a specific date
function populateEventsTable(eventsForDay) {
  // Clear previous rows
  eventsTableBody.innerHTML = '';

  if (eventsForDay.length === 0) {
    noEventsMessage.style.display = 'block'; // Show "no events" message
    return;
  }

  noEventsMessage.style.display = 'none'; // Hide "no events" message

  eventsForDay.forEach(event => {
    const row = document.createElement('tr');

    // Create table cells for each event property
    row.innerHTML = `
      <td>${event.name}</td>
      <td>${new Date(event.date).toDateString()}</td>
      <td>${event.location}</td>
      <td>${event.available_seats}</td>
      <td>
        <button class="rsvp-btn" data-id="${event._id}" onclick="rsvpEvent('${event._id}')">RSVP</button>
      </td>
    `;

    eventsTableBody.appendChild(row);
  });
}

// RSVP to an event
async function rsvpEvent(eventId) {
    
try {
        // Fetch the event details to check available seats
        const eventResponse = await fetch(`/events/${eventId}`);
        const event = await eventResponse.json();

        // Check if the event exists and if there are available seats
        if (!event || event.available_seats <= 0) {
            alert('No available seats for this event.');
            return;
        }

        // Prepare RSVP data
        const rsvpData = {
            user: user.id,
            event: eventId
        };

        // Send RSVP request to the backend
        const rsvpResponse = await fetch('/rsvps', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(rsvpData)
        });

        if (!rsvpResponse.ok) {
            throw new Error('Failed to RSVP');
        }

        const rsvpResult = await rsvpResponse.json();
        console.log('RSVP Successful:', rsvpResult);
        alert('RSVP successful! Available seats updated.');
    } catch (error) {
        console.error('Error RSVP-ing:', error);
        alert(error.message);
    }
}


// Change month handlers
document.querySelector('.prev-month').addEventListener('click', () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  generateCalendar();
});

document.querySelector('.next-month').addEventListener('click', () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  generateCalendar();
});

// Initial load
fetchEventsFromAPI();
