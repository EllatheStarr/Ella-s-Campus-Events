async function fetchCategories() {
    try {
        // Replace with your actual API endpoint to fetch categories
        const response = await fetch('/categories');
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const categories = await response.json(); 
        console.log('Categories:', categories);
        populateCategories(categories);
    } catch (error) {
        console.error('Failed to fetch categories:', error);
    }
}

function populateCategories(categories) {
    const container = document.getElementById('preferencesContainer');
    container.innerHTML = ''; // Clear existing content

    categories.forEach(category => {
        const label = document.createElement('label');
        const checkbox = document.createElement('input');

        checkbox.type = 'checkbox';
        checkbox.name = 'preferences';
        checkbox.value = category._id; 
        checkbox.id = category._id;  

        label.appendChild(checkbox);
        label.appendChild(document.createTextNode(` ${category.name}`));
        container.appendChild(label);
    });
}

// Fetch categories when the page loads
document.addEventListener('DOMContentLoaded', fetchCategories);

async function registerUser() {
    try {
        // Collect user input
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();
        const preferences = [];

        // Gather selected preferences
        const checkboxes = document.querySelectorAll('input[name="preferences"]:checked');
        checkboxes.forEach(checkbox => {
            preferences.push({ category: checkbox.value }); // Format as array of objects
        });

        // Construct the user data object
        const userData = {
            name,
            email,
            password,
            preferences, // Matches the backend model
        };

        console.log('Registering user:', userData); // Debugging log

        // Send the data to the backend
        const response = await fetch('/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        // Handle response
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Error registering user');
        }

        const result = await response.json();
        console.log('User registered successfully:', result);
        console.log('User object:', result.user);

        // Store the user object in local storage
        localStorage.setItem('user', JSON.stringify(result.user));

        // Redirect based on user role
        if (result.user.role === 'admin') {
            alert('Registration successful! Redirecting to admin dashboard.');
            window.location.href = '../admin/AdminDashboard.html';
        } else {
            alert('Registration successful! Redirecting to user dashboard.');
            window.location.href = '../user/userDashboard.html';
        }
    } catch (error) {
        console.error('Error registering user:', error);
        alert('Registration failed: ' + error.message);
    }
}
