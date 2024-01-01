# Marvel Comics Recommender

## Project Overview
The Marvel Comics Recommender is a web application designed to provide personalized comic book recommendations from the Marvel universe. It allows users to search for comics featuring their favorite characters and filter results based on release date ranges. This project showcases a full-stack development approach, integrating a React frontend with a Node.js/Express backend and a PostgreSQL database.

## Usage
* Explore the Marvel Comics universe by searching for characters.
* Filter comics based on release dates.
* Sign up and log in to save your favorite comics to a wishlist.
* View detailed comic information including descriptions and cover images.

## Technologies Used
* Frontend: React.js, CSS
* Backend: Node.js, Express
* Database: PostgreSQL
* Authentication: bcrypt, JSON Web Tokens (JWT)
* API: Marvel Comics API

## Local Setup Instructions
1. **Clone the Repository**
```
git clone https://github.com/your-username/marvel-comics-recommender.git
cd marvel-comics-recommender
```
###
2. **Set Up the Backend**
* Navigate to the backend directory and install dependencies:
```
cd backend
npm install
```
* Create a PostgreSQL database and execute the following SQL commands to set up the required tables:
```  
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE wishlist (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    comic_id INTEGER NOT NULL,
    comic_data JSONB NOT NULL,
    FOREIGN KEY (username) REFERENCES users(username)
);
```

* Create a '.env' file in the backend directory with the following content:
```
DATABASE_URL=postgres://YourDbUser:YourDbPassword@localhost/YourDbName
JWT_SECRET=YourSecretKey
```

* Start the backend server:
```
npm start
```
###
3. **Set Up the Frontend**
* In a new terminal, navigate to the frontend directory from the root of the project and install dependencies:
```
cd ../frontend
npm install
```
* Create a .env file in the frontend directory with the following content:
```
REACT_APP_BACKEND_URL=http://localhost:3001
REACT_APP_MARVEL_PUBLIC_KEY=YourMarvelAPIPublicKey
REACT_APP_MARVEL_PRIVATE_KEY=YourMarvelAPIPrivateKey
```

* Start the frontend application:
```
npm start
```

