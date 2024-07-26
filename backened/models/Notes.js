import mongoose from 'mongoose';

//Object based
const NotesSchema = new Schema(
    //Object
    {
//values
    title:{
        type:String,
        required:true//necessary
    },
    description:{
        type:String,
        required:true,
    },

    tag:{
        type:String,
        deafult:"General"
    },
    date:{
        type:Date,
        deafult:Date.now//function (dont put function over here?)
    }

});

module.export=mongoose.model('user',NotesSchema)