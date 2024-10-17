import React,{useContext,useState} from 'react'
import EventContext from '../context/event/eventcontext'

const Createevent = () => {
const context=useContext(EventContext);
const {addEvent}=context;
const [event,setevent]=useState({title:"",description:"",date:"",address:"",city:"",state:"",category:"Conference",price:"",totalTicket:"",image:""})

const handleclick=(e)=>{
    addEvent(event.title, event.description, event.date, event.address, event.city, event.state, event.category, event.price, event.totalTicket, event.image);
    setevent({title:"",description:"",date:"",address:"",city:"",state:"",category:"Conference",price:"",totalTicket:"",image:""})
    e.preventDefault()
  }
  const onChange=(e)=>{
      setevent({...event,[e.target.name]:e.target.value})
  }
  

    return (
   <>
   
<div className="container" style={{marginTop:"4rem"}}>
    <h2 className="mb-2 text-center">Create Event</h2>
        {/* <!-- Title --> */}
        <form onSubmit={handleclick}>
        <div className="mb-3">
            <label htmlFor="title"  className="form-label">Event Title *</label>
            <input type="text" name="title" value={event.title} onChange={onChange}  className="form-control"  placeholder="Enter event title"/>
        </div>

        {/* <!-- Description --> */}
        <div className="mb-3">
            <label htmlFor="description" className="form-label">Event Description *</label>
            <textarea name="description" value={event.description} onChange={onChange}   className="form-control"  rows="3" placeholder="Enter event description"></textarea>
        </div>

        {/* <!-- Date --> */}
        <div className="mb-3">
            <label htmlFor="date" className="form-label">Event Date & Time *</label>
            <input name="date" value={event.date} onChange={onChange}  type="datetime-local" className="form-control" id="date"/>
        </div>

        {/* <!-- Address --> */}
        <div className="row">
            <div className="col-md-6 mb-3">
                <label htmlFor="address" className="form-label">Event Address *</label>
                <input name="address" value={event.address} onChange={onChange} type="text" className="form-control"  placeholder="Address"/>
            </div>

            <div className="col-md-3 mb-3">
                <label htmlFor="city" className="form-label">City *</label>
                <input name="city" value={event.city} onChange={onChange} type="text" className="form-control"  placeholder="City"/>
            </div>

            <div className="col-md-3 mb-3">
                <label htmlFor="state" className="form-label">State *</label>
                <input name="state" value={event.state} onChange={onChange} type="text" className="form-control" placeholder="State"/>
               
            </div>
        </div>

        {/* <!-- Category --> */}
        <div className="mb-3">
            <label htmlFor="category" className="form-label">Event Category *</label>
            <select className="form-select" value={event.category} onChange={onChange} name="category">
                <option   value="Conference" defaultValue>Conference</option>
                <option   value="Webinar">Webinar</option>
                <option  value="Meetup">Meetup</option>
                <option  value="Workshop">Workshop</option>
            </select>
        </div>

        {/* <!-- Price and Total Tickets --> */}
        <div className="row">
            <div className="col-md-6 mb-3">
                <label htmlFor="price" className="form-label">Ticket Price (Rs) *</label>
                <input name="price" onChange={onChange} value={event.price}  type="number" className="form-control"  placeholder="Enter price"/>
            </div>
            
            <div className="col-md-6 mb-3">
                <label htmlFor="totalTicket" className="form-label">Total Tickets *</label>
                <input name="totalTicket"onChange={onChange} value={event.totalTicket} type="number" className="form-control"  placeholder="Enter total tickets"/>
            </div>
        </div>
        <div className="mb-3">
            <label htmlFor="image" className="form-label">Image URL (Optional)</label>
            <input name="image" onChange={onChange} value={event.image} type="text" className="form-control"  placeholder="Enter event title"/>
        </div>
        {/* <!-- Submit Button --> */}
        <div className="text-center">
            <button type="submit" className="btn btn-primary">Create Event</button>
        </div>
        </form>
</div>



   
   </>
  )
}

export default Createevent
