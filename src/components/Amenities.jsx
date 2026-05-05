import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card,Row,Col } from 'react-bootstrap';
const Amenities = () => {
    const amenities=[
        {
            amenityName:"Wifi",
            icon:"wifi"
        },
        {
            amenityName:"Hot Shower",
            icon:"shower"
        },
        {
            amenityName:"Laundry Facility",
            icon:"tshirt"
        },
        {
            amenityName:"Work Place",
            icon:"laptop"
        },
        {
            amenityName:"Barbecue",
            icon:"fire"
        },
        {
            amenityName:"Scenic View",
            icon:"tree"
        }
    ]
  return (
    <section className="p-4 bg-light m-2">
        <h3 className="lead fs-3 fw-bold">What do we have to offer?</h3>
     <Row>
        {amenities.map((amenity,index)=>(
            <Col key={index} md={4} className='mb-3 p-3'>
                <Card className='w-100 card-hover'>
                    <Card.Body  className="d-flex flex-column">
                   <Card.Text className='fs-5 '><FontAwesomeIcon icon={amenity.icon }/></Card.Text>   
                   <Card.Text>{amenity.amenityName}</Card.Text>   

                    </Card.Body>

                </Card>
            </Col>
        ))}
     </Row>
    </section>
  )
}

export default Amenities