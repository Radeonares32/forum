import { Link } from "react-router-dom";
import { useAuthUser, useIsAuthenticated, useSignOut } from "react-auth-kit";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import './appbar.css'
import {
  PersonFill,
  GearFill,
  BellFill,
  ChatFill,
} from "react-bootstrap-icons";

export const AppBar = () => {
  const auth: any = useAuthUser();
  const isAuthenticated = useIsAuthenticated();
  const signOut = useSignOut();
  const logout = () => {
    signOut();
  };
  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        style={{ backgroundColor: "#fff" }}
        variant="dark"
      >
        <Container fluid>
          <Navbar.Brand style={{ color: "black" }} href="#home">
            <img
              src="/img/logo/logo.png"
              width="100"
              height="70"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">

              <Nav.Link
                href="#action2"
                style={{ marginLeft: "24rem", color: "black" }}
              >
                <Nav>
                  {isAuthenticated() ? (
                    <>
                      <Link
                        to="/profile"
                        style={{ marginLeft: "1rem", color: "blue" }}
                      >
                        <PersonFill
                          to="/profile"
                          size={30}
                          style={{ marginLeft: "1rem" }}
                        />
                      </Link>

                      <Link
                        to="/"
                        onClick={logout}
                        style={{ marginLeft: "1rem", color: "blue" }}
                      >
                        <BellFill
                          to="/profile"
                          size={27}
                          style={{ marginLeft: "1rem" }}
                        />
                      </Link>
                      <Link
                        to="/"
                        onClick={logout}
                        style={{ marginLeft: "1rem", color: "blue" }}
                      >
                        <ChatFill
                          to="/profile"
                          size={27}
                          style={{ marginLeft: "1rem" }}
                        />
                      </Link>
                      <Link
                        to="/profile"
                        style={{ marginLeft: "1rem", color: "blue" }}
                      >
                        <GearFill
                          to="/profile"
                          size={27}
                          style={{ marginLeft: "1rem" }}
                        />
                      </Link>
                    </>
                  ) : (
                    <></>
                  )}
                </Nav>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Navbar
        collapseOnSelect
        expand="lg"
        style={{ backgroundColor: "#fff" }}
        variant="dark"
      >
        <Container fluid>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link
                href="#action2"
                style={{ marginLeft: "30rem", width: "22rem" }}
              >
                <Form className="d-flex">
                  <Form.Control
                    style={{
                      backgroundColor: "#fff",
                      border: "2px solid #1D9BF0",
                      borderRadius: "20px",
                    }}
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                  />
                </Form>
              </Nav.Link>
            </Nav>

            <Nav>
              {isAuthenticated() ? (
                <>
                  <Link
                    to="/signin"
                    style={{ marginLeft: "1rem", color: "#1D9BF0" }}
                  >
                    X7
                  </Link>
                  <Link
                    to="/profile"
                    style={{ marginLeft: "1rem", color: "#1D9BF0" }}
                  >
                    {auth().nickname}
                  </Link>

                  <Link
                    to="/"
                    onClick={logout}
                    style={{ marginLeft: "1rem", color: "#1D9BF0" }}
                  >
                    Logout
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/signin"
                    style={{ marginLeft: "1rem", color: "#1D9BF0" }}
                  >
                    X7
                  </Link>
                  <Link
                    to="/signin"
                    style={{ marginLeft: "2rem", color: "#1D9BF0" }}
                  >
                    Giriş Yap
                  </Link>
                  <Link
                    to="/signup"
                    style={{ marginLeft: "1rem", color: "#1D9BF0" }}
                  >
                    Kayıt Ol
                  </Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Navbar
        collapseOnSelect
        expand="lg"
        style={{ backgroundColor: "#fff" }}
        variant="dark"
      >
        <Container fluid>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link
                href="#action2"
                className="xlink"
                style={{
                  marginLeft: "30rem",
                  border: "1px solid black",
                  color: "#1D9BF0",
                 
                }}
              >
                X1
              </Nav.Link>
              <Nav.Link
                href="#action2"
                className="xlink"
                style={{
                  marginLeft: "4rem",
                  border: "1px solid black",
                  color: "#1D9BF0",
                 
                }}
              >
                X2
              </Nav.Link>
              <Nav.Link
                className="xlink"
                href="#action2"
                style={{
                  marginLeft: "4rem",
                  border: "1px solid black",
                  color: "#1D9BF0",
                 
                }}
              >
                X3
              </Nav.Link>
              <Nav.Link
                className="xlink"
                href="#action2"
                style={{
                  marginLeft: "4rem",
                  border: "1px solid black",
                  color: "#1D9BF0",
                 
                }}
              >
                X4
              </Nav.Link>
              <Nav.Link
                className="xlink"
                href="#action2"
                style={{
                  marginLeft: "4rem",
                  border: "1px solid black",
                  color: "#1D9BF0",
                  
                }}
              >
                X5
              </Nav.Link>
              <Nav.Link
                className="xlink"
                href="#action2"
                style={{
                  marginLeft: "4rem",
                  border: "1px solid black",
                  color: "#1D9BF0",
                 
                }}
              >
                X6
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
    /* */
  );
};
/*  */
