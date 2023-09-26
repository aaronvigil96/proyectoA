import 'dotenv/config';
import express from 'express';
import cookieParser from 'cookie-parser';
import authRoute from './v1/routes/authRoute.js';
import userRoute from './v1/routes/userRoute.js';

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/user", userRoute);

app.listen(process.env.PORT, () => {
    console.log(`Server running in port: ${process.env.PORT}`);
});