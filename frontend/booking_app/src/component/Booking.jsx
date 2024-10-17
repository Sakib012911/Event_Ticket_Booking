import React, { useContext, useEffect } from 'react'
// import EventContext from '../context/event/eventcontext';
import BookingContext from '../context/booking/bookingcontext';
import Bookingsitems from "../component/Bookingitems"

const Booking = (props) => {
    const context = useContext(BookingContext);
    const { getUserbooking,userbookings } = context;

        setTimeout(() => {
            props.setprogress(10)
            props.setprogress(50)
            props.setprogress(30)
            props.setprogress(50)
            props.setprogress(65)
            props.setprogress(70)
            props.setprogress(85)
            props.setprogress(100)    
        }, 2000); // Simulate network delay (optional)
        
        useEffect(() => {
          getUserbooking();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
      <div className="container text-center" style={{marginTop:"4rem"}}>
      <h1> My Bookings</h1>
      </div>
                <div className="container text-center">
                    <div className="row ">
                        {userbookings.map((booking) => (
                            <div className="col-12 col-sm-6 col-md-3 mb-4" key={booking._id}>
                                <Bookingsitems booking={booking} />
                            </div>
                        ))}
                    </div>
                </div>
        </>
    )
}

export default Booking






