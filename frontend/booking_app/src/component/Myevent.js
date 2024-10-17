import React, { useContext, useEffect } from 'react'
import EventContext from '../context/event/eventcontext';
import Myeventsitems from './Myeventsitems';

const Myevent = (props) => {
    const context = useContext(EventContext);
    const { getUserEvent,userevents } = context;

        setTimeout(() => {
            props.setprogress(10)
            props.setprogress(50)
            props.setprogress(30)
            props.setprogress(50)
            props.setprogress(65)
            props.setprogress(70)
            props.setprogress(85)
            props.setprogress(100)    
        }, 1000); // Simulate network delay (optional)
        
        useEffect(() => {
        getUserEvent();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
      <div className="container text-center" style={{marginTop:"4rem"}}>
      <h1> My Events</h1>
      </div>
                <div className="container text-center">
                    <div className="row ">
                        {userevents.map((event) => (
                            <div className="col-12 col-sm-6 col-md-3 mb-4" key={event._id}>
                                <Myeventsitems event={event} />
                            </div>
                        ))}
                    </div>
                </div>
        </>
    )
}

export default Myevent






