document.addEventListener('DOMContentLoaded', async () => {
    const preferencesForm = document.getElementById('preferences-form');
    const fieldset = preferencesForm.querySelector('fieldset');
    const saveButton = preferencesForm.querySelector('button[type="button"]');

    // Retrieve user object from local storage
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || !user.id || !user.preferences) {
        console.error('User not found in local storage or invalid user object.');
        alert('Error: User not authenticated.');
        return;
    }

    // Fetch categories and populate fieldset
    async function fetchCategories() {
        try {
            const response = await fetch('/categories'); // Adjust endpoint if necessary
            if (!response.ok) {
                throw new Error(`Failed to fetch categories: ${response.statusText}`);
            }
            const categories = await response.json();
            populateFieldset(categories, user.preferences);
        } catch (error) {
            console.error('Error fetching categories:', error);
            alert('Error loading categories.');
        }
    }

    // Populate fieldset with categories
    function populateFieldset(categories, userPreferences) {
        fieldset.innerHTML = ''; // Clear existing options
        categories.forEach(category => {
            const label = document.createElement('label');
            const checkbox = document.createElement('input');

            checkbox.type = 'checkbox';
            checkbox.name = 'preferences';
            checkbox.value = category._id; // Use category ID for backend updates
            checkbox.id = category._id;

            // Automatically check if user's preferences include this category
            const isSelected = userPreferences.some(pref => pref.category === category._id);
            checkbox.checked = isSelected;

            label.appendChild(checkbox);
            label.appendChild(document.createTextNode(` ${category.name}`));
            fieldset.appendChild(label);
        });
    }

    // Update user preferences locally and on the backend
    async function updatePreferences() {
        const selectedPreferences = [];
        const checkboxes = document.querySelectorAll('input[name="preferences"]:checked');
        checkboxes.forEach(checkbox => {
            selectedPreferences.push({ category: checkbox.value });
        });

        // Update local user object
        user.preferences = selectedPreferences;
        localStorage.setItem('user', JSON.stringify(user));

        // Send updated preferences to the backend
        try {
            const response = await fetch(`/users/profile/${user.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ preferences: selectedPreferences }),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || 'Failed to update preferences');
            }

            const updatedUser = await response.json();
            console.log('Preferences updated successfully:', updatedUser);
            alert('Preferences saved successfully!');
        } catch (error) {
            console.error('Error updating preferences:', error);
            alert('Failed to save preferences. Please try again later.');
        }
    }

    // Attach event listener to save button
    saveButton.addEventListener('click', updatePreferences);

    // Fetch categories and initialize form
    await fetchCategories();
});
