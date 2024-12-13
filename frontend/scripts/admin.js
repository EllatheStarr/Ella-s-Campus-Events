// Function to toggle dark mode
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}

// Example of dynamically adding event list and user list
function loadDashboardData() {
    // Example data
    const events = [
        { id: 1, title: 'JavaScript Workshop', date: '2024-12-15' },
        { id: 2, title: 'Cybersecurity Seminar', date: '2024-12-17' }
    ];
    const users = [
        { id: 1, name: 'Alice', email: 'alice@example.com' },
        { id: 2, name: 'Bob', email: 'bob@example.com' }
    ];

    // Update event list
    const eventList = document.getElementById('event-list');
    events.forEach(event => {
        const eventItem = document.createElement('div');
        eventItem.classList.add('event-item');
        eventItem.innerHTML = `<h3>${event.title}</h3><p>${event.date}</p><button onclick="editEvent(${event.id})">Edit</button><button onclick="deleteEvent(${event.id})">Delete</button>`;
        eventList.appendChild(eventItem);
    });

    // Update user list
    const userList = document.getElementById('user-list');
    users.forEach(user => {
        const userItem = document.createElement('div');
        userItem.classList.add('user-item');
        userItem.innerHTML = `<h3>${user.name}</h3><p>${user.email}</p><button onclick="viewUser(${user.id})">View</button><button onclick="deleteUser(${user.id})">Delete</button>`;
        userList.appendChild(userItem);
    });

    // Update stats
    document.getElementById('total-events').textContent = events.length;
    document.getElementById('total-users').textContent = users.length;
}

// Example of adding a new event
function addEvent() {
    // Open a form or modal to add an event (you can implement further logic)
    alert('Adding new event...');
}

// Example of editing an event
function editEvent(eventId) {
    // Edit event logic (you can implement this with a modal or a new page)
    alert(`Editing event with ID: ${eventId}`);
}

// Example of deleting an event
function deleteEvent(eventId) {
    // Delete event logic (you can implement the logic to remove the event)
    alert(`Deleting event with ID: ${eventId}`);
}

// Example of viewing user details
function viewUser(userId) {
    // View user logic
    alert(`Viewing user with ID: ${userId}`);
}

// Example of deleting a user
function deleteUser(userId) {
    // Delete user logic
    alert(`Deleting user with ID: ${userId}`);
}

// Load dashboard data when the page loads
document.addEventListener('DOMContentLoaded', loadDashboardData);
