
import './App.css';
import Home from './component/Home';
import Navbar from './component/Navbar';
import BookingState from './context/booking/bookingstate';
import EventState from './context/event/eventstate';
import Login from "./component/Login";
import Event from './component/Event';
import LoadingBar from 'react-top-loading-bar'
import Myevent from "./component/Myevent"
import Error from './component/Error';
import{
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import React,{ useState } from 'react';
import Booking from './component/Booking';
import Createevent from './component/Createevent';
import Errorstate from './context/error/errorstate';
import Successful from './component/Successful';
import Createaccount from './component/Createaccount';

function App() {
  const [progress,setprogress]=useState(0);
  
  return (
    <>
      <Router>
    <Errorstate>
   <EventState>
    <BookingState>
      <LoadingBar
        color='#f11946'
        height={3}
        progress={progress}
        // onLoaderFinished={() => setProgress(0)}
        />
   <Navbar/>
   <Routes>
<Route exact path={"/"} element={ <Home/>}/>
<Route exact path={"/event"} element={ <Event setprogress={setprogress}/>}/>
<Route exact path={"/login"} element={ <Login/>}/>
<Route exact path={"/booking"} element={<Booking  setprogress={setprogress}/>}/>
<Route exact path={"/myevent"} element={ <Myevent  setprogress={setprogress} />}/>
<Route exact path={"/createevent"} element={<Createevent/>}/>
<Route exact path={"/error"} element={<Error/>}/>
<Route exact path={"/successful"} element={<Successful/>}/>
<Route exact path={"/createaccount"} element={<Createaccount/>}/>
   </Routes>
    </BookingState>
   </EventState>
   </Errorstate>
      </Router>
   </>
  );
}

export default App;
