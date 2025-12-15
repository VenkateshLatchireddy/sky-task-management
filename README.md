# Task Management System

A role-based task management application built with React, Vite, and localStorage.

## Features

### Admin Role
- Create new tasks with title, description, and assignee
- View all tasks in the system
- Drag and drop tasks to reassign them to different users
- Dashboard statistics

### User Role
- View assigned tasks
- Mark tasks as completed
- See task status and details

### General
- Persistent data storage using localStorage
- Role-based access control
- Clean and intuitive UI
- Responsive design

## Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone or download the project
2. Navigate to the project directory:

```bash
cd sky-task-management



```

3. Install dependencies:
```bash
npm install


``` 
4. Start the development server:

```bash 
npm run dev


```
# Login Credentials

## Admin


Username: admin

Password: admin123

Permissions: Create tasks, reassign tasks, view all tasks


# Users

## User 1


Username: venky

Password: venky123

Name: venky


# Users

## User 2

Username: sky

Password: sky123

Name: sumitra 




# How to Use

## For Admin

1. Login with admin credentials

2. Create new tasks using the form on the left

3. To reassign tasks:

      Drag a task from the task list

      Drop it on a user card

      The task will be automatically reassigned


## For Users

      Login with user credentials

      View your assigned tasks

      Click "Mark Complete" to update task status

      Completed tasks will be highlighted in green


   #  Project Structure

   ```

   src/
├── components/
│   ├── LoginForm.jsx      # Login component
│   ├── Header.jsx         # Navigation header
│   ├── TaskForm.jsx       # Task creation form (Admin)
│   ├── TaskItem.jsx       # Draggable task item (Admin)
│   ├── UserDropZone.jsx   # User drop zone for reassignment
│   ├── AdminDashboard.jsx # Admin dashboard layout
│   └── UserDashboard.jsx  # User dashboard layout
├── utils/
│   └── storage.js         # localStorage helper functions
├── App.jsx                # Main app component
├── main.jsx               # App entry point
└── index.css              # Global styles



```

# Persistence


All data (tasks, users, current session) is stored in the browser's localStorage. This means:


   Data persists across page refreshes

   Data is specific to each browser

   Clearing browser data will reset the application


# Technologies Used 

   React 18

   Vite

   React DnD

   localStorage


##  Available Scripts


```
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint

```

## Browser Support

The application works on all modern browsers that support:

ES6+ JavaScript

localStorage API

CSS Grid and Flexbox