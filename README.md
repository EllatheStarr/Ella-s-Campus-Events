# Ella's Events


## Table of Contents  
1. [Overview](#overview)  
2. [Key Features](#key-features)  
3. [Deployment](#deployment)  
4. [Login Details](#login-details)  
   - [Test User Credentials](#test-user-credentials)  
   - [Test Admin Credentials](#test-admin-credentials)  
5. [Feature Checklist](#feature-checklist)  
6. [Installation Instructions](#installation-instructions)  
7. [API Documentation](#api-documentation)  
   - [User Authentication & Account Management](#user-authentication--account-management)  
   - [Event Management](#event-management)  
   - [RSVP Management](#rsvp-management)  
   - [Category Management (Admin)](#category-management-admin)  
8. [API Testing Screenshots](#api-testing-screenshots)  
   - [Categories](#categories)  
   - [Events](#events)  
   - [RSVP Management](#rsvp-management-1)  
   - [User Management](#user-management)  

   ---
   
## Overview
Ella's Events is a campus event management system designed to streamline the process of event creation, registration, and participation. The system caters to students and staff, providing features like personalized event recommendations, RSVP tracking, and a detailed calendar view.

---

## Key Features
- **User-friendly homepage**: Highlights the application and its benefits.
- **User dashboard**: View registered events and update preferences.
- **Admin dashboard**: Create and manage events, with insights into user preferences and event statistics.
- **Comprehensive event calendar**: Browse and filter events by date and type.
- **Dark mode toggle**: For seamless viewing in low-light environments.
- **Responsive design**: Optimized for all devices.

---

## Deployment
**Live Application Link**: [Ella's Events](https://ella-s-campus-events.onrender.com) 

---

## Login Details
For easy access during testing, use the following credentials:

### Test User Credentials
| Role | Username         | Password  |
|------|------------------|-----------|
| User | j.avril@gmail.com      | june1234  |

### Test Admin Credentials
| Role | Username         | Password  |
|------|------------------|-----------|
| Admin| ella@gmail.com   | password  |

---

## Feature Checklist
| Feature                        | Status         | Description                                                                   |
|--------------------------------|----------------|-------------------------------------------------------------------------------|
| User Registration & Login      | ✅ Completed   | Users can register, log in, and manage their accounts.                       |
| Event Listings with RSVP       | ✅ Completed   | Users can browse events, RSVP, and track their registrations.                |
| Admin Event Management         | ✅ Completed   | Admins can create, update, and delete events.                                |
| Event Calendar View            | ✅ Completed   | Displays events on a calendar with filtering options based on preferences.   |
| User Preferences               | ✅ Completed   | Users can update their event preferences to get personalized recommendations.|
| Dark Mode                      | ✅ Completed   | System-wide dark mode toggle for better accessibility.                       |
| Analytics Dashboard for Admins | ✅ Completed   | Insights into the most popular events and user activity.                     |
| Responsive Design              | ✅ Completed   | Optimized for desktops, tablets, and mobile devices.                         |

---

## Installation Instructions
Follow these steps to run the project locally:

1. **Clone the Repository**:  
   ```bash
   git clone https://github.com/username/ellas-events.git
   ```

2. **Navigate to the Project Directory**:  
   ```bash
   cd ellas-events
   ```

3. **Install Dependencies**:  
   - For Backend:  
     ```bash
     npm install
     ```  
   - For Frontend:  
     ```bash
     npm install
     ```

4. **Run the Project**:  
   - Start Server:  
     ```bash
     npm run dev
     ```

5. **Access the Application**:  
   Open your browser and go to:  
   [https://ella-s-campus-events.onrender.com](https://ella-s-campus-events.onrender.com)

---

## API Documentation

### User Authentication & Account Management
| Endpoint                  | Description                          | Request Type | Example Request                                                                 |
|---------------------------|--------------------------------------|--------------|---------------------------------------------------------------------------------|
| `/api/auth/register`      | Register a new user                 | POST         | `{ "name": "Ella", "email": "ella@example.com", "password": "password123" }`    |
| `/api/auth/login`         | Login an existing user              | POST         | `{ "email": "ella@example.com", "password": "password123" }`                    |
| `/api/auth/logout`        | Logout a user                       | POST         | `{}`                                                                           |
| `/api/users/`             | Get a list of all users (Admin only)| GET          | N/A                                                                             |
| `/api/users/profile`      | Get the current user's profile      | GET          | N/A                                                                             |
| `/api/users/profile/:id`  | Update user profile                 | PUT          | `{ "name": "Ella", "email": "new-email@example.com" }`                          |
| `/api/users/:id`          | Delete a user account (Admin only)  | DELETE       | N/A                                                                             |

---

### Event Management
| Endpoint                | Description                           | Request Type | Example Request                                                               |
|-------------------------|---------------------------------------|--------------|-------------------------------------------------------------------------------|
| `/api/events`           | Create a new event (Admin only)      | POST         | `{ "name": "Workshop", "date": "2024-12-01", "time": "10:00 AM", "location": "Building A", "capacity": 50 }` |
| `/api/events`           | Get all events                       | GET          | N/A                                                                           |
| `/api/events/:id`       | Get event details by ID              | GET          | N/A                                                                           |
| `/api/events/:id`       | Update an event (Admin only)         | PUT          | `{ "name": "Updated Workshop", "date": "2024-12-05", "capacity": 60 }`        |
| `/api/events/:id`       | Delete an event (Admin only)         | DELETE       | N/A                                                                           |
| `/api/events/:id/:field`| Update individual fields of an event | PATCH        | `{ "field": "capacity", "value": 55 }`                                        |

---

### RSVP Management
| Endpoint          | Description                    | Request Type | Example Request                        |
|-------------------|--------------------------------|--------------|----------------------------------------|
| `/api/rsvps`      | Create a new RSVP             | POST         | `{ "userId": "1", "eventId": "2" }`    |
| `/api/rsvps`      | Get all RSVPs (Admin only)    | GET          | N/A                                    |
| `/api/rsvps/:id`  | Get an RSVP by ID            | GET          | N/A                                    |
| `/api/rsvps/:id`  | Update an RSVP               | PUT          | `{ "status": "canceled" }`             |
| `/api/rsvps/:id`  | Delete an RSVP               | DELETE       | N/A                                    |

---

### Category Management (Admin)
| Endpoint               | Description                  | Request Type | Example Request                       |
|------------------------|------------------------------|--------------|---------------------------------------|
| `/api/categories`      | Get all event categories    | GET          | N/A                                   |
| `/api/categories/:id`  | Get a category by ID        | GET          | N/A                                   |
| `/api/categories`      | Create a new event category | POST         | `{ "name": "Seminar" }`               |
| `/api/categories/:id`  | Update an event category    | PUT          | `{ "name": "New Category Name" }`     |
| `/api/categories/:id`  | Delete a category           | DELETE       | N/A                                   |

---

Here is the full **API Testing Screenshots** section written in Markdown format, with inline references to your images.

---

# API Testing Screenshots

## Categories  
Endpoints for managing event categories.

- **Create a New Category**  
  ![Create a New Category](./backend/API%20Screenshots/Categories/Create%20a%20new%20category.png)

- **Delete a Category**  
  ![Delete a Category](./backend/API%20Screenshots/Categories/Delete%20a%20category.png)

- **Get a Single Category by ID**  
  ![Get a Single Category](./backend/API%20Screenshots/Categories/Get%20a%20single%20category%20by%20id.png)

- **Get All Categories**  
  ![Get All Categories](./backend/API%20Screenshots/Categories/Get%20all%20categories.png)

- **Update an Existing Category**  
  ![Update a Category](./backend/API%20Screenshots/Categories/Update%20an%20existing%20category.png)

---

## Events  
Endpoints for creating, retrieving, updating, and deleting events.

- **Create a New Event**  
  ![Create New Event](./backend/API%20Screenshots/Events/Create%20New%20Event.png)

- **Delete an Event**  
  ![Delete an Event](./backend/API%20Screenshots/Events/Delete%20an%20event.png)

- **Get a Single Event by ID**  
  ![Get a Single Event](./backend/API%20Screenshots/Events/Get%20a%20single%20event%20by%20id.png)

- **Get All Events**  
  ![Get All Events](./backend/API%20Screenshots/Events/Get%20all%20events.png)  
  ![Get All Events 2](./backend/API%20Screenshots/Events/Get%20all%20events%202.png)  
  ![Get All Events 3](./backend/API%20Screenshots/Events/Get%20all%20events%203.png)

- **Update an Event**  
  ![Update an Event](./backend/API%20Screenshots/Events/Update%20an%20event.png)

---

## RSVP Management  
Endpoints for managing RSVPs to events.

- **Delete an RSVP**  
  ![Delete an RSVP](./backend/API%20Screenshots/RSVP'S/Delete%20an%20RSVP.png)

- **Get a Single RSVP by ID**  
  ![Get a Single RSVP](./backend/API%20Screenshots/RSVP'S/Get%20a%20single%20rsvp%20by%20id.png)

- **Get All RSVPs**  
  ![Get All RSVPs](./backend/API%20Screenshots/RSVP'S/Get%20all%20rsvps.png)  
  ![Get All RSVPs 2](./backend/API%20Screenshots/RSVP'S/Get%20all%20rsvps%202.png)

---

## User Management  
Endpoints for managing user accounts.

- **Get All Users**  
  ![Get All Users](./backend/API%20Screenshots/Users/Get%20all%20users.png)  
  ![Get All Users 2](./backend/API%20Screenshots/Users/Get%20all%20users%202.png)

- **Register a New User**  
  ![Register a New User](./backend/API%20Screenshots/Users/Register%20a%20new%20user.png)

- **Login a User**  
  ![Login a User](./backend/API%20Screenshots/Users/Login%20a%20user.png)

- **Logout a User**  
  ![Logout a User](./backend/API%20Screenshots/Users/Logout%20a%20user.png)

- **Update User Profile**  
  ![Update User Profile](./backend/API%20Screenshots/Users/Update%20user%20profile.png)

---

## Core Functionalities

1. **User Authentication**
   - Users can register, log in, log out, and manage their profiles.
   - Admins have access to view and manage user accounts.

2. **Event Management**
   - Admins can create, update, and delete events.
   - Users can view all events and RSVP to them.

3. **RSVP Management**
   - Users can RSVP to events.
   - Admins can view or manage all RSVPs.
   - RSVP reduces the available seats for the event.

4. **Event Preferences & Filtering**
   - Users can set preferences for event types and filter events accordingly.

5. **Admin Statistics**
   - Admins can view statistics such as the most popular event (the one with the most RSVPs).

---

## API Testing
Postman screenshots can be found in the `backend` folder under `API screenshots`.

---

## Technologies Used
- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Deployment**: Render
