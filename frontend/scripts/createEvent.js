document.addEventListener('DOMContentLoaded', async () => {
    const eventForm = document.getElementById('event-form');
    const categorySelect = document.getElementById('event-category');
    const createEventButton = eventForm.querySelector('button');

    // Get user data from localStorage
    const user = JSON.parse(localStorage.getItem('user'));
    console.log('User:', user);

    if (!user || !user.id) {
        alert('User not logged in. Please log in to create events.');
        return;
    }

    // Fetch categories from the server
    try {
        const response = await fetch('/categories');
        if (!response.ok) {
            throw new Error('Failed to fetch categories');
        }
        const categories = await response.json();

        // Populate the categories dropdown
        categories.forEach(category => {
            console.log('Category:', category);
            const option = document.createElement('option');
            option.value = category._id;  // Set the value to category._id (ObjectId)
            option.textContent = category.name;  // Display the category name
            categorySelect.appendChild(option);
        });
    } catch (error) {
        console.error('Error fetching categories:', error);
        alert('There was an error fetching categories.');
    }

    // Handle the form submission
    createEventButton.addEventListener('click', async (event) => {
        event.preventDefault(); // Prevent form from submitting normally

        // Retrieve form data
        const eventName = document.getElementById('event-name').value;
        const eventDate = document.getElementById('event-date').value;
        const eventTime = document.getElementById('event-time').value;
        const eventLocation = document.getElementById('event-location').value;
        const eventDescription = document.getElementById('event-description').value;
        const eventCapacity = parseInt(document.getElementById('event-capacity').value, 10);
        const eventCategory = categorySelect.value; // Get the selected category _id

        // Validate form fields
        if (!eventName || !eventDate || !eventTime || !eventLocation || !eventDescription || !eventCapacity || !eventCategory) {
            alert('Please fill out all fields.');
            return;
        }

        // Validate capacity
        if (eventCapacity <= 0) {
            alert('Capacity must be a positive number.');
            return;
        }

        // Create event object
        const newEvent = {
            name: eventName,
            date: eventDate,
            time: eventTime,
            location: eventLocation,
            description: eventDescription,
            capacity: eventCapacity,
            available_seats: eventCapacity, // Set available_seats equal to capacity
            category: eventCategory,  // Ensure the category is an ObjectId
            created_by: user.id // Use user ID from localStorage
        };

        console.log('New Event:', newEvent);

        // Send the event data to the server to create a new event
        try {
            const createEventResponse = await fetch('/events', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newEvent),
            });

            if (!createEventResponse.ok) {
                const errorResponse = await createEventResponse.json();
                throw new Error(errorResponse.message || 'Failed to create event');
            }

            const createdEvent = await createEventResponse.json();
            alert('Event created successfully!');
            console.log('Created Event:', createdEvent);

        } catch (error) {
            console.error('Error creating event:', error);
            alert('There was an error creating the event.');
        }
    });
});
