const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        validate: {
            validator: function(v) {
                const isValid = v != null && v.length > 0 && v.length >= 3 && v.length <= 20;
        
                const isAlphanumeric = /^[a-zA-Z0-9]+$/.test(v);
        
                return isValid && isAlphanumeric;
            },
            message: props => `${props.value} is not a valid username! Must be 3-20 characters long and contain only letters and numbers.`
        }
    },
})

UserSchema.statics.emailExists = async (email)=>{
    return await mongoose.model('Users').findOne({email});
}

module.exports = mongoose.model('Users', UserSchema);