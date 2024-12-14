document.addEventListener('DOMContentLoaded', async () => {
  // Retrieve user object from local storage
  const user = JSON.parse(localStorage.getItem('user'));
  console.log('User object:', user);

  if (user && user.name) {
      // Set the span's value to the user's name
      document.getElementById('user-id').textContent = user.name;
  } else {
      window.location.href = '../index.html'; 
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
