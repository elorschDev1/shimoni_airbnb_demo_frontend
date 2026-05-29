import {useContext,useState} from 'react';
import ClientBillingContext from '../context/ClientBillingContext';


const PaymentsProcessingPage = () => {
    let {phoneNumberToBill,durationOfStay,insertedBookingID}=useContext(ClientBillingContext);
    let [stkPushStatus,setStkPushStatus]=useState("");
    let [stkPushSuccess,setSTKPushSuccess]=useState("");

    let rentalPrice=1;
    let totalAmountCharged=durationOfStay*rentalPrice;

    let retrievePaymentInfo=async()=>{
        let requestDetails=await fetch("https://shimonigetawayhomes.onrender.com/paymentWebhook",{
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            }
        });
        let data=await requestDetails.json();
        console.log(data);

    }






    let submitPaymentDetails=async()=>{
        try{
            let res=await fetch("https://shimonigetawayhomes.onrender.com/clientPayments",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({phoneNumberToBill,totalAmountCharged,insertedBookingID})   
            })
            let data=await res.json();
            console.log(data);
            let {success}=data;
            if(success===false){
                setStkPushStatus("Hi,there could be a technical issue preventing your Mpesa payment, please retry after a few seconds.. ");
                setSTKPushSuccess(false);
                setTimeout(()=>{
                setStkPushStatus("");
                setSTKPushSuccess("");
               },1000);
            }
            else{
                setSTKPushSuccess(true);
                console.log("The stk push process was successful.");
                try{
                     retrievePaymentInfo();

                }catch(error){
                    console.log(`The following error is related to retrieving the payment info: ${error}`)
                }
               
            
            }

        }catch(err){
            console.error(err);
        }
    }


  return (
    <>
    <section className='d-flex flex-column justify-content-center align-items-center'>
          <div className="card p-5 m-3 bg-light">
        <div className='bg-white p-2 m-2'>
            <h5 className="text-center text-lead fw-bold">Payment for apartment</h5>
            <p>Price Per Night:{rentalPrice}</p>
            <p>Total Nights: {durationOfStay}</p>
            <p>Total Price: {totalAmountCharged}</p>
        </div>



        <div className='bg-white p-2 m-2'>
            <button className="bg-primary p-2 m-2 rounded-3 text-white" onClick={submitPaymentDetails}>Submit Payment</button>

        </div>

        <div className="bg-white p-2 m-2">
            {stkPushSuccess===false?<p className='text-danger fw-bold fs-md'>{stkPushStatus}</p>:<p className="text-success fw-bold fs-md">{stkPushSuccess}</p>}
        </div>
    </div>

    </section>
  

    
    </>
  )
}

export default PaymentsProcessingPage