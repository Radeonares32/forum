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
  ThreeDots
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
      <nav className="navbar navbar-expand-lg navbar-light ">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img src="img/logo/logo.png" alt="" width="50" height="50" />
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-link" id="search">
                <form className="d-flex">
                  <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                </form>
              </li>
            </ul>
            {isAuthenticated() ? (
              <>
                <Link to='/profile' className="nav-item text-decoration-none mx-3">
                  <a className="nav-link active" aria-current="page" href="#" style={{ color: '#1D9BF0' }}>Profil</a>
                </Link>
                <a onClick={() => logout()} className="nav-item text-decoration-none mx-3">
                  <a className="nav-link active" aria-current="page" href="#" style={{ color: '#1D9BF0' }}>Çıkış Yap</a>
                </a>

              </>) : (
              <>
                <Link to='/signin' className="nav-item text-decoration-none mx-3">
                  <a className="nav-link active" aria-current="page" href="#" style={{ color: '#1D9BF0' }}>Giriş Yap</a>
                </Link>
                <Link to='/signup' className="nav-item text-decoration-none">
                  <a className="nav-link active" aria-current="page" href="#" style={{ color: '#1D9BF0' }}>Kayıt Ol</a>
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
      <nav className="navbar navbar-expand-lg navbar-light d-flex border-bottom border-2 border-dark">
        <div className="container-fluid">

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse d-flex justify-content-evenly" id="navbarSupportedContent">
            <ul className="navbar-nav mb-2 mb-lg-0 d-flex justify-content-evenly">
              <li className="nav-item  d-flex me-5 ">
                <a className="nav-link active links" aria-current="page" href="#">debe</a>
              </li>
              <li className="nav-item  me-5">
                <a className="nav-link active links" aria-current="page" href="#">sorunlar</a>
              </li>
              <li className="nav-item  me-5">
                <a className="nav-link active links" aria-current="page" href="#">#spor</a>
              </li>
              <li className="nav-item  me-5">
                <a className="nav-link active links" aria-current="page" href="#">#ilişkiler</a>
              </li>
              <li className="nav-item  me-5">
                <a className="nav-link active links" aria-current="page" href="#">#siyaset</a>
              </li>
              <li className="nav-item  me-5">
                <a className="nav-link active links" aria-current="page" href="#">dert</a>
              </li>
              <li className="nav-item  me-5">
                <a className="nav-link active links" aria-current="page" href="#">...</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>


    </>

  );
};
