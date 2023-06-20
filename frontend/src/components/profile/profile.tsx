import "./profile.css";
import { useEffect, useState } from "react";
import { useAuthUser, useSignOut, useIsAuthenticated } from "react-auth-kit";
import { Link } from "react-router-dom";

import axios from "axios";
import { AppBar } from "../home/Navbar/AppBar";
import { SideBar } from "../home/SidebarProfile/Sidebar";
import { ChatFill, GearFill } from "react-bootstrap-icons";
import { Modal } from "react-bootstrap";
export const Profile = () => {
  const maxLength = 400;
  const isSign = useIsAuthenticated();
  const auth: any = useAuthUser();
  const [show, setShow] = useState(false);
  const [showComplain, setShowComplain] = useState(false);
  const [posts, setPosts] = useState<any>();
  const savedPostHandle = async (e: any) => {
    if (isSign()) {
      e.preventDefault();
      const postId = e.target.id;
      const isBlue = e.target.style.color;
      if (isBlue == "blue") {
        alert("zaten kayıtlı");
      } else {
        const post = await axios.post(
          "http://80.253.246.129:3000/post/postSaved",
          {
            postId,
          },
          {
            headers: {
              "x-access-token": auth().token,
            },
          }
        );
        e.target.style.color = "blue";
        if ((post.data.message = "Success saved")) {
          alert("kaydedildi");
        }
      }
    } else {
      alert("giriş yapınız");
    }
  };

  const [complainTitle, setComplainTitle] = useState<any>();
  const [complainDesc, setComplainDesc] = useState<any>();

  const [image,setImage] = useState<any>()

  const complainHandle = async (e: any) => {
    e.preventDefault();
    const complain = await axios.post(
      "http://80.253.246.129:3000/user/postComplain",
      {
        title: complainTitle,
        description: complainDesc,
      },
      {
        headers: {
          "x-access-token": auth().token,
        },
      }
    );
    if (complain.data.getComplain == "Success complain") {
      alert("gönderildi");
      setShowComplain(false);
    }
  };

  const handleClose = () => setShow(false);
  const handleShow = (e:any) => {
    setImage(e.target.src)
    setShow(true);
  }

  const handleComplainShow = () => setShowComplain(true);
  const handleComplainClose = () => setShowComplain(false);

  const [expanded, setExpanded] = useState(false);
  const toggleExpanded = () => {
    setExpanded(!expanded);
  };




  const [user, setUser] = useState<any>();

  const likedHandle = async (e: any) => {
    e.preventDefault();
    const liked = await axios.get(`http://80.253.246.129:3000/post/getLike/`, {
      headers: {
        "x-access-token": auth().token,
      },
    });
    setPosts(liked.data.getLike);
  };
  const postsHandler = async () => {
    const posts = await axios.get(`http://80.253.246.129:3000/post/getUserRelPost/`, {
      headers: {
        "x-access-token": auth().token,
      },
    });
    setPosts(posts.data.getPost)
  }
  const savedHandler = async () => {
    const saved = await axios.get(`http://80.253.246.129:3000/post/getSavedPost/`, {
      headers: {
        "x-access-token": auth().token,
      },
    });
    setPosts(saved.data.savedPost)
  }
  const imagePostHandler = async ()=> {
    const imagePost = await axios.get(`http://80.253.246.129:3000/post/getUserRelImagePost/`, {
      headers: {
        "x-access-token": auth().token,
      },
    });
    setPosts(imagePost.data.getPost)
  } 
  useEffect(() => {
    if (isSign()) {
      axios
        .get("http://80.253.246.129:3000/user/getUserId", {
          headers: {
            "x-access-token": auth().token,
          },
        })
        .then((users: any) => {
          setUser(users.data.user.userId.properties);
        });
    }
  }, []);
  
  const followUserHandle = (e: any) => {
    e.target.className = "btn btn-primary w-25 h-25 disable";
    e.target.innerHTML = "takip ediliyor";
  };
  return (
    <>
      <AppBar />

      <div className="container ">
        <div className="row">
          <SideBar />
          <div className="col-md-8 mt-5" style={{ marginLeft: "-137px" }}>
            <h3>{auth().nickname}</h3>
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
            {user && user.bio ? (
                <textarea
                  name=""
                  style={{ resize: "none", height: "100px", width: "350px" }}
                  value={user.bio}
                ></textarea>
              ):(<textarea
                name=""
                style={{ resize: "none", height: "100px", width: "350px" }}
                value=""
              ></textarea>)}
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
                <li className="lists-item" onClick={postsHandler} style={{fontWeight:"bold"}}>gönderiler</li>
                <li className="lists-item">
                  <span onClick={likedHandle} style={{fontWeight:"bold"}} >begeniler</span>
                </li>
                <li className="lists-item" onClick={imagePostHandler} style={{fontWeight:"bold"}}>fotoğraflar</li>
                <li className="lists-item" onClick={savedHandler} style={{fontWeight:"bold"}}>kaydedilenler</li>
              </ul>
            </div>
            {posts &&
        posts.map((post: any, key: any) => (
          <section className="main-content" style={{width:'46rem',marginLeft:'50px'}} key={key}>
            <div className="">
              <div className="d-flex justify-content-between">
                <div className="d-flex mb-3">
                  <div className="d-flex" style={{ marginLeft: 550 }}>
                    <a
                      href={"/profile/" + post[0].id}
                      className="text-dark"
                      style={{ fontSize: 11,marginTop:20 }}
                    >
                      {post[0].nickname}
                      <pre>5m</pre>
                    </a>
                    <h5 className="mb-0 mx-2" style={{marginTop:20}}>
                      {post[0].image == "null" ? (
                        <img
                          width={50}
                          height={50}
                          className="rounded-circle"
                          src="/1.jpeg"
                        />
                      ) : (
                        <img
                          width={50}
                          height={50}
                          onClick={(e:any)=>{handleShow(e)}}
                          src={
                            "http://80.253.246.129:3000/public/users/" +
                            post[0].image
                          }
                          className="rounded-circle"
                        />
                      )}
                    </h5>
                  </div>
                </div>
              </div>

              <div className="post-block__content mb-2 text-start">
                <h4 className="mt-2">{post[1].title}</h4>
                <p onClick={toggleExpanded}>
                  {expanded ? (
                    <>{post[1].description}</>
                  ) : (
                    <>
                      {post[1].description.length > maxLength
                        ? post[1].description.slice(0, maxLength)+" [ Devamını oku... ]"
                        : post[1].description}
                    </>
                  )}
                </p>
                {post[1].image == "null" ? (
                  <img
                    width={300}
                    height={300}
                    onClick={handleShow}
                    src=""
                    style={{ display: "none" }}
                  />
                ) : (
                  <img
                    width={200}
                    height={100}
                    onClick={handleShow}
                    src={
                      "http://80.253.246.129:3000/public/posts/" + post[1].image
                    }
                  />
                )}

                <div className="post-block__content mb-2 ms-3">
                  <p
                    className="mt-4 text-muted"
                    style={{ display: "inline-block" }}
                  >
                    <i
                      id={post[1].id}
                     
                      className="fa-solid fa-heart"
                    ></i>
                  </p>
                  <p
                    className="mb-0 mx-4 text-muted"
                    style={{ display: "inline-block" }}
                  >
                    <i
                      className="fa-solid fa-bookmark"
                      id={post[1].id}
                      onClick={savedPostHandle}
                    ></i>
                  </p>
                  <p
                    className="mb-0 mx-0 text-muted"
                    style={{ display: "inline-block" }}
                  >
                    <i className="fa-solid fa-share"></i>
                  </p>
                  {isSign() ? (
                    <p
                      className="mb-0 mx-0 text-muted"
                      style={{ display: "inline-block", paddingLeft: 500 }}
                    >
                      <div className="dropdown">
                        <a
                          className="text-muted"
                          style={{ display: "inline-block", margin: "2px" }}
                          href="#"
                          role="button"
                          id="dropdownMenuLink"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <i className="fa-solid fa-ellipsis"></i>
                        </a>
                        <ul
                          className="dropdown-menu"
                          aria-labelledby="dropdownMenuLink"
                        >
                          <li>
                            <a
                              className="dropdown-item"
                              onClick={handleComplainShow}
                              href="#"
                            >
                              Şikayet Et
                            </a>
                          </li>
                        </ul>
                      </div>
                    </p>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
              
              <Modal  fullscreen show={show}  className="text-center" onHide={handleClose}>
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                  <img
                    style={{width:'100%',height:'100%'}}
                    src={image}
                  />
                </Modal.Body>
              </Modal>
              
              <Modal
                show={showComplain}
                className="text-center"
                onHide={handleComplainClose}
              >
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                  <form>
                    <div className="mb-3">
                      <label className="form-label">Şikayet nedeni</label>
                      <input
                        type="text"
                        value={complainTitle}
                        onChange={(e: any) => setComplainTitle(e.target.value)}
                        className="form-control"
                        aria-describedby="emailHelp"
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Açıklama</label>
                      <input
                        type="text"
                        value={complainDesc}
                        onChange={(e: any) => setComplainDesc(e.target.value)}
                        className="form-control"
                        id="exampleInputPassword1"
                      />
                    </div>
                    <button
                      type="submit"
                      onClick={complainHandle}
                      className="btn btn-primary"
                    >
                      Gönder
                    </button>
                  </form>
                </Modal.Body>
              </Modal>
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
                  style={{ backgroundColor: "#0d6df3" }}
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
        ))}
          </div>
        </div>
      </div>
    </>
  );
};
