import "./profile.css";
import { useEffect, useState } from "react";
import { useAuthUser, useSignOut, useIsAuthenticated } from "react-auth-kit";
import { Link, useParams } from "react-router-dom";

import axios from "axios";
import { AppBar } from "../home/Navbar/AppBar";
import { SideBar } from "../home/SidebarProfile/Sidebar";
import { ChatFill, GearFill } from "react-bootstrap-icons";

export const Profileglobal = () => {
  const { id } = useParams();

  const [user, setUser] = useState<any>();

  useEffect(() => {
    axios.get(`http://80.253.246.129:3000/user/${id}`).then((users: any) => {
      setUser(users.data.user[0][0]);
    });
  }, [id]);
  const followUserHandle = (e: any) => {
    e.target.className = "btn btn-primary w-25 h-25 disable";
    e.target.innerHTML = "takip ediliyor";
  };
  console.log(user)
  return (
    <>
      <AppBar />

      <div className="container ">
        <div className="row">
          <SideBar />
          <div className="col-md-8 mt-5" style={{ marginLeft: "-137px" }}>
            <h3>{user && user.nickname}</h3>
            <div className="d-flex justify-content-between rounded-circle">
              <h6>834 gönderi- 32 takipçi - 3 takip</h6>
              { user && user.image != 'null' ? (
                <img
                  src={"http://80.253.246.129:3000/public/users/" + user.image}
                  className="img-responsive rounded-circle"
                  width={100}
                  height={100}
                />
              ) : (
                <img width={100} height={100} src="/1.jpeg" />
              )}
            </div>
            <span style={{fontWeight:"bold"}}>biyografi:</span>

            <div className="d-flex justify-content-between">
              {user && (
                <textarea
                  name=""
                  style={{ resize: "none", height: "100px", width: "350px" }}
                  value={user.bio}
                ></textarea>
              )}
              <Link
                to="/chat"
                className="nav-item text-decoration-none "
                style={{ marginLeft: "7rem" }}
              >
                <ChatFill color="#0d6df3" size={25} />
              </Link>
              <button
                onClick={followUserHandle}
                className="btn btn-primary w-25 h-25"
                style={{ backgroundColor: "#0d6df3", border: "0" }}
              >
                takip et
              </button>
            </div>

            <div className="d-flex-justify-content-between mt-5 border-bottom border-top border-2 border-dark ">
              <ul className="d-flex justify-content-around lists">
                <li style={{fontWeight:"bold"}} className="lists-item">gönderiler</li>
                <li  className="lists-item">
                  <span style={{fontWeight:"bold"}}>begeniler</span>
                </li>
                <li className="lists-item" style={{fontWeight:"bold"}}>fotoğraflar</li>
                <li className="lists-item" style={{fontWeight:"bold"}}>kaydedilenler</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
