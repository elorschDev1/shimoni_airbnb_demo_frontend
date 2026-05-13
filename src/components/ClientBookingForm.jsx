// eslint-disable-next-line no-unused-vars
import React,{useState,useContext} from 'react';
import NavigationMenu from './NavigationMenu';
import { Form } from 'react-bootstrap';
import PhoneInput from 'react-phone-input-2';
import {parsePhoneNumberFromString} from "libphonenumber-js";
import 'react-phone-input-2/lib/style.css';
import { useNavigate } from 'react-router';
import ClientBillingContext from '../context/ClientBillingContext';

const ClientBookingForm = () => {
    const today=new Date();
    const year=today.getFullYear();
    const month=String(today.getMonth()+1).padStart(2,'0');
    const day=String(today.getDate()).padStart(2,"0");
    const formattedDate = `${year}-${month}-${day}`;

    let [fullName,setFullName]=useState("");
    let [fullNameError,setFullNameError]=useState("");
    let usernamePattern=/^[A-Za-z\s']+$/;
    let [email,setEmail]=useState("");
    let [emailError,setEmailError]=useState("");
    let emailPattern=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let [phoneValue,setPhoneValue]=useState("");
    let [phoneValueError,setPhoneValueError]=useState("");
    let [guestNumber,setGuestNumber]=useState(1);
    let [guestNumberError,setGuestNumberError]=useState("");
    let [roomsBooked,setRoomsBooked]=useState(1);
    let [roomsBookedError,setRoomsBookedError]=useState("");
    let [checkInDate,setCheckInDate]=useState("");
    let [checkInDateError,setCheckInDateError]=useState("");
    let [checkOutDate,setCheckOutDate]=useState("");
    let [checkOutDateError,setCheckOutDateError]=useState("");
    let [specialRequest,setSpecialRequest]=useState("");
    let [specialRequestError,setSpecialRequestError]=useState("");
    let [backendResponse,setBackendResponse]=useState("");
    let [messageClassName,setMessageClassName]=useState("");
    let {setPhoneNumberToBill,setDurationOfStay}=useContext(ClientBillingContext);
    let navigate=useNavigate();


    const getMaxCheckOut=()=>{
        if(!checkInDate)return '';
        const checkIn=new Date(checkInDate);
        checkIn.setDate(checkIn.getDate() + 21);
        const checkInYear=checkIn.getFullYear();
        const checkInMonth= String(checkIn.getMonth() + 1).padStart(2, '0');
        const checkInDay=String(checkIn.getDate()).padStart(2,'0');
        return `${checkInYear}-${checkInMonth}-${checkInDay}`;
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        let formIsValid=true;
        if(fullName===""){
            setFullNameError("Fill in your name.");
            formIsValid=false;
        }
        if(fullName!==""&&fullName.length<3){
            setFullNameError("Your name should not be less than 3 characters long.");
            formIsValid=false;
        }
        if(fullName!==""&&fullName.length>3&&fullName.length>25){
            setFullNameError("Your name should not be longer than 25 characters.");
            formIsValid=false;
        }
        if(fullName!==""&&fullName.length>=3&&fullName.length<=25&&usernamePattern.test(fullName)===false){
            setFullNameError("Ensure your name is in a valid format.");
            formIsValid=false;
        }
        if(email===""){
            setEmailError("Provide an email address that can be used to contact you.");
            formIsValid=false;
        }
        if(email!==""&&emailPattern.test(email)===false){
            setEmailError("Ensure the email you have provided is valid.");
            formIsValid=false;
        }
         if(phoneValue===""){
          setPhoneValueError("Kindly provide your phone number for contacting.");
          formIsValid=false;
      }else{
      const phoneNumber=parsePhoneNumberFromString("+" + phoneValue);
      if(!phoneNumber||!phoneNumber.isValid()){
           setPhoneValueError("Invalid phone number, ensure its in the correct format.");
                formIsValid=false;
              }
       }
       if(guestNumber<1){
        setGuestNumberError("The apartment cannot be booked by less than 1 guest.");
        formIsValid=false;
       }
       if(guestNumber>1&&guestNumber>6){
        setGuestNumberError("The apartment can only be booked by a maximum of 6 guests.");
        formIsValid=false;
       }
       if(roomsBooked<1){
        setRoomsBookedError("Kindly book a valid number of bedrooms.");
        formIsValid=false;
       }
       if(roomsBooked>1&&roomsBooked>3){
        setRoomsBookedError("You can only book a maximum of 3 bedrooms.");
        formIsValid=false;
       }
       if(checkInDate===""){
        setCheckInDateError("Pick a date that you would like to check in to the apartment.");
        formIsValid=false;
       }
       if(checkOutDate===""){
        setCheckOutDateError("Pick a date that you would like to check out from the apartment.");
        formIsValid=false;
       }
       if(checkInDate!==""&&checkOutDate!==""&&new Date(checkInDate)>=new Date(checkOutDate)){
        setCheckInDateError("Ensure your check in date is valid before we proceed.");
        formIsValid=false;
       }
       if(specialRequest!==""&&specialRequest.length<20){
        setSpecialRequestError("Kindly ensure that your message is not less than 20 characters long.");
        formIsValid=false;
       }
       if(specialRequest!==""&&specialRequest.length>20&&specialRequest.length>250){
        setSpecialRequestError("Kindly ensure your message is not more than 250 characters long.");
        formIsValid=false;
       }

       if(formIsValid===true){
        setPhoneNumberToBill(phoneValue);
         try{
            const submitClientBooking=async()=>{
                let requestBooking=await fetch("https://shimonigetawayhomes.onrender.com/clientBookings",{
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify({
                        fullName,
                        email,
                        phoneValue,
                        guestNumber,
                        roomsBooked,
                        checkInDate,
                        checkOutDate,
                        specialRequest
                    })
                });
                let bookingResult=await requestBooking.json();
                console.log(bookingResult);
                setBackendResponse(bookingResult.message);
                setTimeout(()=>{
                    setBackendResponse("");
                    setBackendResponse(bookingResult.roomAvailability);
                    setMessageClassName(bookingResult.messageClass);
                    if(bookingResult.initiatePaymentProcess===true){
                         let checkIn=new Date(checkInDate);
                         let checkOut=new Date(checkOutDate);
                         let differenceInMs=checkOut-checkIn;
                         let daysStayed=differenceInMs/(1000*3600*24);
                         setDurationOfStay(daysStayed)
                        navigate("/paymentsProcessingPage");
                    }
                },2000)
                setTimeout(()=>setBackendResponse(""),3500);
            }
            submitClientBooking();
         }catch(err){
            console.err(err);
         }
       }
    }
    
  return (
    <>
    <NavigationMenu/>
    <section className="bg-light p-3 m-2">
        <Form className='form d-flex flex-column justify-content-center align-items-center p-2 m-2' noValidate onSubmit={handleSubmit}>
         <Form.Group  className='p-3 mb-3'>
          <Form.Label className='mb-2'>Full Name:</Form.Label>
          <Form.Control type='text' value={fullName} onChange={(e)=>{
            setFullName(e.target.value);
            if(fullNameError!=="")setFullNameError("");
          }}/>
          <p className="text-danger fw-bold">{fullNameError}</p>
         </Form.Group>
         <Form.Group  className='p-3 mb-3'>
            <Form.Label className='mb-2'>Email:</Form.Label>
            <Form.Control type='email' value={email} onChange={(e)=>{
                setEmail(e.target.value);
                if(emailError!=="")setEmailError("");
            }}/>
            <p className="text-danger fw-bold">{emailError}</p>
         </Form.Group>
         <Form.Group  className='p-3 mb-3'>
            <Form.Label className='mb-2'>Phone Number:</Form.Label>
            <PhoneInput 
            country={'ke'}
            className="form-control"
             value={phoneValue}
             onChange={(value) => {
            setPhoneValue(value);
            if (phoneValueError !== "") setPhoneValueError("");
           }}
            />
            <p className="text-danger fw-bold">{phoneValueError}</p>
            
         </Form.Group>
         <Form.Group  className='p-3 mb-3'>
            <Form.Label className='mb-2'>Number of Guests:</Form.Label>
              <Form.Select value={guestNumber} onChange={(e)=>{
                setGuestNumber(Number(e.target.value));
                if(guestNumberError!=="")setGuestNumberError("");
              }}>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
                <option value={6}>6</option>
              </Form.Select>
              <p className="text-danger fw-bold">{guestNumberError}</p>
            
         </Form.Group>
         
         <Form.Group className='p-3 mb-3'>
            <Form.Label className='mb-2'>Number of Bed Rooms You Need:</Form.Label>
            <Form.Select className='form-select' value={roomsBooked} onChange={(e)=>{
                setRoomsBooked(Number(e.target.value));
                if(roomsBookedError!=="")setRoomsBookedError("");
            }}>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
            </Form.Select>
            <p className="text-danger fw-bold">{roomsBookedError}</p>

         </Form.Group>
         <Form.Group  className='p-3 mb-3'>
            <Form.Label className='mb-2'>Check In Date:</Form.Label>
            <Form.Control type="date"  min={formattedDate} value={checkInDate}  onChange={(e) => {
                setCheckInDate(e.target.value);
                if(checkInDateError!=="")setCheckInDateError("");
                }}/>
                <p className="text-danger fw-bold">{checkInDateError}</p>
         </Form.Group>
         <Form.Group  className='p-3 mb-3'>
             <Form.Label className='mb-2'>Check Out Date:</Form.Label>
            <Form.Control type="date" min={checkInDate} value={checkOutDate} max={getMaxCheckOut()}  onChange={(e)=>{
                setCheckOutDate(e.target.value);
                if(checkOutDateError!=="")setCheckOutDateError("");
            }}/>
            <p className="fw-bold text-danger">{checkOutDateError}</p>
         </Form.Group>
         <Form.Group>
            <Form.Label className='mb-2'>Any Special Request:</Form.Label>
            <Form.Control as="textarea" value={specialRequest} onChange={(e)=>{
                setSpecialRequest(e.target.value);
                if(specialRequestError!=="")setSpecialRequestError("");
            }}/>
            <p className="text-danger fw-bold">{specialRequestError}</p>
         </Form.Group>
         <Form.Group className='p-2 mb-2'>
            <p className={messageClassName}>{backendResponse}</p>
            
         </Form.Group>
         <Form.Group>
            <button className="bg-primary text-white p-2 m-2 rounded-4">Book Now</button>
         </Form.Group>
        </Form>
    </section>
    </>
  )
}

export default ClientBookingForm