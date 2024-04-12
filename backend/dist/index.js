// External imports
import express from 'express';
import { config } from "dotenv";
import bodyParser from "body-parser";
import { rateLimit } from 'express-rate-limit';
// Internal imports
import dataroute from "./routes/data/index.js";
import auth from "./routes/AuthRoute/index.js";
import usersroute from "./routes/users/index.js";
import verifications from "./routes/verificationsRoute/index.js";
import connectDB from "./database/connection.js";
config();
const app = express();
connectDB();
app.use(bodyParser({
    limit: "50mb"
}));
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Replace with your allowed origin
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS'); // Allowed HTTP methods
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Allowed headers
    next();
});
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // Limit each IP to 10 requests per window
    message: 'Too many requests from this IP, please try again after 15 minutes',
});
app.use(apiLimiter);
app.use("/get", dataroute);
app.use("/auth", auth);
app.use("/verify", verifications);
app.use("/users", usersroute);
app.all("*", (req, res) => {
    res.status(401).send(`
    <html>
  `);
});
// Global error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    return res.status(500).send('Something broke!');
});
const port = process.env.BACKEND_PORT;
app.listen(port, async () => {
    try {
        await connectDB();
        console.log(`Server is running on port ${port}`);
    }
    catch (error) {
        console.error('Failed to connect to the database', error);
        process.exit(1);
    }
});
