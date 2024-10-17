import React from "react";
import EventContext from "./eventcontext";
import { useState ,useContext} from "react";
import ErrorContext from "../error/errorcontext";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

const EventState=(props)=>{
    const navigate=useNavigate()
    const [events,setevents]=useState([]);
    const [userevents,setuserevents]=useState([]);
   const [page,setpage]=useState(1);
   const [totalevent,settotalevent]=useState(0);
   const errorcontext=useContext(ErrorContext)
    const {setErrorMessage,setErrorcode}=errorcontext
    const [usertype,setusertype]=useState("");
    // getevents ALL 
const getEvents=async()=>{
    const response= await fetch(`${process.env.REACT_APP_BASE_HOST}/api/event/fetchallevents?page=${page}`,{
       method:"GET",
       headers:{
           "Content-Type": "application/json",
   }});
     const data= await response.json();
    //  console.log(data.totalevent)
    if(data.sucess){
        setevents(events.concat(data.event))
        settotalevent(data.totalevent);
        setpage(page+1);
    }
    else{
        setErrorcode(response.status)
        setErrorMessage(data.message)
        navigate('/error')
    }
   }

//    ***********************************************************
   
// getevents particular user event
const getUserEvent=async()=>{
    console.log("calling getuserevent")
    const response= await fetch(`${process.env.REACT_APP_BASE_HOST}/api/event/myevent`,{
       method:"GET",
       headers:{
           "Content-Type": "application/json",
          "token":Cookies.get("token")
        }});
     const data= await response.json();
     console.log(data.sucess)
  if(data.sucess){
        setuserevents(data.event)
    }
    else{
    setErrorcode(response.status)
    setErrorMessage(data.message)
    navigate('/error')
}
   }

//    ******************************************************
   
//  delete event
const deleteEvent=async(id)=>{
    // console.log(id)
    const response=await fetch(`${process.env.REACT_APP_BASE_HOST}/api/event/deleteevent/${id}`,{
        method:"DELETE",
        headers:{
            "Content-Type": "application/json",
    "token":Cookies.get("token")
        }});
        const json=await response.json();
        console.log(json)
        const newuserevent=userevents.filter((userevents)=>{return userevents._id !== id});
        const newevent=events.filter((events)=>{return events._id !== id});
        
        if(json.sucess){
            setuserevents(newuserevent)
            setevents(newevent);
        }
        else{
            setErrorcode(response.status)
        setErrorMessage(json.message)
        navigate('/error')

        }

// console.log(response)
}

// create event
const addEvent=async(title,description,date,address,city,state,category,price,totalTicket,image)=>{
    console.log("adding a eventnote") 
    // console.log(title,description,date,address,city,state,category,price,totalTicket,image) 
    const newevent=await fetch(`${process.env.REACT_APP_BASE_HOST}/api/event/createevent`,{
        method:"POST",
        headers:{
            "Content-Type": "application/json", 
            "token":Cookies.get("token")
        },
        body: JSON.stringify({   // Stringify the body
            title: title,
            description: description,
            date:date,
            address:address,
            city:city,
            state:state,
            category:category,
            price:price,
            totalTicket:totalTicket,
            image:image
        })
    })
     const event=await newevent.json();
     console.log(event)
     if(event.sucess){
         setevents(events.concat(event.event))
     }
     else{
        setErrorcode(newevent.status)
        setErrorMessage(event.message)
        navigate('/error')
     }
}
    return(
        <EventContext.Provider value={{events,getEvents,totalevent,getUserEvent,userevents,deleteEvent,addEvent,setusertype,usertype}}>
            {props.children}
        </EventContext.Provider>
    )
}

export default EventState;