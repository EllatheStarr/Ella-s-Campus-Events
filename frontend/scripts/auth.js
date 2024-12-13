// Simple login and registration functions (this can be replaced with actual logic for authentication)
function loginUser() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    alert(`Logged in as ${email}`);
}

function registerUser() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const preferences = Array.from(document.getElementById('preferences').selectedOptions).map(option => option.value);
    
    alert(`Registered as ${name} with preferences: ${preferences.join(', ')}`);
}
