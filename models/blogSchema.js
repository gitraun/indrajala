const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'user',
        required: true
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    image:{
        type:String
    }
});

const blog = mongoose.model('blog', blogSchema);

module.exports = blog;
