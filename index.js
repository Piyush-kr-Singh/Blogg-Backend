require('dotenv').config(); // Load environment variables

const express = require('express');
const cors = require('cors');
const blogRoutes = require('./routes/blogs');
const connectDb = require('./utils/db');

const app = express();
const PORT = process.env.PORT || 5000; // Use PORT from env variables if available

// CORS configuration
const corsOptions = {
    origin: "*", // Allow requests from any origin
    methods: "GET, POST, PUT, PATCH, DELETE, HEAD",
    credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());

app.get('/', (req, res) => {
    res.send("Hello World");
});

app.use('/api/blogs', blogRoutes);

connectDb()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running at ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Error connecting to the database:", error);
    });
