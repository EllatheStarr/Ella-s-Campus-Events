document.addEventListener('DOMContentLoaded', () => {
    const rsvpData = [
      {
        title: 'Event Title 1',
        date: 'January 15, 2025',
        time: '6:00 PM',
      },
      {
        title: 'Event Title 2',
        date: 'February 20, 2025',
        time: '9:00 AM',
      },
    ];
  
    const rsvpList = document.querySelector('.rsvp-list');
    rsvpList.innerHTML = ''; // Clear any existing content
  
    rsvpData.forEach(event => {
      const rsvpItem = document.createElement('div');
      rsvpItem.classList.add('rsvp-item');
      
      rsvpItem.innerHTML = `
        <div class="event-details">
          <h3>${event.title}</h3>
          <p><strong>Date:</strong> ${event.date}</p>
          <p><strong>Time:</strong> ${event.time}</p>
        </div>
        <div class="rsvp-actions">
          <button class="btn modify-btn">Modify RSVP</button>
          <button class="btn cancel-btn">Cancel RSVP</button>
        </div>
      `;
  
      rsvpList.appendChild(rsvpItem);
    });
  });
  