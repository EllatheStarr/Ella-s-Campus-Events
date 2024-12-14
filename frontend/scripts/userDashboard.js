document.addEventListener('DOMContentLoaded', async () => {
    // Retrieve user object from local storage
    const user = JSON.parse(localStorage.getItem('user'));

    if (user && user.name) {
        // Set the span's value to the user's name
        document.getElementById('user-id').textContent = user.name;
    } else {
        window.location.href = '../index.html'; 
    }

    // Fetch all RSVPs and count the user's total RSVPs
    try {
        const response = await fetch('/rsvps'); // Assuming this endpoint returns all RSVPs
        if (!response.ok) {
            throw new Error('Failed to fetch RSVPs');
        }

        const rsvps = await response.json();

        // Filter RSVPs based on user ID
        const userRsvps = rsvps.filter(rsvp => rsvp.user._id === user.id);

        // Count the number of RSVPs for the user
        const rsvpCount = userRsvps.length;

        // Display the total RSVP count in the element with id "rsvp-count"
        document.getElementById('rsvp-count').textContent = rsvpCount;
    } catch (error) {
        console.error('Error fetching or counting RSVPs:', error);
    }

    const logoutLink = document.getElementById('logout');

    logoutLink.addEventListener('click', (event) => {
      // Prevent the default action (redirecting to the logout page)
      event.preventDefault();

      // Show a confirmation dialog
      const isConfirmed = confirm("Are you sure you want to log out?");

      if (isConfirmed) {
        // If the user confirms, redirect to the logout page
        window.location.href = logoutLink.href;
      }
    });
});
