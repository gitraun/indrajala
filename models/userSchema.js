const mongoose = require('mongoose');
const argon2 = require('argon2');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    phoneNumber:{
        type:String,
        required: true
    },
    photo:{
        type: String,
        required:true
    }
});

userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        return next();  
    }
    try {
        const hash = await argon2.hash(this.password);
        this.password = hash;
        next();
    } catch (error) {
        console.log(error);
        return next(error);
    }
});

userSchema.methods.comparePassword = async function(candidatePassword){
    try{
        return await argon2.verify(this.password, candidatePassword);
    }catch(error){
        throw new Error(error);
    }
}

const user = mongoose.model('user', userSchema);

module.exports = user;