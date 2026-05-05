import { Card, Row,Col } from "react-bootstrap";

const Gallery=()=>{
    const roomImages=[
        "/livingRoom.png",
        "/kitchen.png",
        "/bedroom.png",
        "/bathroom.png",
        "/balcony.png",
        "/swimmingpool.png"
    ];
    return(
        <section className="bg-light p-4 m-2">
            <h3 className="fs-3 fw-bold">Take A Look At Our Rooms</h3>
            <Row>
                {roomImages.map((roomImage,index)=>(
                    <Col key={index} md={4}>
                    <Card className="card shadow mb-2">
                        <Card.Body>
                            <Card.Img src={roomImage} className="img-fluid"/>
                        </Card.Body>
                    </Card>
                    </Col>
                ))}
            </Row>
        </section>
    )
}

export default Gallery;