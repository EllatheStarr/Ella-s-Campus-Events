document.addEventListener('DOMContentLoaded', () => {
    const calendarEl = document.getElementById('calendar');
    const calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: 'dayGridMonth',
      events: [
        { title: 'Meeting', start: '2024-12-12', description: 'Team meeting at HQ' },
        { title: 'Hackathon', start: '2024-12-20', end: '2024-12-22', description: 'Coding competition' },
      ],
      eventClick: (info) => {
        alert(`Event: ${info.event.title}\nDetails: ${info.event.extendedProps.description}`);
      },
    });
    calendar.render();
  });
  
  // Dark Mode Toggle
  const darkModeToggle = document.getElementById('toggle-dark-mode');
  darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
  });
  