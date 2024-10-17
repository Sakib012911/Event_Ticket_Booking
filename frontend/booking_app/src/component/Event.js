import React, { useContext, useEffect } from 'react'
import EventContext from '../context/event/eventcontext';
import Eventsitem from "../component/Eventsitem"
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from './Spinner';
const Event = (props) => {
    const context = useContext(EventContext);
    const { events, getEvents, totalevent } = context;
    // Function to load more events
   
    setTimeout(() => {
        props.setprogress(10)
        props.setprogress(50)
        props.setprogress(30)
        props.setprogress(50)
        props.setprogress(65)
        props.setprogress(70)
        props.setprogress(85)
        props.setprogress(100)    
    }, 1000);
   
    const fetchMoreData = () => {
        props.setprogress(10)
        props.setprogress(30)
        props.setprogress(80)
        props.setprogress(50)

        setTimeout(() => {
            getEvents();// Load 4 more events
        },1000); // Simulate network delay (optional)
        props.setprogress(90)
        props.setprogress(95)
        props.setprogress(100)
    };
    useEffect(() => {
        getEvents();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <>
         <div className="container text-center" style={{marginTop:"4rem"}}>
         <h1>Events</h1>

         </div>
            <InfiniteScroll
                dataLength={events.length}  // This is the length of the data being displayed
                next={fetchMoreData}        // Function to fetch more data
                hasMore={events.length !== totalevent}  // Check if there's more data to load
                loader={<Spinner />}  // Loading indicator
                endMessage={<p className='text-center'>No more events to show!</p>}  // Message at the end
            >       
                <div className="container text-center">
                    <div className="row ">
                        {events.map((event) => (
                            <div className="col-12 col-sm-6 col-md-3 mb-4" key={event._id}>
                                <Eventsitem event={event} />
                            </div>
                        ))}
                    </div>
                </div>

            </InfiniteScroll>
        </>
    )
}

export default Event






