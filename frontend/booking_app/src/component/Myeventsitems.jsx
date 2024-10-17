import React, { useState } from 'react';
import { useContext } from "react";
import EventContext from '../context/event/eventcontext';

const Myeventsitems = (props) => {
    const { event } = props;
    const context=useContext(EventContext);
    const {deleteEvent}=context;
    const [showModal, setShowModal] = useState(false);
    const [showbin, setbin] = useState(false);

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);
    const handleclick=()=>{deleteEvent(event._id)};
    return (
        <>
            {/* main event cards */}
            <div className="card mt-4 justify-content-center" style={{ width: '18rem' }} onClick={handleShowModal} role="button">
                <img src={event.image} className="card-img-top" alt={event.title} />
                <div className="card-body">
                    <h5 className="card-title">{event.title}</h5>
                    <p className="card-text">{event.description}</p>
                    <p className="card-text">
                        <small className="text-muted">Date: {new Date(event.date).toLocaleString()}</small>
                    </p>
                    <p className="card-text">Price: {event.price} Rs</p>
                    <p className="card-text">Available Tickets: {event.availableTicket}</p>
                    <p className="card-text">Total Tickets: {event.totalTicket}</p>
                    <i onClick={handleclick} className={`fa-solid fa-trash ${showbin ? "fa-bounce" : ""} fa-lg`} style={{ color: "#e60017" }} onMouseEnter={() => setbin(true)} onMouseLeave={() => setbin(false)}></i>
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
                            <p><strong>Category:</strong>{event.category}</p>
                            <p><strong>Price:</strong> {event.price} Rs</p>
                            <p><strong>Available Tickets:</strong> {event.availableTicket}</p>
                            <p><strong>Total Tickets:</strong> {event.totalTicket}</p>
                            <p><strong>Address :</strong> {event.location.address},{event.location.city},{event.location.state}</p>
                            <p><strong>Created on:</strong> {new Date(event.createdAt).toLocaleString()}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Myeventsitems;
