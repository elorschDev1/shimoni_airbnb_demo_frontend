import {useContext,useState,useEffect,useRef} from 'react';
import ClientBillingContext from '../context/ClientBillingContext';


const PaymentsProcessingPage = () => {
    const {phoneNumberToBill,durationOfStay,insertedBookingID}=useContext(ClientBillingContext);
    const [stkPushStatus,setStkPushStatus]=useState("");
    const [isSuccess,setIsSuccess]=useState(false);
    const [isLoading,setIsLoading]=useState(false);

    const pollingIntervalRef=useRef(null);

    const rentalPrice=1;
    const totalAmountCharged=durationOfStay*rentalPrice;

    const checkPaymentStatus=async()=>{
        try {
            const res=await fetch(`https://shimonigetawayhomes.onrender.com/paymentWebHook?bookingId=${insertedBookingID}`)
            const data=await res.json();
            console.log(`Status checked from the DB:${data}`);

            if(data.status === "Paid"){
                setIsSuccess(true);
                setStkPushStatus("Great, your payment has been received,looking forward to having you with us.");
                stopPolling();
            }
            else if (data.status === "TimedOut" || data.status === "Cancelled") {
                setStkPushStatus("Transaction was cancelled or timed out. Please try again.");
                setIsSuccess(false);
                stopPolling();
            } else {
                setStkPushStatus("Waiting for your Mpesa PIN entry... ");
            }

        } catch (error) {
            console.error("Error checking payment status:", error);
        }
    }

    const stopPolling=()=>{
        if(pollingIntervalRef.current){
            clearInterval(pollingIntervalRef.current);
            pollingIntervalRef.current=null;
        }
    }

   const startPolling=()=>{
    stopPolling();
    pollingIntervalRef.current=setInterval(checkPaymentStatus,3000);
   }


    const submitPaymentDetails=async()=>{
        if(isLoading)return;
        setIsLoading(true);
        setStkPushStatus("Initiating the Mpesa payment...");
        setIsSuccess(false);
        try{
           
            const res=await fetch("https://shimonigetawayhomes.onrender.com/clientPayments",{
                method:"POST",
                headers:{ "Content-Type":"application/json"},
                body:JSON.stringify({phoneNumberToBill,totalAmountCharged,insertedBookingID})   
            })
            const data=await res.json();
            console.log(data);
            
            if(data.success===false){
                setStkPushStatus("Hi,there could be a technical issue preventing your Mpesa payment, please retry after a few seconds.. ");
                setIsSuccess(false);
            }
            else{
                setStkPushStatus(" Please check your phone to enter M-Pesa PIN...");
                console.log("The stk push process was successful. Beginning database verification polling...");
                startPolling();
            }
        }catch(err){
            console.error(err);
            setStkPushStatus("Network error submitting payment request.");
            setIsSuccess(false);
        }
    }

    useEffect(() => {
        return () => stopPolling();
    }, []);


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

        <div className="bg-white p-3 m-3">
                    {stkPushStatus && (
                        <p className={`fw-bold fs-md ${isSuccess ? 'text-success' : 'text-danger'}`}>
                            {stkPushStatus}
                        </p>
                    )}
                </div>

        
    </div>

    </section>
  
  
    </>
  )
}

export default PaymentsProcessingPage