const mongoose =require('mongoose');
const { Schema } = mongoose;
//Object based
const UserSchema = new Schema(
    //Object
    {
//values
    name:{
        type:String,
        required:true//necessary
    },
    email:{
        type:String,
        required:true,
        unique:true
    },

    password:{
        type:String,
        required:true,
    },
    date:{
        type:Date,
        deafult:Date.now//function (dont put function over here?)
    }

});

module.exports= mongoose.model('User', UserSchema);