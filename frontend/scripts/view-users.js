document.addEventListener('DOMContentLoaded', async () => {
    const userListContainer = document.getElementById('user-list');
  
    try {
      // Fetch all users from the backend
      const response = await fetch('/users'); // Replace with your actual API URL
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
  
      // Parse the JSON response
      const data = await response.json();
  
      // Check if data is an array or an object containing an array
      const users = Array.isArray(data) ? data : data.users || [];
  
      // Dynamically create and insert table rows for each user
      if (users.length === 0) {
        userListContainer.innerHTML = '<tr><td colspan="4">No users found.</td></tr>';
      } else {
        users.forEach(user => {
          const userRow = document.createElement('tr');
  
          userRow.innerHTML = `
            <td>${user._id}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>
              <button class="btn delete-btn" data-id="${user._id}">Delete</button>
            </td>
          `;
  
          // Append the user row to the table body
          userListContainer.appendChild(userRow);
        });
      }
  
      // Event listener for Delete button
      document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', async (e) => {
          const userId = e.target.getAttribute('data-id');
          try {
            // Send DELETE request to delete the user
            const deleteResponse = await fetch(`/users/${userId}`, {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
              },
            });
  
            if (!deleteResponse.ok) {
              throw new Error('Failed to delete user');
            }
  
          
            location.reload();  
          } catch (error) {
            console.error('Error deleting user:', error);
            alert('Failed to delete the user. Please try again later.');
          }
        });
      });
  
    } catch (error) {
      console.error('Error fetching users:', error);
      userListContainer.innerHTML = '<tr><td colspan="4">Failed to load users. Please try again later.</td></tr>';
    }
  });
  