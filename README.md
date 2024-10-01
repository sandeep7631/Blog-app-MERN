# Blog App (MERN)

This is a full-stack Blog Application built using the MERN stack (MongoDB, Express, React, Node.js). Users can create, edit, delete, and view blog posts. The app also includes user authentication and authorization features.

## Features

- **User Authentication**: Sign up and log in functionality using JWT (JSON Web Tokens).
- **Create, Read, Update, Delete (CRUD) Blogs**: Logged-in users can create, update, and delete their own blogs.
- **User Profile**: Each user has a profile where they can manage their blog posts.
- **Responsive Design**: The app is fully responsive and works across all devices.

## Technologies Used

### Frontend:
- **React.js**: For building the user interface.
- **Axios**: For making HTTP requests to the backend.
- **React Router**: For routing between different pages.
- **Bootstrap/CSS**: For styling and responsive design.

### Backend:
- **Node.js**: Backend runtime environment.
- **Express.js**: Backend framework to handle HTTP requests.
- **MongoDB**: NoSQL database to store blog data.
- **Mongoose**: Object Data Modeling (ODM) for MongoDB and Node.js.
- **JWT**: For user authentication and authorization.

## Installation

To run the application locally, follow these steps:

1. **Clone the repository**:
    ```bash
    git clone https://github.com/sandeep7631/Blog-app-MERN.git
    ```

2. **Navigate to the project directory**:
    ```bash
    cd Blog-app-MERN
    ```

3. **Install server dependencies**:
    ```bash
    cd server
    npm install
    ```

4. **Install client dependencies**:
    ```bash
    cd ../client
    npm install
    ```

5. **Set up environment variables**:
    Create a `.env` file in the `server` directory and add the following:
    ```bash
    MONGO_URI=<your-mongodb-uri>
    JWT_SECRET=<your-jwt-secret>
    ```

6. **Run the application**:
    From the root of the project, run:
    ```bash
    npm run dev
    ```

7. **Access the app**:
    Open [http://localhost:3000](http://localhost:3000) in your browser.

## Folder Structure

```
Blog-app-MERN/
│
├── client/                 # Frontend (React.js)
│   ├── public/             # Public assets
│   └── src/                # React components, pages, and assets
│
└── server/                 # Backend (Node.js, Express, MongoDB)
    ├── config/             # Configuration files (e.g., database connection)
    ├── controllers/        # Controller functions for the routes
    ├── models/             # Mongoose models (User, Blog)
    ├── routes/             # API routes
    └── server.js           # Entry point for the backend server
```

## API Endpoints

- **POST** `/api/auth/register` - Register a new user
- **POST** `/api/auth/login` - Log in an existing user
- **GET** `/api/blogs` - Get all blog posts
- **POST** `/api/blogs` - Create a new blog post
- **PUT** `/api/blogs/:id` - Update a blog post
- **DELETE** `/api/blogs/:id` - Delete a blog post

## License

This project is licensed under the MIT License.
