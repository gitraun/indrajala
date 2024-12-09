const mongoose = require('mongoose');
const profileSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'user',
        required: true
    },
    address:{
        type: String
    },
    briefDescription:{
        type:String
    },
    detailedDescription:{
        type:String
    },
    favouriteItems:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'blog'
        }
    ]
}, {
    timestamps: true
});

const profile = mongoose.model('profile', profileSchema);

module.exports = profile;