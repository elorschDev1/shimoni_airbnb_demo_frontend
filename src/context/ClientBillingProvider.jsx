import {useState} from 'react';
import ClientBillingContext from './ClientBillingContext';
import PropTypes from "prop-types";

const ClientBillingProvider = ({children}) => {
    let [phoneNumberToBill,setPhoneNumberToBill]=useState("");
    let [durationOfStay,setDurationOfStay]=useState(0);
  return (
    <ClientBillingContext.Provider value={{phoneNumberToBill,setPhoneNumberToBill,durationOfStay,setDurationOfStay}}>{children}</ClientBillingContext.Provider>
  )
}

export default ClientBillingProvider;
ClientBillingProvider.propTypes={
    children:PropTypes.node
}