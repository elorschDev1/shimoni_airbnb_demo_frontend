import { Card } from "react-bootstrap";
import { useNavigate } from "react-router";

const Pricing=()=>{
    const navigate=useNavigate();
    return(
        <section className="p-4 m-4 bg-light">
            <Card className="p-4 m-3 card shadow rounded-2">
                <Card.Body>
                <h5 className="fw-bold fs-2 mb-3">Book Your Stay</h5>
                <Card.Text className="fs-3 fw-bold mb-3">Kes 12500/ night</Card.Text>
                <Card.Text className="fs-3 mb-3">3 Bedrooms 1 Bathroom 6 Guests</Card.Text>
                <Card.Text className="text-success">Mpesa or Card Payments Accepted</Card.Text>
                <button className="bg-dark p-2 text-white rounded-4 shadow" onClick={()=>navigate("/clientBookingForm")}>Make A Reservation</button>
                </Card.Body>
            </Card>


        </section>
    )
}

export default Pricing;