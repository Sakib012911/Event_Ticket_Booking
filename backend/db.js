const mongoose=require("mongoose");

function connectMongodb(){
mongoose.connect("mongodb://localhost:27017/eventbooking");
console.log("sucessfully")
}

module.exports= connectMongodb;