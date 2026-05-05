import {
  Navbar,
  NavbarBrand,
  Nav,
  Container,
  Offcanvas
} from "react-bootstrap";
import { Link } from "react-router";

const NavigationMenu=()=> {
  return (
    <Navbar expand="lg" bg="light" className="p-3 sticky-top">
      <Container>

        <NavbarBrand className="fw-bold text-primary">
          Shimoni Gate Away Homes
        </NavbarBrand>

        <Navbar.Toggle aria-controls="offcanvasNavbar" />
<Navbar.Offcanvas
  id="offcanvasNavbar"
  aria-labelledby="offcanvasNavbarLabel"
  placement="start" 
>
  <Offcanvas.Header closeButton>
    <Offcanvas.Title id="offcanvasNavbarLabel">
      Menu
    </Offcanvas.Title>
  </Offcanvas.Header>

  <Offcanvas.Body>
    <Nav className="justify-content-end flex-grow-1">
      <Link to="/" className="nav-link">Home</Link>
      <Link to="/rooms" className="nav-link">Rooms</Link>
      <Link to="/amenities" className="nav-link">Amenities</Link>
      <Link to="/reviews" className="nav-link">Reviews</Link>
      <Link to="/bookNow" className="nav-link">Book Now</Link>
      <Link to="/reviewForm" className="nav-link">Add A Review</Link>
      <Link to="/manageRental" className="nav-link">Manage Rental</Link>

    </Nav>
  </Offcanvas.Body>
</Navbar.Offcanvas>

      </Container>
    </Navbar>
  );
}

export default NavigationMenu;