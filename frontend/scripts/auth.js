document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const loginButton = document.querySelector('.login-btn');
  
    loginButton.addEventListener('click', async (event) => {
      // Prevent the default form submission
      event.preventDefault();
  
      // Retrieve user inputs (email and password)
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
  
      // Validate input fields
      if (!email || !password) {
        alert('Please enter both email and password.');
        return;
      }
  
      try {
        // Send login request to the backend
        const response = await fetch('/users/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });
  
        // Handle response
        if (!response.ok) {
          throw new Error('Invalid email or password');
        }
  
        const user = await response.json();
  
        // Store the user object in localStorage
        localStorage.setItem('user', JSON.stringify(user.user));
  
        // Redirect user based on their role
        if (user.role === 'admin') {
          window.location.href = '../admin/AdminDashboard.html'; // Admin dashboard
        } else {
          window.location.href = '../user/userDashboard.html'; // User dashboard
        }
      } catch (error) {
        // Display error message
        console.error('Login error:', error);
        alert('Login failed. Please check your credentials.');
      }
    });
  });
  