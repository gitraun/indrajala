const mongoose = require('mongoose');

const connectionString = process.env.DATABASE_URL;

mongoose.connect(connectionString).then((res)=>{
    console.log('Database connected successfully');
}).catch((err)=>{
    console.log('Error connecting to database');
    console.log(err);
});