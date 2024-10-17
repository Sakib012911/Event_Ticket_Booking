  const mongoose=require("mongoose")
const {Schema}=mongoose


const UserSchema=new Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    },
    role:{
        type:String,
        require:true
    }
})
const user=mongoose.model('user',UserSchema);
// user.createIndexes();
module.exports=user;