import { Link } from "react-router-dom";
import { useAuthUser, useIsAuthenticated, useSignOut } from "react-auth-kit";
import axios from 'axios'
import './appbar.css'
import {
  ChatFill,
  Search,
  PersonFill
} from "react-bootstrap-icons";
import { useEffect, useState } from "react";

export const AppBar = () => {
  const auth: any = useAuthUser();
  const isAuthenticated = useIsAuthenticated();
  const signOut = useSignOut();
  const [categories, setCategories] = useState<any>()
  const logout = () => {
    signOut();
  };
  useEffect(() => {
    axios.get(`http://80.253.246.129:3000/category/getMainCategory`, {

    }).then((cat: any) => {

      setCategories(cat.data.category)
    })
  }, [])
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light ">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            <img src="../../img/logo/logo.jpeg" alt="" width="80" height="80" />
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-link" id="search">
              <form className="d-flex">
                  <div className="input-group input-group-sm rounded-pill overflow-hidden border">
                  
                    <input
                      type="search"
                      className="form-control hide-focus  border-0"
                      placeholder="Ara"
                    />
                    <span
                      className="input-group-text bg-white border-0 ps-1"
                      id="basic-addon1"
                    ><Search/></span>
                  </div>
                </form>
              </li>
            </ul>
            {isAuthenticated() ? (
              <>
                <Link to='/chat' className="nav-item text-decoration-none mx-3">
                  <ChatFill color="#0d6df3" size={23} />
                </Link>
                <Link to='/profile' className="nav-item text-decoration-none mx-3">
                  <PersonFill color="#0d6df3" size={25} />
                </Link>
                <a onClick={() => logout()} className="nav-item text-decoration-none mx-3">
                  <a className="nav-link active" aria-current="page" href="#" style={{ color: '#0d6df3' }}>Çıkış Yap</a>
                </a>

              </>) : (
              <>
                <Link to='/signin' className="nav-item text-decoration-none mx-3">
                  <a className="nav-link active" aria-current="page" href="#" style={{ color: '#0d6df3' }}>Giriş Yap</a>
                </Link>
                <Link to='/signup' className="nav-item text-decoration-none">
                  <a className="nav-link active" aria-current="page" href="#" style={{ color: '#0d6df3' }}>Kayıt Ol</a>
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
      <nav className="navbar navbar-expand-lg navbar-light d-flex ">
        <div className="container-fluid">

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse d-flex justify-content-evenly" id="navbarSupportedContent">
            <ul className="navbar-nav mb-2 mb-lg-0 d-flex justify-content-evenly border-bottom border-2 border-dark ">
              {categories && categories.map((cat: any, key: any) => (
                <Link to={'/main/' + cat[0].id} key={key} className="nav-link  d-flex me-5 links " style={{ listStyleType: 'none' }}>
                  <p className="nav-link active " aria-current="page">{cat[0].title}</p>
                </Link>
              ))}
              {isAuthenticated() ? (

                <li className="nav-item  me-5 mt-3 links">

                  <div className="dropdown">
                    <a className="text-muted" style={{ display: 'inline-block', margin: '2px' }} href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                      <i className="fa-solid fa-ellipsis ms-3"></i>
                    </a>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                      {categories && categories.map((cat: any, key: any) => (
                        <Link to={'/posts/' + cat[0].id} key={key}><a className="dropdown-item" href="#">#{cat[0].title}</a></Link>
                      ))}
                    </ul>
                  </div>
                </li>
              ) : (
                <></>

              )}

            </ul>
          </div>
        </div>
      </nav>


    </>

  );
};
