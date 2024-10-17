import React, { useState } from 'react';
import { useContext } from "react";
import BookingContext from '../context/booking/bookingcontext';

const Bookingsitems = (props) => {
    const { booking } = props;
    const [showbin, setbin] = useState(false);
    const context=useContext(BookingContext);

   const {deleteBooking}=context;

    const handleclick=()=>{
        deleteBooking(booking._id);
    }
    
    return (
        <>
            {/* main event cards */}
            <div className="card mt-4 justify-content-center" style={{ width: '18rem' }}  role="button">
                <img src={booking.event.image} className="card-img-top" alt={booking.event.title} />
                <div className="card-body">
                    <h6 className="card-title">Booking ID</h6>
                    <h6 className="card-title">{booking._id}</h6>
                        <small className="text-muted">Event Date: {new Date(booking.eventDate).toLocaleString()}</small>
                    <p className="card-text">TicketsBooked: {booking.ticketsBooked}</p>
                    <p><strong>Address :</strong> {booking.event.location.address},{booking.event.location.city},{booking.event.location.state}</p>
                    <p className="card-text">Total Price: {booking.totalPrice} Rs</p>
                        <small className="text-muted"> Booking Date: {new Date(booking.bookingDate).toLocaleString()}</small>
                </div>
                <div className='text-center'>
                        <i onClick={handleclick} className={`fa-solid fa-trash ${showbin ? "fa-bounce" : ""} fa-lg`} style={{ color: "#e60017" }} onMouseEnter={() => setbin(true)} onMouseLeave={() => setbin(false)}></i>
                </div>
            </div>
        </>
    )
}

export default Bookingsitems;
