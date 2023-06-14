import { useEffect, useState } from "react";
import { AppBar } from "../Navbar/AppBar";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useIsAuthenticated, useAuthUser } from "react-auth-kit";
import { Modal } from "react-bootstrap";
import { SideBarPost } from "../SidebarPost/SidebarPost";
import { Plus} from "react-bootstrap-icons";
import './subposts.css'

export const Subposts = () => {
  const [postTitle, setPostTitle] = useState<any>();
  const [postDesc, setPostDesc] = useState<any>();
  const [postImage, setPostImage] = useState<any>();
  const [posts, setPost] = useState<any>();
  const [complainTitle, setComplainTitle] = useState<any>();
  const [complainDesc, setComplainDesc] = useState<any>();
  const [showComplain, setShowComplain] = useState(false);
  const isSign = useIsAuthenticated();
  const auth: any = useAuthUser();

  const { categoryId } = useParams<any>();

  /* setcategoryId(categoryId) */

  const handleComplainShow = () => setShowComplain(true);
  const handleComplainClose = () => setShowComplain(false);

  useEffect(() => {
    axios
      .get(`http://80.253.246.129:3000/post/getCategoryRel/${categoryId}`, {})
      .then((post: any) => {
        setPost(post.data.getLike);
      });
  }, [categoryId]);

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
  const postClickHandle = async (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    if (postImage) {
      formData.append("title", postTitle);
      formData.append("description", postDesc);
      formData.append("image", postImage);
      formData.append("categoryId", categoryId as any);
      const post = await axios.post(
        "http://80.253.246.129:3000/post/postPost",
        formData,
        {
          headers: {
            "x-access-token": auth().token,
          },
        }
      );
      if (post.data.message == "Success created") {
        alert("Post oluşturuldu");
      }
    } else {
      formData.append("title", postTitle);
      formData.append("description", postDesc);
      formData.append("categoryId", categoryId as any);
      const post = await axios.post(
        "http://80.253.246.129:3000/post/postPost",
        formData,
        {
          headers: {
            "x-access-token": auth().token,
          },
        }
      );
      if (post.data.message == "Success created") {
        alert("Post oluşturuldu");
      }
    }
  };
  const likePostHandle = async (e: any) => {
    if (isSign()) {
      e.preventDefault();
      const postId = e.target.id;

      const post = await axios.post(
        "http://80.253.246.129:3000/post/postLike",
        {
          postId,
        },
        {
          headers: {
            "x-access-token": auth().token,
          },
        }
      );
      if (post.data.message == "Success Like") {
        e.target.style.color = "red";
        alert("Beğenildi");
      }
      if (post.data.message == "Success unLike") {
        e.target.style.color = "gray";
        alert("Beğeni kaldırıldı");
      }
    } else {
      alert("giriş yapınız");
    }
  };
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
  return (
    <>
      <AppBar />
      <div className="container-fluid align-self-stretch">
        <div className="row">
          <SideBarPost categoryId={categoryId} />
          <div className="col-md-6">
            {isSign() ? (
              <>
                <div className="col-lg-8" style={{ margin: "5rem" }}>
                  <div className="">
                    <label className="form-label">Post</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="post başlıgı"
                      value={postTitle}
                      onChange={(e: any) => setPostTitle(e.target.value)}
                    />
                  </div>
                  <div className="mt-3">
                    <textarea
                      className="form-control"
                      placeholder="post açıklaması"
                      value={postDesc}
                      onChange={(e: any) => setPostDesc(e.target.value)}
                    ></textarea>
                  </div>

                  <input
                    type="file"
                    className="mt-2"
                    onChange={(e: any) => setPostImage(e.target.files[0])}
                  />
                  <button
                    onClick={postClickHandle}
                    className="btn btn-primary mt-2"
                    style={{ backgroundColor: "#0d6df3" }}
                  >
                    Post oluştur
                  </button>
                </div>
              </>
            ) : (
              <></>
            )}
            {posts &&
              posts.map((post: any, key: any) => (
                <section className="main-content">
                  <div className="post-block">
                    <div className="d-flex justify-content-between">
                      <div className="d-flex mb-3">
                        <div className="d-flex" style={{ marginLeft: 390 }}>
                          <a
                            href="#!"
                            className="text-dark"
                            style={{ fontSize: 11 }}
                          >
                            {post[1].nickname}
                            <pre>5m</pre>
                          </a>
                          <h5 className="mb-0 mx-1">
                            {post[1].image == "null" ? (
                              <img
                                width={50}
                                height={50}
                                src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
                              />
                            ) : (
                              <img
                                width={50}
                                height={50}
                                src={
                                  "http://80.253.246.129:3000/public/users/" +
                                  post[1].image
                                }
                              />
                            )}
                          </h5>
                        </div>
                      </div>
                    </div>
                    <div className="post-block__content mb-2 text-start">
                      <h4
                        className="mt-2"
                        style={{ fontSize: "18px", width: "80%" }}
                      >
                        {post[0].title}
                      </h4>
                      <p style={{ fontSize: "12px", width: "80%" }}>
                        {post[0].description}
                      </p>
                      {post[0].image == "null" ? (
                        <img
                          width={300}
                          height={300}
                          src=""
                          style={{ display: "none" }}
                        />
                      ) : (
                        <img
                          width={400}
                          height={400}
                          src={
                            "http://80.253.246.129:3000/public/posts/" +
                            post[0].image
                          }
                        />
                      )}

                      <div className="post-block__content mb-2 ms-3">
                        <p
                          className="mt-4 text-muted"
                          style={{ display: "inline-block" }}
                        >
                          <i
                            id={post[0].id}
                            onClick={likePostHandle}
                            className="fa-solid fa-heart"
                          ></i>
                        </p>
                        <p
                          className="mb-0 mx-4 text-muted"
                          style={{ display: "inline-block" }}
                        >
                          <i
                            className="fa-solid fa-bookmark"
                            id={post[0].id}
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
                            style={{
                              display: "inline-block",
                              paddingLeft: 300,
                            }}
                          >
                            <div className="dropdown">
                              <a
                                className="text-muted"
                                style={{
                                  display: "inline-block",
                                  margin: "2px",
                                }}
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
                    <hr />
                  </div>
                </section>
              ))}
          </div>
        </div>
      </div>
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

      <div id="mybutton">
        <button  className="feedback rounded-circle">
          <Plus color="#0082f8" size={30}/>
        </button>
      </div>
    </>
  );
};
