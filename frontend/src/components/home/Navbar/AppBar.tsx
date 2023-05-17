import { Link } from "react-router-dom";
import { useAuthUser, useIsAuthenticated, useSignOut } from "react-auth-kit";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { PersonFill, GearFill, BellFill } from "react-bootstrap-icons";

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
                href="#action1"
                style={{ marginLeft: "3rem", color: "black" }}
              >
                Canlı Veri
              </Nav.Link>

              <Nav.Link
                href="#action2"
                style={{ marginLeft: "24rem", color: "black" }}
              >
                Canlı Veri
              </Nav.Link>

              <Nav.Link
                href="#action2"
                style={{ marginLeft: "30rem", color: "black" }}
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
                        to="/profile"
                        style={{ marginLeft: "1rem", color: "blue" }}
                      >
                        <GearFill
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
                        <BellFill
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
                      border: "2px solid blue",
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
                    to="/profile"
                    style={{ marginLeft: "5rem", color: "blue" }}
                  >
                    {auth().nickname}
                  </Link>

                  <Link
                    to="/"
                    onClick={logout}
                    style={{ marginLeft: "1rem", color: "blue" }}
                  >
                    Logout
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/signin"
                    style={{ marginLeft: "1rem", color: "blue" }}
                  >
                    X7
                  </Link>
                  <Link
                    to="/signin"
                    style={{ marginLeft: "2rem", color: "blue" }}
                  >
                    Giriş Yap
                  </Link>
                  <Link
                    to="/signup"
                    style={{ marginLeft: "1rem", color: "blue" }}
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
                style={{
                  marginLeft: "30rem",
                  border: "1px solid #fff",
                  color: "blue",
                }}
              >
                X1
              </Nav.Link>
              <Nav.Link
                href="#action2"
                style={{
                  marginLeft: "4rem",
                  border: "1px solid #fff",
                  color: "blue",
                }}
              >
                X2
              </Nav.Link>
              <Nav.Link
                href="#action2"
                style={{
                  marginLeft: "4rem",
                  border: "1px solid #fff",
                  color: "blue",
                }}
              >
                X3
              </Nav.Link>
              <Nav.Link
                href="#action2"
                style={{
                  marginLeft: "4rem",
                  border: "1px solid #fff",
                  color: "blue",
                }}
              >
                X4
              </Nav.Link>
              <Nav.Link
                href="#action2"
                style={{
                  marginLeft: "4rem",
                  border: "1px solid #fff",
                  color: "blue",
                }}
              >
                X5
              </Nav.Link>
              <Nav.Link
                href="#action2"
                style={{
                  marginLeft: "4rem",
                  border: "1px solid #fff",
                  color: "blue",
                }}
              >
                X6
              </Nav.Link>

              <Nav.Link
                href="#action2"
                style={{
                  marginLeft: "4rem",
                  border: "1px solid #fff",
                  color: "blue",
                }}
              >
                X8
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
