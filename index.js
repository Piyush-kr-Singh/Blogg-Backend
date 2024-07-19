require('dotenv').config(); // Add this line to load environment variables

const express = require('express');
const cors = require('cors');
const blogRoutes = require('./routes/blogs');
const connectDb = require('./utils/db');

const app = express();
const PORT = 5000;

const corsOptions = {
    origin: "*", // Allow requests from any origin
    methods: "GET, POST, PUT, PATCH, DELETE, HEAD",
    credentials: true
};

app.use(cors(corsOptions));

app.use(express.json());

app.use('/', (req,res)=>
{
    res.send("Hello World")
})

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
