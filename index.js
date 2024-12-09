require('dotenv').config();
const express = require('express');
const cors=require('cors');

require('./DB/connection');
const userRouter = require('./routes/userRoutes');
const profileRouter = require('./routes/profileRoutes');
const blogRouter = require('./routes/blogRoutes');

const app = express();
app.use(cors());
app.use(express.json());
app.use(userRouter);
app.use(profileRouter);
app.use(blogRouter);

app.use(express.static('./uploads'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
