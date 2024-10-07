import express from 'express';
import dotenv from 'dotenv'
import cors from 'cors';

import taskRoute from './route/taskRoute.js';
import connectDB from './database/db.js';


//configrations
const app = express();
app.use(express.json());
app.use(cors({
    origin: process.env.FRONTEND_URL, // Allow requests from this origin
  }));
dotenv.config();

app.use('/task',taskRoute)

const port = process.env.PORT || 8080;

//database connection
connectDB();


//server running
app.listen(port,() => {
    console.log(`Server is running on port ${port}`);
})

