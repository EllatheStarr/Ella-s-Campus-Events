// Function to fetch all RSVPs and compare with logged-in user ID
async function fetchAndDisplayRsvps() {
  try {
    // Get user data from localStorage
    const user = JSON.parse(localStorage.getItem('user')); // Assuming the user object is stored in localStorage
    
    if (!user || !user.id) {
      console.error('User is not logged in or user ID is missing.');
      return;
    }

    // Fetch all RSVPs (assuming an API endpoint like /rsvps that returns all RSVPs)
    const response = await fetch('/rsvps');
    if (!response.ok) {
      throw new Error('Failed to fetch RSVPs');
    }
    
    const rsvps = await response.json();
    
    // Filter RSVPs based on user ID
    const userRsvps = rsvps.filter(rsvp => rsvp.user._id === user.id);

    // Get the container for displaying RSVPs
    const rsvpContainer = document.querySelector('.rsvp-summary');

    // Check if there are RSVPs for the user
    if (userRsvps.length === 0) {
      rsvpContainer.innerHTML = '<p>No RSVPs found.</p>';
      return;
    }

    // Clear any existing RSVP items in case of page reload
    rsvpContainer.innerHTML = '<h1>Your RSVPs</h1>';

    // Loop through the filtered RSVPs and display them dynamically
    userRsvps.forEach(rsvp => {
      const rsvpItem = document.createElement('div');
      rsvpItem.classList.add('rsvp-item');

      const eventDetails = document.createElement('div');
      eventDetails.classList.add('event-details');

      const eventTitle = document.createElement('h3');
      eventTitle.textContent = rsvp.event.name; 

      const eventDate = document.createElement('p');
      eventDate.innerHTML = `<strong>Date:</strong> ${new Date(rsvp.event.date).toLocaleDateString()}`;

      const eventTime = document.createElement('p');
      eventTime.innerHTML = `<strong>Time:</strong> ${new Date(rsvp.event.date).toLocaleTimeString()}`;

      // Append event details to rsvpItem
      eventDetails.appendChild(eventTitle);
      eventDetails.appendChild(eventDate);
      eventDetails.appendChild(eventTime);
      rsvpItem.appendChild(eventDetails);

      // Append rsvpItem to the container
      rsvpContainer.appendChild(rsvpItem);
    });

  } catch (error) {
    console.error('Error fetching or displaying RSVPs:', error);
  }
}

// Call the function to load RSVPs when the page loads
fetchAndDisplayRsvps();

document.addEventListener('DOMContentLoaded', async () => {
  // Retrieve user object from local storage
  const user = JSON.parse(localStorage.getItem('user'));

  if (user) {
    // Add code here if needed
    } else {
      window.location.href = '../index.html'; 
    }
  });
