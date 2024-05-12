import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './Navbar.css'
function NavScrollExample() {
    return (
        <Navbar className='p-3 nav1'>
            <Container>
                <Navbar.Brand className='band text'>TODO APP</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link as={Link} to="/register" >Register</Nav.Link>
                    <Nav.Link as={Link} to="/login">Login</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    );
}

export default NavScrollExample;

