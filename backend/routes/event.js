const express = require("express");
const fetchuser = require("../middleware/fetchuser");
const router = express.Router();
const eventModel = require("../model/event")
const bookingModel=require("../model/bookings")
const userModel = require("../model/user")
const { body, validationResult } = require('express-validator');


// get all the events of  a particular http://localhost:5500/api/event/fetchallevents
router.get("/fetchallevents", async (req, res) => {
   let sucess=false;
    const page=req.query.page;
    const limit=5;
    // it gives 6 events after skipping previous 6 event
    const event = await eventModel.find().skip((page-1)*limit).limit(5);
    // console.log(event)
    const totalevent=await eventModel.find().countDocuments();
    if(totalevent===0){
      return  res.status(400).json({sucess,error:"no events yet",message:"NOT EVENTS YET FOCUS ON STUDY"})
    }
    sucess=true;
    res.json({sucess,event,totalevent});
})

// get all the event of  a particular user  http://localhost:5500/api/event/myevent
router.get("/myevent",fetchuser, async (req, res) => {
    // console.log(req.user)
    let sucess=false;
    const event =await eventModel.find({organizerId:req.user})
    // console.log(event)
    if (event.length===0) {
      return res.status(404).json({sucess,error:"No Events",message:"YOU DON'T HAVE ANY EVENTS"})
    }
    sucess=true;
    res.status(200).json({sucess,event})
    
  })

// **********************************************************************************

// create event http://localhost:5500/api/event/createevent
router.post("/createevent", fetchuser, [body('title', "Title is required").isLength({ min: 5 }).exists(), body('description', " Description is required").exists().isLength({ min: 5 }), body('date', "date is mandatory").exists(), body('address', "address is mandatory").exists().isLength({ min: 1 }), body('city', "city is mandatory").exists().isLength({ min: 1 }), body('state', "state is mandatory").exists().isLength({ min: 1 }), body('category', "category is mandatory").exists(), body('price', "price is mandatory").exists().isLength({ min: 1 }),
body('totalTicket', "totalTicket is mandatory").exists()], async (req, res) => {
    let sucess=false;
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.json({sucess, error: error.array(),message:" INVALID Input" });
    }
    const user = await userModel.findById(req.user).select("-password");
    if(!user){
        return res.status(404).json({sucess,error:"user not found",message:"TRY AGAIN"});
    }
    else if (user.role == "user") {
        return res.status(401).json({sucess,error:"user cannot able to create event",message:"You are not allowed to create event"});
    }
        try {
            let { image, title, description, date, address, city, state, category, price, totalTicket } = req.body;

            const event = await eventModel.create({
                image,
                title,
                description,
                organizerId: req.user,
                date,
                location: {
                    address,
                    city,
                    state
                },
                category,
                price,
                availableTicket: totalTicket,
                totalTicket,
            })
            sucess=true
            res.status(200).json({sucess,event})

        } catch (error) {
            console.error(error.message);
            res.status(500).json({sucess,error:"Internal server error",message:"SOMETHING WENT WRONG"})
        }
})

// ******************************************************************************

// Deleting request for event http://localhost:5000/api/event/deleteevent/:id
router.delete("/deleteevent/:id",fetchuser,async(req,res)=>{
    let sucess=false;
    try{
    // finding note for delete it
    let event=await eventModel.findById(req.params.id);
    if(!event){
      return   res.status(404).json({sucess,message:"SORRY SOMETHING WENT WRONG",error:" event Not found"})
    }
     const booking=await bookingModel.find({eventId:req.params.id});
     if(booking.length!==0){
        return   res.status(400).json({sucess,message:"SORRY YOU CAN'NOT DELETE IT SOMEONE HAVE YOUR EVENT TICKETS",error:"booking found on this event"})
     }
    // checking user is valid user or not
    if(event.organizerId.toString()!==req.user.toString()){
        return res.status(401).json({sucess,error:"unauthorised acess of user",message:"Not allowed"});
    }
      event = await eventModel.findByIdAndDelete(req.params.id)
      sucess=true
     res.status(200).json({sucess,event});
    }catch (error) {
        console.error(error.message);
        res.status(500).json({sucess,message:"SOMETHING WENT WRONG",error:"internal server error"})
    }
    })
    

module.exports = router;



