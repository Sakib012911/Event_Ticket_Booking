import React, { useState } from 'react';
import { useContext } from "react";
import BookingContext from '../context/booking/bookingcontext';
// import EventContext from '../context/event/eventcontext';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
const Eventsitem = (props) => {
    const { event } = props;
    const context=useContext(BookingContext)
    const {createBooking}=context;
    const [showModal, setShowModal] = useState(false);
    const navigate=useNavigate();
    const [showbookingModal, setbookingModal] = useState(false);
    
    const [ticketCount, setTicketCount] = useState(1); // Initialize with 1 ticket
    const [totalPrice, setTotalPrice] = useState(event.price);
    
    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const bookingShowModal = () => setbookingModal(true);
    const bookingCloseModal = () => setbookingModal(false);
    
    const handleTicketChange = (e) => {
        const count = e.target.value;
        setTicketCount(count);
        setTotalPrice(count * event.price); // Calculate total price based on number of tickets
    };
    
    const handleBooking = () => {
         if(!Cookies.get("token")){
             navigate("/login")
        } 
         else{
         createBooking(event._id,ticketCount,totalPrice);
            setbookingModal(false)
        }
    };

    return (
        <>
            {/* main event cards */}
            <div className="card mt-4 justify-content-center" style={{ width: '18rem' }} onClick={handleShowModal} role="button">
                <img src={event.image} className="card-img-top" alt={event.title}  style={{ width: '18rem' }}/>
                <div className="card-body">
                    <h5 className="card-title">{event.title}</h5>
                    <p className="card-text">{event.description}</p>
                    <p className="card-text">
                        <small className="text-muted">Date: {new Date(event.date).toLocaleString()}</small>
                    </p>
                    <p className="card-text">Price: {event.price} Rs</p>
                    <p className="card-text">Available Tickets: {event.availableTicket}</p>
                </div>
            </div>

            {/* modal for details */}
            <div className={`modal fade ${showModal ? 'show d-block' : ''} `} >
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header d-flex justify-content-between">
                            <h5 className="modal-title">{event.title}</h5>

                            <i className="fa-regular fa-circle-xmark" onClick={handleCloseModal} style={{ cursor: "pointer" }} ></i>
                        </div>
                        <div className="modal-body">
                            <img src={event.image} alt={event.title} className="img-fluid" />
                            <p>{event.description}</p>
                            <p><strong>Date:</strong> {new Date(event.date).toLocaleString()}</p>
                            <p><strong>Price:</strong> {event.price} Rs</p>
                            <p><strong>Available Tickets:</strong> {event.availableTicket}</p>
                            <p><strong>Address :</strong> {event.location.address},{event.location.city},{event.location.state}</p>
                        </div>
                        <div className="modal-footer">
                           <button type="button" className="btn btn-secondary" onClick={()=>{bookingShowModal();handleCloseModal()}}>
                                Book
                            </button>
                        </div>
                    </div>
                </div>
            </div>


            {/* Booking modal */}

            <div className={`modal fade ${showbookingModal ? 'show d-block' : ''} `} >
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header d-flex justify-content-between">
                            <h5 className="modal-title text-center">{event.title}</h5>
                            <i className="fa-regular fa-circle-xmark" onClick={bookingCloseModal} style={{ cursor: "pointer" }} ></i>
                        </div>
                        <div className="modal-body">
                            <img src={event.image} alt={event.title} className="img-fluid" />
                            <p><strong>Date:</strong> {new Date(event.date).toLocaleString()}</p>
                            <p><strong>Price:</strong> {event.price} Rs</p>
                            <label htmlFor="price" className="form-label">Total Tickets</label>
                <input name="totalticket" onChange={handleTicketChange} value={ticketCount}   type="number" className="form-control"  placeholder="Enter NO of tickets"/>
                            <p><strong>Total Price:</strong> {totalPrice}</p>
                            <p><strong>Available Tickets:</strong> {event.availableTicket}</p>
                        </div>
                        <div className="modal-footer">
                           <button type="button" className="btn btn-secondary" onClick={handleBooking} >
                              Confirm  Booking
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Eventsitem;


