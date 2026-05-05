import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client';
import { createBrowserRouter,RouterProvider } from 'react-router';
import './index.css'
import App from './App.jsx'
import HomePage from './components/HomePage.jsx';
import Gallery from './components/Gallery.jsx';
import Reviews from './components/Reviews.jsx';
import Amenities from './components/Amenities.jsx';
import Pricing from './components/Pricing.jsx';
import AddReviewForm from './components/AddReviewForm.jsx';
import ClientBookingForm from './components/ClientBookingForm.jsx';
import ClientBillingProvider from './context/ClientBillingProvider.jsx';
import PaymentsProcessingPage from './components/PaymentsProcessingPage.jsx';
import Letter from './components/Letter.jsx';
import ManageRental from './components/ManageRental.jsx';

const router=createBrowserRouter([
  {
    path:"/",
    element:<App/>
  },
  {
    path:"/",
    element:<HomePage/>
  },
  {
    path:"/rooms",
    element:<Gallery/>
  },
  {
    path:"/reviews",
    element:<Reviews/>
  },
  {
    path:"/amenities",
    element:<Amenities/>
  },
  {
    path:"/bookNow",
    element:<Pricing/>
  },
  {
    path:"/reviewForm",
    element:<AddReviewForm/>
  },
  {
    path:"/clientBookingForm",
    element:<ClientBookingForm/>
  },
  {
    path:"/paymentsProcessingPage",
    element:<PaymentsProcessingPage/>
  }
  ,{
    path:"/letter",
   element:<Letter/>
  },
  {
    path:"/manageRental",
    element:<ManageRental/>
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClientBillingProvider>
    <RouterProvider router={router}/>
    </ClientBillingProvider>
   
  </StrictMode>,
)
