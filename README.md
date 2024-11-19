# InstaSchooler

InstaSchooler is a web application designed for school management, allowing students, teachers, and administrators to interact with a variety of features, including account management, student and teacher information, reservations, and more.

## Features

- **Student Management:** Allows students to create accounts, update profiles, view courses, and more.
- **Teacher Management:** Manages teacher profiles and associated information.
- **Admin Dashboard:** Admin users can manage students, teachers, and events.
- **Email Notifications:** Sends email notifications for account creation and other relevant actions.
- **Profile Management:** Users can manage their profiles, including updating personal information and deactivating their accounts.

## Technologies Used

### Backend

- **Node.js**: JavaScript runtime used to build the backend.
- **NestJS**: A progressive Node.js framework for building efficient and scalable server-side applications.
- **MongoDB**: NoSQL database used for storing user, teacher, and student data.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB and Node.js.
- **JWT (JSON Web Tokens)**: Used for user authentication and authorization.
- **Bcrypt**: A library to hash passwords before saving them to the database.
- **Nodemailer**: Used for sending email notifications.

### Frontend

- **Angular.js**: JavaScript library for building user interfaces.
- **CSS**: Styling for the frontend.

## Installation

### Clone the Repository

To get started, clone the repository to your local machine:

```bash
git clone https://github.com/YourUsername/InstaSchooler.git
cd InstaSchooler
### Backend Setup

1.  bashCopy codecd apinpm install
    
2.  Ensure you have a .env file in the api directory with the necessary configurations. Example:makefileCopy codeMONGO\_URI=mongodb://localhost:27017/instaschoolerJWT\_SECRET=your\_jwt\_secret\_keyEMAIL\_USER=your\_email@example.comEMAIL\_PASS=your\_email\_password
    
3.  bashCopy codenpm run startThis will start the backend server on the default port, usually 3000.
    

### Frontend Setup

1.  bashCopy codecd clientnpm install
    
2.  bashCopy codenpm startThis will start the frontend development server and should automatically open the application in your default web browser.
    

API Documentation
-----------------

The backend API is built using NestJS and follows RESTful principles. You can refer to the API documentation for details on how to interact with the system.

### Example Routes

*   **POST** /auth/login: Login with email and password.
    
*   **GET** /students: Get a list of all students.
    
*   **POST** /students: Create a new student.
    
*   **PUT** /students/:id: Update student information.
    
*   **DELETE** /students/:id: Delete a student.
    

Contributing
------------

Contributions are welcome! If you have ideas for new features, improvements, or bug fixes, feel free to submit an issue or create a pull request.

### How to Contribute

1.  Fork the repository.
    
2.  Create a new branch (git checkout -b feature/your-feature).
    
3.  Commit your changes (git commit -am 'Add new feature').
    
4.  Push to the branch (git push origin feature/your-feature).
    
5.  Create a new Pull Request.