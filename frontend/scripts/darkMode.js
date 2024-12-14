document.addEventListener('DOMContentLoaded', () => {
    const toggleDarkModeButton = document.getElementById('toggle-dark-mode');
    const body = document.body;
  
    // Function to update background image based on mode
    const updateBackgroundImage = () => {
      if (body.classList.contains('dark-mode')) {
        body.style.backgroundImage = "url('../assets/image.png')"; // Dark mode image
      } else {
        body.style.backgroundImage = "url('../assets/image1.png')"; // Light mode image
      }
    };
  
    // Check if dark mode is enabled in local storage
    if (localStorage.getItem('darkMode') === 'enabled') {
      body.classList.add('dark-mode');
      toggleDarkModeButton.innerHTML = '<i class="fas fa-sun"></i>';
      updateBackgroundImage();
    }
  
    toggleDarkModeButton.addEventListener('click', () => {
      body.classList.toggle('dark-mode');
      updateBackgroundImage();
  
      // Update the button icon
      if (body.classList.contains('dark-mode')) {
        toggleDarkModeButton.innerHTML = '<i class="fas fa-sun"></i>';
        localStorage.setItem('darkMode', 'enabled');
      } else {
        toggleDarkModeButton.innerHTML = '<i class="fas fa-moon"></i>';
        localStorage.setItem('darkMode', 'disabled');
      }
    });
  
    // Update background image on page load if necessary
    if (body.classList.contains('dark-mode') || !body.classList.contains('dark-mode')) {
      updateBackgroundImage();
    }
  });