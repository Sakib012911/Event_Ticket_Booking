const express = require("express");
const router = express.Router();
const bookingModel = require("../model/bookings");
const userModel=require("../model/user");
const eventModel=require("../model/event")
const { body, validationResult } = require('express-validator');
const fetchuser = require("../middleware/fetchuser");

// get all the bookings of  a particular user  http://localhost:5500/api/booking/fetchallbooking
router.get("/fetchallbooking",fetchuser, async (req, res) => {
  let sucess=false;
  try{
  const booking = await bookingModel.find({userId:req.user});
  // console.log(booking.length)
  if (booking.length===0) {
    return res.status(404).json({sucess,error:"user does not have any booking",message:"NO bookings Yet Explore some event and book it"})
  }
  const eventIds = booking.map(bookings => bookings.eventId);
// console.log(eventIds)
// Find all events that match the eventIds from the bookings
const events = await eventModel.find({ _id:eventIds } );
// console.log(events)

  // Create an array of event objects for each booking
  const bookingWithEvents = booking.map(bookings => {
    const event = events.find(event => event._id.toString() === bookings.eventId.toString());
    return { ...bookings.toObject(), event };
  });
sucess=true
  res.status(200).json({sucess,bookingWithEvents});
}catch (error) {
  console.error('Error Finding booking:', error);
  res.status(500).json({sucess,error: 'Internal server error',message:"SOMETHING WENT WRONG"});
}

  
})

// ********************************************************************************************************************

// POST /bookings: Create a new booking http://localhost:5500/api/booking/createbooking/:id
router.post('/createbooking/:id',fetchuser,[body("ticketsBooked","atleast one number of tickets should be present").isNumeric().isLength({min:1}),body("totalPrice","total Price should be present").isNumeric().isLength({min:1})], async (req, res) => {
  let sucess=false;

  const error =validationResult(req);  
  if (!error.isEmpty()) {
    return res.status(400).json({sucess,error:error.array(),message:"INVALID INPUT"});
  }

  const {ticketsBooked, totalPrice } = req.body;
    const user = await userModel.findById(req.user).select("-password");
    if (!user) {
      return res.status(404).json( {sucess,error: 'User not found' ,message:"NOT FOUND"});
    }
    const event =await eventModel.findById(req.params.id);
    if(!event){
        return res.status(404).json({sucess,error: 'Event not found',message:"NOT FOUND"});
    }
   // checking user is valid or not.
   try {
       if(user.role==="organizer"){
           return res.status(401).json({sucess,error:"organizer can not  allowed to create booking",message:"SOMETHING WENT WRONG"})
       }
       if (ticketsBooked>event.availableTicket || event.availableTicket===0) {
        return res.status(401).json({sucess,message:"HOUSE FULL",error:"no tickets are available"})
       }
      // Create a new booking
      const booking =  await bookingModel.create({
        userId:req.user,
        eventId:req.params.id,
        eventDate:event.date,
        ticketsBooked,
        totalPrice, 
      });

      // await eventModel.updateOne({_id:req.params.id},{$set:{availableTicket:event.availableTicket-ticketsBooked}})
      await eventModel.updateOne({ _id: req.params.id }, { $inc: { availableTicket: -ticketsBooked } });

      // Send back the created booking details in the response
      sucess=true;
      res.status(200).json({sucess,booking});
    } catch (error) {
      // console.error('Error creating booking:', error);
      res.status(500).json({sucess,error: 'Internal server error',message:"SOMETHING WENT WRONG"});
    }
  });
  


// *******************************************************************************************************************

  // delete request for booking http://localhost:5000/api/booking/canclebooking/:id
router.delete("/canclebooking/:id",fetchuser,async(req,res)=>{
  let sucess=false;
  try{
  // finding note for delete it
  let booking=await bookingModel.findById(req.params.id);
  if(!booking){
    return   res.status(404).json({sucess,message:"Not found",error:"BOOKING not found"})
  }
  const event =await eventModel.findById(booking.eventId);
  if(!event){
      return res.status(404).json({sucess,message:"Not found", error: 'Event not found' });
  }
  
  // checking user is valid user or not
  if(booking.userId.toString()!==req.user.toString()){
    return res.status(401).json({sucess,message:"Not allowed",error:"unauthorised access"});
  }
  // checking request in within 2 minutes or not
  if (new Date()-booking.bookingDate>120000) {
    return res.status(401).json({sucess,message:"MORE THAN 2 Minutes UNABLE TO DELETE",error:"user is delteing beyound time"});  
  }
    booking = await bookingModel.findByIdAndDelete(req.params.id)
    await eventModel.updateOne({_id:booking.eventId},{$set:{availableTicket:booking.ticketsBooked+event.availableTicket}})
    sucess=true;
   res.json({sucess,message:"Booking is Cancled",error:"sucessfully deleted"});

  }catch (error) {
      console.error(error.message);
      res.status(500).json({sucess,error:"internal server error",message:"SOMETHING WENT WRONG"})
  }
  })


  
  module.exports = router;