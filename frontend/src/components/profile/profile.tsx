import './profile.css'
import { useState } from "react";
import { useAuthUser, useSignOut } from "react-auth-kit";

import axios from "axios";
import { AppBar } from "../home/Navbar/AppBar";
import { SideBar } from '../home/Sidebar/Sidebar'

export const Profile = () => {
  let auth: any = useAuthUser();
  let signOut = useSignOut();
  const [nickname, setNickname] = useState(auth().nickname);
  const [email, setEmail] = useState(auth().email);
  const [date, setDate] = useState(auth().date);
  const [gender, setGender] = useState(auth().gender);
  const [newPassword, setNewPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [message, setMessage] = useState("");

  const submit = async () => {
    if (newPassword === "") {
      alert("new password empty");
    }
    if (oldPassword === "") {
      alert("old password empty");
    }
    if (passwordRepeat === "") {
      alert("password repeat empty");
    }
    const user = await axios.put("http://localhost:3000/user/putUser", {
      id: auth().id,
      nickname: nickname,
      email: email,

      password: passwordRepeat,
      hash: auth().hash,
      oldPassword: oldPassword,
      newPassword: newPassword,
    });
    if (user.data.message === "password not match hash") {
      setMessage("Old Password Wrong");
    } else {
      setMessage("Succces Updated");
      signOut();
    }
  };

  return (
    <>
      <AppBar />

      <div className="container ">
        <div className="row">
          <SideBar />
          <div className="col-md-8 mt-5">
          <h3>Bugra</h3>
            <div className="d-flex justify-content-between">
              <h6>834 gonderi- 32 takipçi - 3 takip</h6>
              <img src="img/logo/logo.png" className="img-responsive" width={100} height={100} />
            </div>
            <span>biyografi:</span>
            <div className="d-flex justify-content-between">
              <textarea name="" cols={20} rows={5}></textarea>
              <button className="btn btn-primary w-25 h-25" style={{backgroundColor:'#1D9BF0',border:'0'}}>takip et</button>
            </div>
            <div className="d-flex-justify-content-between mt-5 border-bottom border-top border-2 border-dark ">
              <ul className="d-flex justify-content-around lists">
                <li className='lists-item' >gönderiler</li>
                <li className='lists-item'>begeniler</li>
                <li className='lists-item'>fotoğraflar</li>
                <li className='lists-item'>kaydedilenler</li>
              </ul>
            </div>
            <section className="main-content">
        <div className="post-block">
          <div className="d-flex justify-content-between">
            <div className="d-flex mb-3">
              <div className="className-2">
                <a href="#!" className="text-dark"></a>
              </div>
              <div style={{ marginLeft: 400 }}>
                <h5 className="mb-0">
                  <img
                    width={50}
                    height={50}
                    src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
                  />
                  <a href="#!" className="text-dark" style={{ fontSize: 10 }}>
                    Ahmet yılmaz
                  </a>
                </h5>
                <p className="mb-0 text-muted" style={{ fontSize: 10 }}>
                  5m
                </p>
              </div>
            </div>
          </div>

          <div className="post-block__content mb-2">
          <img width={300} height={300}  src="logo512.png" />
            
            <p>Bugun havalar iyi gibi ne diyorsunuz</p>
            <div className="post-block__content mb-2">
              <p
                className="mt-4 text-muted"
                style={{ display: "inline-block" }}
              >
                <i className="fa-solid fa-heart"></i>
              </p>
              <p
                className="mb-0 mx-4 text-muted"
                style={{ display: "inline-block" }}
              >
                <i className="fa-solid fa-bookmark"></i>
              </p>
              <p
                className="mb-0 mx-0 text-muted"
                style={{ display: "inline-block" }}
              >
                <i className="fa-solid fa-share"></i>
              </p>
              <p
                className="mb-0 mx-0 text-muted"
                style={{ display: "inline-block", paddingLeft: 350 }}
              >
                <i className="fa-solid fa-ellipsis"></i>
              </p>
            </div>
          </div>
         {/*  <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton></Modal.Header>
              <Modal.Body>
                <img width={300} height={300} src="logo512.png"  />
              </Modal.Body>
            </Modal> */}
          {/* <div className="mb-3">
            <div className="d-flex justify-content-between mb-2">
              <div className="d-flex">
                <a href="#!" className="text-danger mr-2">
                  <span>
                    <i className="fa fa-heart"></i>
                  </span>
                </a>
                <a href="#!" className="text-dark mr-2">
                  <span>Comment</span>
                </a>
              </div>
              <a href="#!" className="text-dark">
                <span>Share</span>
              </a>
            </div> 
            <p className="mb-0">
              Liked by{" "}
              <a href="#!" className="text-muted font-weight-bold">
                John doe
              </a>{" "}
              &{" "}
              <a href="#!" className="text-muted font-weight-bold">
                25 others
              </a>
            </p>
          </div> */}
          <hr />
         {/*  <div className="post-block__comments">
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Add your comment"
              />
              <div className="input-group-append">
                <button
                  className="btn btn-primary"
                  type="button"
                  id="button-addon2"
                  style={{ backgroundColor: "#1D9BF0" }}
                >
                  <i className="">Yorum Yap</i>
                </button>
              </div>
            </div>

            <div className="comment-view-box mb-3">
              <div className="d-flex mb-2">
                <div>
                  <h6 className="mb-1">
                    <img width={50} height={50} src="/logo192.png" />
                    <a href="#!" className="text-dark">
                      Bugra Atik
                    </a>{" "}
                    <small className="text-muted">1m</small>
                  </h6>
                  <p className="mb-1">Güzel, bence havalar</p>
                  <div className="d-flex">
                    <a href="#!" className="text-dark mr-2">
                      <span></span>
                    </a>
                    <a href="#!" className="text-dark mr-2">
                      <span>Cevapla</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <hr />
            <a href="#!" className="text-dark">
              Diğer Yorumlar <span className="font-weight-bold">(12)</span>
            </a>
          </div> */}
        </div>
      </section>
          </div>
        </div>
      </div>
    </>
  );
};
