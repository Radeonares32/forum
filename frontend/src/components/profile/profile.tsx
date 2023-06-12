import './profile.css'
import { useState } from "react";
import { useAuthUser, useSignOut } from "react-auth-kit";
import { Link } from 'react-router-dom'

import axios from "axios";
import { AppBar } from "../home/Navbar/AppBar";
import { SideBar } from '../home/Sidebar/Sidebar'
import {
  ChatFill
} from "react-bootstrap-icons";

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
  const [posts, setPosts] = useState<any>()

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
    const user = await axios.put("http://80.253.246.129:3000/user/putUser", {
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
  const likedHandle = async (e: any) => {
    e.preventDefault()
    const liked = await axios.get(`http://80.253.246.129:3000/post/getLike/`, {
      headers: {
        'x-access-token': auth().token
      }
    })
    setPosts(liked.data.getLike)
    console.log(liked)
  }
  const followUserHandle = (e:any) => {
    e.target.className = 'btn btn-primary w-25 h-25 disable'
    e.target.innerHTML = 'takip ediliyor'
  }
  return (
    <>
      <AppBar />

      <div className="container ">
        <div className="row">
          <SideBar />
          <div className="col-md-8 mt-5">
            <h3>{auth().nickname}</h3>
            <div className="d-flex justify-content-between">
              <h6>834 gonderi- 32 takipçi - 3 takip</h6>
              <img src="img/logo/logo.png" className="img-responsive" width={100} height={100} />
            </div>
            <span>biyografi:</span>

            <div className="d-flex justify-content-between">
              <textarea name="" cols={20} rows={5} value={"bilgin olsun burası biyografi kısmı"}></textarea>
              <Link to='/chat' className="nav-item text-decoration-none " style={{ marginLeft: '15rem' }}>
                <ChatFill color="#0d6df3" size={25} />
              </Link>
              <button  onClick={followUserHandle} className="btn btn-primary w-25 h-25" style={{ backgroundColor: '#0d6df3', border: '0' }}>takip et</button>
            </div>

            <div className="d-flex-justify-content-between mt-5 border-bottom border-top border-2 border-dark ">
              <ul className="d-flex justify-content-around lists">
                <li className='lists-item' >gönderiler</li>
                <li  className='lists-item'><span onClick={likedHandle}>begeniler</span></li>
                <li className='lists-item'>fotoğraflar</li>
                <li className='lists-item'>kaydedilenler</li>
              </ul>
            </div>
            {posts && posts.map((post: any, key: any) => (
              <section className="main-content" key={key}>
                <div className="post-block">
                  <div className="d-flex justify-content-between">
                    <div className="d-flex mb-3">

                      <div className="d-flex" style={{ marginLeft: 400 }}>

                        <a href="#!" className="text-dark" style={{ fontSize: 11 }}>
                          {post[1].nickname}
                          <pre>5m</pre>
                        </a>
                        <h5 className="mb-0">
                          {post[1].image !== null ? (
                            <img
                              width={50}
                              height={50}
                              src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
                            />
                          ) : (
                            <img
                              width={50}
                              height={50}
                              src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg" style={{ display: 'none' }}
                            />
                          )}


                        </h5>

                      </div>
                    </div>
                  </div>
                  <div className="post-block__content mb-2 text-start">
                    <h4 className="mt-2">{post[0].title}</h4>
                    <p>{post[0].description}</p>
                    {post[0].image == 'null' ? (
                      <img width={300} height={300} src="" style={{ display: 'none' }} />
                    ) : (
                      <img width={400} height={400} src={'http://80.253.246.129:3000/public/posts/' + post[0].image} />

                    )}

                    <div className="post-block__content mb-2 ms-3">
                      <p
                        className="mt-4 text-muted"

                        style={{ display: "inline-block" }}

                      >
                        <i id={post[0].id} className="fa-solid fa-heart" style={{ color: 'red' }}></i>
                      </p>
                      <p
                        className="mb-0 mx-4 text-muted"
                        style={{ display: "inline-block" }}
                      >
                        <i className="fa-solid fa-bookmark" id={post[0].id}></i>
                      </p>
                      <p
                        className="mb-0 mx-0 text-muted"
                        style={{ display: "inline-block" }}
                      >
                        <i className="fa-solid fa-share"></i>
                      </p>


                    </div>
                  </div>
                  <hr />
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
