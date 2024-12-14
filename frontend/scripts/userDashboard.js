document.addEventListener('DOMContentLoaded', () => {
    // Retrieve user object from local storage
    const user = JSON.parse(localStorage.getItem('user'));

    if (user && user.name) {
        // Set the span's value to the user's name
        document.getElementById('user-id').textContent = user.name;
    } else {
        console.error('User object not found in local storage or user name is missing.');
    }
});
