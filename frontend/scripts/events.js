// Sample event data (this would typically come from a server in a real-world app)
// Sample event data
const events = [
    { name: 'Web Development Workshop', date: '2024-12-15', location: 'Online', capacity: 100 },
    { name: 'Data Science Conference', date: '2024-12-20', location: 'L6', capacity: 150 },
    { name: 'AI & Machine Learning Meetup', date: '2024-12-17', location: 'U3', capacity: 200 },
  ];
  
  // Fetch and display events
  function fetchEvents(selectedDate) {
    if (!selectedDate) return;
  
    const formattedDate = selectedDate.toISOString().split('T')[0];
    const filteredEvents = events.filter(event => event.date === formattedDate);
  
    const tableBody = document.getElementById('events-table-body');
    tableBody.innerHTML = '';
  
    if (filteredEvents.length === 0) {
      noEventsMessage.style.display = 'block';
    } else {
      noEventsMessage.style.display = 'none';
      filteredEvents.forEach(event => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${event.name}</td>
          <td>${event.date}</td>
          <td>${event.location}</td>
          <td>${event.capacity}</td>
          <td>
            <button class="btn rsvp-btn" onclick="handleRSVP('${event.name}')">RSVP</button>
          </td>
        `;
        tableBody.appendChild(row);
      });
    }
  }
  
  // Handle RSVP action
  // Handle RSVP action
// Handle RSVP action
function handleRSVP(eventName) {
    const event = events.find(e => e.name === eventName);
  
    if (event && event.capacity > 0) {
      event.capacity -= 1; // Reduce capacity
  
      // Redirect to RSVP confirmation page
      window.location.href = 'rsvpConfirmation.html'; // Assuming rsvp-confirmation.html is in the same directory
  
      fetchEvents(selectedDate); // Refresh the event list (if needed, after the redirect)
      saveToProfile(event); // Save RSVP'd event to user's profile
    } else {
      // You can handle the case where there are no available seats, if needed
      console.log(`No seats available for ${event.name}.`); // Log to console, but don't alert
    }
  }
  
  
  
  // Save RSVP'd event to user's profile (mock implementation)
  function saveToProfile(event) {
    console.log(`Saving "${event.name}" to user profile...`);
    // Add server-side logic here if needed
  }
  







