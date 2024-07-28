const mongoose =require('mongoose');
const { Schema } = mongoose;

//Object based
const NotesSchema = new Schema(
    //Object
    {
//values

    user:{
        //mpdel id of another obj??
        type: mongoose.Schema.Types.ObjectId,//its like a foreign key
        //linking the user in this model
    },
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

module.exports=mongoose.model('user',NotesSchema)