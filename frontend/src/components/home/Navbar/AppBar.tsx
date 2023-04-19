import { Link } from 'react-router-dom'
import {useAuthUser,useIsAuthenticated,useSignOut } from 'react-auth-kit'
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


export const AppBar = () => {
    const auth:any = useAuthUser()
    const isAuthenticated = useIsAuthenticated()
    const signOut = useSignOut()
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
                            <Nav.Link href="#action2" style={{ marginLeft: '37rem',width:'22rem' }}>
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
                        <Nav >
                            {
                                isAuthenticated() ? (
                                    <>
                                        <Link to="/profile" style={{ marginLeft: '5rem',color:'blue' }}>{auth().nickname}</Link>
                                        <Link to="" onClick={() => signOut()} style={{ marginLeft: '1rem',color:'blue' }}>Logout</Link>
                                       
                                    </>
                                ) : (
                                    <>
                                    <Link to="/signin" style={{ marginLeft: '5rem',color:'blue' }}>Giriş Yap</Link>
                                    <Link to="/signup" style={{ marginLeft: '1rem',color:'blue' }}>Kayıt Ol</Link>
                                    </>
                                )
                            }
                           
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            
            <Navbar collapseOnSelect expand="lg" style={{backgroundColor:'#fff'}} variant="dark">
                <Container fluid>

                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="#action2" style={{ marginLeft: '18rem',color:'blue' }}>X1</Nav.Link>
                            <Nav.Link href="#action2" style={{ marginLeft: '7rem',color:'blue' }}>X2</Nav.Link>
                            <Nav.Link href="#action2" style={{ marginLeft: '7rem',color:'blue' }}>X3</Nav.Link>
                            <Nav.Link href="#action2" style={{ marginLeft: '7rem',color:'blue' }}>X4</Nav.Link>
                            <Nav.Link href="#action2" style={{ marginLeft: '7rem',color:'blue' }}>X5</Nav.Link>
                            <Nav.Link href="#action2" style={{ marginLeft: '7rem',color:'blue' }}>X6</Nav.Link>

                            <Nav.Link href="#action2" style={{ marginLeft: '19rem',color:'blue' }}>X7</Nav.Link>
                            <Nav.Link href="#action2" style={{ marginLeft: '4rem',color:'blue' }}>X8</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
        /* */
    )
}
/*  */