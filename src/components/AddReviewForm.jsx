// eslint-disable-next-line no-unused-vars
import React,{useState}from 'react';
import { Form } from 'react-bootstrap';
import NavigationMenu from './NavigationMenu';
import { useNavigate } from 'react-router';

const AddReviewForm = () => {
    let [clientName,setClientName]=useState("");
    let [clientNameError,setClientNameError]=useState("");
    let [clientReview,setClientReview]=useState("");
    let [clientReviewError,setClientReviewError]=useState("");
    let [backendResponse,setBackendResponse]=useState("");
    let navigate=useNavigate();
    let handleSubmit=(e)=>{
        e.preventDefault();
        let formIsValid=true;
        if(clientName===""){
            setClientNameError("Kindly fill in your name if you wish to leave a review.");
            formIsValid=false;
        }
        if(clientName!==""&&clientName.length<3){
            setClientNameError("Your name should not be less than 3 characters long.");
            formIsValid=false;
        }
        if(clientName.length!==""&&clientName.length>3&&clientName.length>20){
            setClientNameError("Your name should not be longer than 20 characters.");
            formIsValid=false;
        }
        if(clientReview===""){
            setClientReviewError("Kindly leave a review that we can assess.");
            formIsValid=false;
        }
        if(clientReview.length<3&&clientReview!==""){
            setClientReviewError("Please provide a more understandable review message");
            formIsValid=false;
        }
        if(clientReview.length>250){
            setClientReviewError("Please provide a more understandable review message");
            formIsValid=false;
        }
        if(formIsValid==true){
            try{
                   const handleReviewData=async()=>{
                    let sendReview=await fetch("https://shimonigetawayhomes.onrender.com/clientReviews",{
                        method:"POST",
                        headers:{
                            "Content-Type":"application/json"
                        },

                        body:JSON.stringify({clientName,clientReview})
                    });
                    let serverResponse=await sendReview.json();
                    console.log(serverResponse);
                    setBackendResponse(serverResponse.message);
                    setTimeout(()=>{
                        setBackendResponse("");
                        navigate("/");
                    },1500);
                }
                handleReviewData();
             

            }catch(err){
                console.error(err)
            }
    
        }

    }
  return (
    <>
    <NavigationMenu/>
    <Form className='form d-flex flex-column justify-content-center align-items-center p-2 m-2' noValidate onSubmit={handleSubmit}>
        <Form.Group className='p-3 mb-3'>
            <Form.Label>Your Name:</Form.Label>
            <Form.Control type="text" value={clientName} onChange={(e)=>{
                setClientName(e.target.value);
                if(clientNameError!=="")setClientNameError("");
            }}/>
            <Form.Text className='text-danger'>{clientNameError}</Form.Text>
        </Form.Group>
        <Form.Group className='p-3 mb-3'>
            <Form.Label>Leave A Message:</Form.Label>
            <Form.Control as="textarea" value={clientReview} onChange={(e)=>{
                setClientReview(e.target.value);
                if(clientReviewError!=="")setClientReviewError("")
            }}/>
            <Form.Text className='text-danger'>{clientReviewError}</Form.Text>
        </Form.Group>

           <Form.Group className='p-3 mb-3'>
         {backendResponse=="Thanks for your feedback."?<p className='text-success fw-bold'>{backendResponse}</p>:<p className='text-danger'>{backendResponse}</p>}
        </Form.Group>
        <Form.Group className='p-3 mb-3'>
            <button className="bg-primary rounded-3 text-white p-2">Add Review</button>
        </Form.Group>
     
    </Form>

    </>
  )
}

export default AddReviewForm