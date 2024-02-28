import kpologo from '../assets/kpo-logo.svg';
import { Navbar, Nav, Container } from "react-bootstrap";
import { useLocation } from "react-router-dom";

export const Header = () => {
    const location = useLocation();
    return (
        <Navbar expand="lg" className="bg-body-tertiary navbar-custom">
            <Container fluid>
                <Navbar.Brand >
                    <img src={kpologo} width={46} height={29} />
                </Navbar.Brand>
                <Nav activeKey={location.pathname} className="me-auto">
                    <Nav.Link href="/" className="navbar-item-main">Home</Nav.Link>
                    <Nav.Link href="/inputs" className="navbar-item-main">Inputs</Nav.Link>
                    <Nav.Link href="/scenario" className="navbar-item-main">Scenario</Nav.Link>
                    <Nav.Link href="/servers" className="navbar-item-main">Servers</Nav.Link>
                </Nav>
                <Nav>
                    <Nav.Link href="#">Logout</Nav.Link>
                    
                </Nav>
            </Container>
        </Navbar>
    )
}
