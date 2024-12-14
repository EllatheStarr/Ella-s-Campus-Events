const selectedDateDisplay = document.getElementById('selected-date');
const noEventsMessage = document.getElementById('no-events-message');
const eventsContainer = document.getElementById('events-container');
const eventsTableBody = document.getElementById('events-table-body');

// Fetch all events and filter by selected date
async function fetchEvents(selectedDate) {
  if (!selectedDate) return;

  // Format the selected date to send it to the backend (e.g., YYYY-MM-DD)
  const formattedDate = selectedDate.toISOString().split('T')[0];

  try {
    // Fetch all events from the backend
    const response = await fetch('/events');
    const events = await response.json();

    // Filter events to match the selected date
    const filteredEvents = events.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.toISOString().split('T')[0] === formattedDate;
    });

    // Clear the previous events from the table
    eventsTableBody.innerHTML = '';

    if (filteredEvents.length === 0) {
      noEventsMessage.style.display = 'block';
      eventsContainer.style.display = 'none';
    } else {
      noEventsMessage.style.display = 'none';
      eventsContainer.style.display = 'block';

      // Populate the events table with filtered events
      filteredEvents.forEach(event => {
        const row = document.createElement('tr');

        row.innerHTML = `
          <td>${event.name}</td>
          <td>${new Date(event.date).toLocaleDateString()}</td>
          <td>${event.location}</td>
          <td>${event.available_seats}</td>
          <td>
            <button class="btn btn-view" onclick="viewEventDetails('${event._id}')">View</button>
          </td>
        `;

        eventsTableBody.appendChild(row);
      });
    }
  } catch (error) {
    console.error('Error fetching events:', error);
    noEventsMessage.style.display = 'block';
    eventsContainer.style.display = 'none';
  }
}

// View event details (optional)
function viewEventDetails(eventId) {
  // Logic to show event details, e.g., redirect to event details page
  window.location.href = `/event-details.html?id=${eventId}`;
}
