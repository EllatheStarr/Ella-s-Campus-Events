  document.addEventListener('DOMContentLoaded', async () => {
    const eventListContainer = document.getElementById('event-list');

    try {
      // Fetch all events from the backend
      const response = await fetch('/events'); 
      if (!response.ok) {
        throw new Error('Failed to fetch events');
      }

      // Parse the JSON response
      const events = await response.json();

      // Dynamically create and insert event cards for each event
      events.forEach(event => {
        const eventCard = document.createElement('div');
        eventCard.classList.add('event-card');

        eventCard.innerHTML = `
          <h3>${event.name}</h3>
          <p>Date: <span>${new Date(event.date).toLocaleDateString()}</span></p>
          <p>Location: <span>${event.location}</span></p>
          <p>Capacity: <span>${event.capacity}</span></p>
          <button class="btn delete-btn" data-id="${event._id}">Delete</button>
        `;

        // Append the event card to the container
        eventListContainer.appendChild(eventCard);
      });

      document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', async (e) => {
          const eventId = e.target.getAttribute('data-id');
          try {
            // Send DELETE request to delete the event
            const deleteResponse = await fetch(`http://localhost:3000/events/${eventId}`, {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
              },
            });

            if (!deleteResponse.ok) {
              throw new Error('Failed to delete event');
            }

            // Reload the page after successful deletion
            location.reload();  // Reloads the page to reflect the changes
          } catch (error) {
            console.error('Error deleting event:', error);
            alert('Failed to delete the event. Please try again later.');
          }
        });
      });
   
    } catch (error) {
      console.error('Error fetching events:', error);
      eventListContainer.innerHTML = '<p>Failed to load events. Please try again later.</p>';
    }
  });

