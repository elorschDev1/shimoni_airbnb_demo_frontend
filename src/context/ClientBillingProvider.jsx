import {useState} from 'react';
import ClientBillingContext from './ClientBillingContext';
import PropTypes from "prop-types";

const ClientBillingProvider = ({children}) => {
    let [phoneNumberToBill,setPhoneNumberToBill]=useState("");
    let [durationOfStay,setDurationOfStay]=useState(0);
    let [insertedBookingID,setInsertedBookingID]=useState(0);
  return (
    <ClientBillingContext.Provider value={{
      phoneNumberToBill,setPhoneNumberToBill,
      durationOfStay,setDurationOfStay,
      insertedBookingID,setInsertedBookingID
      }}>
        {children}
      </ClientBillingContext.Provider>
  )
}

export default ClientBillingProvider;
ClientBillingProvider.propTypes={
    children:PropTypes.node
}