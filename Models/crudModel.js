const mongoose = require('mongoose');

const crudSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true,
    },
})


module.exports = mongoose.model('CRUD',crudSchema);