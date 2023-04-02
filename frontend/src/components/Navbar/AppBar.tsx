import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Person,Bell,Gear } from 'react-bootstrap-icons';

export const AppBar = () => {
    return (
        <>
        <Navbar collapseOnSelect expand="lg" style={{backgroundColor:'#fff'}} variant="dark">
                <Container fluid>
                <Navbar.Brand style={{color:'black'}} href="#home"><img
              src="/img/logo/logo.png"
              width="100"
              height="70"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            /></Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">

                            <Nav.Link href="#action1" style={{ marginLeft: '3rem',color:"black" }}>Canlı Veri</Nav.Link>
                            
                            <Nav.Link href="#action2" style={{ marginLeft: '45rem',color:"black" }}>Canlı Veri</Nav.Link>
                        

                            <Nav.Link href="#action2" style={{ marginLeft: '40rem',color:"black" }}>Canlı Veri</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Navbar collapseOnSelect expand="lg" style={{backgroundColor:'#fff'}} variant="dark">
                <Container fluid>
                   
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="#action2" style={{ marginLeft: '57rem',width:'22rem' }}>
                                <Form className="d-flex">
                                    <Form.Control
                                        style={{backgroundColor:'#fff',border:'2px solid blue',borderRadius:'20px'}}
                                        type="search"
                                        placeholder="Search"
                                        className="me-2"
                                        aria-label="Search"
                                    />
                                </Form>
                            </Nav.Link>
                        </Nav>
                        <Nav>
                            <Nav.Link href="#deets"><Person  size={34} color='blue' /></Nav.Link>
                            <Nav.Link  href="#memes">
                            <Bell size={31} color='blue' />
                            </Nav.Link>
                            <Nav.Link  href="#memes">
                            <Gear size={31} color='blue' />
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            
            <Navbar collapseOnSelect expand="lg" style={{backgroundColor:'#fff'}} variant="dark">
                <Container fluid>

                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="#action2" style={{ marginLeft: '40rem',color:'blue' }}>X1</Nav.Link>
                            <Nav.Link href="#action2" style={{ marginLeft: '7rem',color:'blue' }}>X2</Nav.Link>
                            <Nav.Link href="#action2" style={{ marginLeft: '7rem',color:'blue' }}>X3</Nav.Link>
                            <Nav.Link href="#action2" style={{ marginLeft: '7rem',color:'blue' }}>X4</Nav.Link>
                            <Nav.Link href="#action2" style={{ marginLeft: '7rem',color:'blue' }}>X5</Nav.Link>
                            <Nav.Link href="#action2" style={{ marginLeft: '7rem',color:'blue' }}>X6</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
        /* */
    )
}
/*  */