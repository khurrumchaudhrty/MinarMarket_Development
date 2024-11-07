// const express = require('express');
// const cors = require('cors'); // Import cors
// const app = express();
// const PORT = 5000;

// app.use(cors()); // Use cors
// app.use(express.json());

// // Dummy database
// let users = [];

// // Simple login logic
// app.post('/login', (req, res) => {
//     const { username, password } = req.body;

//     console.log('Login attempt with username:', username); // Log username

//     const mockUsername = 'user';
//     const mockPassword = 'pass';

//     if (username === mockUsername && password === mockPassword) {
//         res.status(200).json({ message: 'Login successful' });
//     } else {
//         res.status(401).json({ message: 'Invalid username or password' });
//     }
// });

// // Simple signup logic
// app.post('/signup', (req, res) => {
//     const { username, password } = req.body;

//     // Check for existing user
//     const existingUser = users.find(user => user.username === username);
//     if (existingUser) {
//         return res.status(400).json({ message: 'Username already exists' });
//     }

//     // Add user to "database"
//     users.push({ username, password });

//     console.log('Users array after signup:', users); // Simple console log


//     res.status(201).json({ message: 'Signup successful' });
// });

// app.listen(PORT, () => {
//     console.log(`Backend server is running on http://localhost:${PORT}`);
// });




const databaseConnect = require('./config/databaseConnect');
const dotEnv = require('dotenv');
const server = require('./app');

// Setting upp the environment variables
dotEnv.config({ path: './config/config.env' });

// Connect to the database
databaseConnect();

server.listen(process.env.SERVER_PORT, () => {
    console.log(`Server started on PORT: ${process.env.SERVER_PORT}`);
});