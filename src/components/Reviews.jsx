import { Card,Row,Col } from "react-bootstrap";

const Reviews=()=>{
    const clients=[
        {
            clientName:"Mark  and Wandia",
            image:"/couple1.png",
            review:"A truly magical getaway! The balcony with its stunning sunset views made every evening special. The cottage was cozy and immaculately clean, and we loved the quiet, private setting. Perfect for couples looking to unwind and reconnect."
        },
        {
            clientName:"The Baraza Family",
            image:"/family.png",
            review:"We had an unforgettable stay! The kids loved running around the garden while we enjoyed the peaceful balcony overlooking the lake. The house was spotless, and the host was incredibly welcoming. It felt like a home away from home"
        },
        {
            clientName:"Nairobi Software Development Agency Group",
            image:"/company.png",
            review:"Perfect spot for our team retreat! The workspace was quiet and well-equipped, and after our meetings, we relaxed on the balcony watching the sunset over Shimoni. The location was convenient, and the host made the check-in seamless. Highly recommend for small groups!"
        }
    ]
    return(
        <>
        <section className="bg-light p-3 m-3">
               <h3 className="lead fs-3 fw-bold mb-3">See What Our Clients Say About Us</h3>
            <Row className="mt-3">
              {clients.map((client,index)=>(
                <Col key={index} md={4}>
                    <Card className="card-shadow mb-2">
                        <Card.Body>
                            <Card.Img className="img-fluid" src={client.image}/>
                            <Card.Text className="fw-bold fs-3">{client.clientName}</Card.Text>
                            <Card.Text>{client.review}</Card.Text>
                        </Card.Body>
                    </Card>
                
                </Col>

              ))}
            </Row>

        </section>
        </>
    )
}

export default Reviews;