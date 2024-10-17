const connectMongodb=require("./db");
connectMongodb();
const cors = require('cors')
const express=require("express");
const app=express();
const cookies=require("cookie-parser")
// MiddelWare
app.use(express.json());
app.use(cors())

app.use(cookies())

// app.use(cors({ origin: 'http://localhost:3000' }));
app.use("/api/user",require("./routes/user"))
app.use("/api/event",require("./routes/event"))
app.use("/api/booking",require("./routes/booking"))
// app.use("/api/otp",require("./routes/otp"))







app.listen('5500',()=>{
    console.log("Running on 5500")
})