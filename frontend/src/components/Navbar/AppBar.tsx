import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Person,Bell,Gear } from 'react-bootstrap-icons';

export const AppBar = () => {
    return (
        <>
            <Navbar collapseOnSelect expand="lg" style={{backgroundColor:'#341e36'}} variant="dark">
                <Container fluid>
                    <Navbar.Brand className='' href="#home">React-Bootstrap</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="#action2" style={{ marginLeft: '46rem',width:'22rem' }}>
                                <Form className="d-flex">
                                    <Form.Control
                                        style={{backgroundColor:'#341e36',border:'0px'}}
                                        type="search"
                                        placeholder="Search"
                                        className="me-2"
                                        aria-label="Search"
                                    />
                                </Form>
                            </Nav.Link>
                        </Nav>
                        <Nav>
                            <Nav.Link href="#deets"><Person  size={34} /></Nav.Link>
                            <Nav.Link  href="#memes">
                            <Bell size={31} />
                            </Nav.Link>
                            <Nav.Link  href="#memes">
                            <Gear size={31} />
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Navbar collapseOnSelect expand="lg" style={{backgroundColor:'#341e36'}} variant="dark">
                <Container fluid>

                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">

                            <Nav.Link href="#action1" style={{ marginLeft: '1rem' }}>süslü</Nav.Link>
                            <Nav.Link href="#action2" style={{ marginLeft: '1rem' }}>konudışı</Nav.Link>
                            <Nav.Link href="#action2" style={{ marginLeft: '1rem' }}>soru-cevap</Nav.Link>
                            <Nav.Link href="#action2" style={{ marginLeft: '30rem' }}>süslü akış</Nav.Link>
                            <Nav.Link href="#action2" style={{ marginLeft: '5rem' }}>konu dışı akış</Nav.Link>

                            <Nav.Link href="#action2" style={{ marginLeft: '5rem' }}>soru cevap</Nav.Link>
                            <Nav.Link href="#action2" style={{ marginLeft: '5rem' }}>medya akış</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
        /* */
    )
}
/*  */