import React, { useContext } from "react";
import { useState } from "react";
import BookingContext from "./bookingcontext";
import { useNavigate } from "react-router-dom";
import EventContext from "../event/eventcontext";
import ErrorContext from "../error/errorcontext";
import Cookies from "js-cookie";
const BookingState=(props)=>{
    const navigate =useNavigate();
    const context=useContext(EventContext)
    const {getEvents}=context
    const errorcontext=useContext(ErrorContext)
    const {setErrorMessage,setErrorcode}=errorcontext
    const [bookings,setbookings]=useState([]);
    const [userbookings,setuserbookings]=useState([]);
 
    // create booking
    const createBooking=async(id,ticketsBooked,totalPrice)=>{
        const newbooking=await fetch(`${process.env.REACT_APP_BASE_HOST}/api/booking/createbooking/${id}`,{
            method:"POST",
            headers:{
                "Content-Type": "application/json", 
                "token":Cookies.get("token")
            },
            body: JSON.stringify({   // Stringify the body
                ticketsBooked: ticketsBooked,
                totalPrice:totalPrice
            })
        })
         const booking= await newbooking.json();
        //  console.log(booking)

       if(booking.sucess){
           await getEvents();
        setbookings(booking.booking);



        navigate("/successful");
       }
       else{
           setErrorMessage(booking.message)
           setErrorcode(newbooking.status)
           navigate("/error")
       }
    }

    // get bookings
    // getevents particular user event
const getUserbooking=async()=>{
    const response= await fetch(`${process.env.REACT_APP_BASE_HOST}/api/booking/fetchallbooking`,{
       method:"GET",
       headers:{
           "Content-Type": "application/json",
           "token": Cookies.get("token")
   }});
     const data= await response.json();
    //  console.log(data)
    if(data.sucess){
        setuserbookings(data.bookingWithEvents);
    }
    else{
        setErrorMessage(data.message);
        setErrorcode(response.status)
        navigate("/error")
    }
    // console.log(response.status)
   }

   //  delete Booking
const deleteBooking=async(id)=>{
    // console.log(id)
    const response=await fetch(`${process.env.REACT_APP_BASE_HOST}/api/booking/canclebooking/${id}`,{
        method:"DELETE",
        headers:{
            "Content-Type": "application/json",
    "token":Cookies.get("token")
        }});
        const data=await response.json();
        console.log(data)
        const newuserbooking=userbookings.filter((userbookings)=>{return userbookings._id !== id});
        
        if(data.sucess){
            setuserbookings(newuserbooking)
            await getEvents();
        }
        else{
         setErrorcode(response.status)
        setErrorMessage(data.message)
        navigate('/error')

        }
    }
    return(
        <BookingContext.Provider value={{bookings,createBooking,getUserbooking,userbookings,deleteBooking}}>
            {props.children}
        </BookingContext.Provider>
    )

}
export default BookingState