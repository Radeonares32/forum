import { useEffect, useState } from 'react';
import { AppBar } from '../Navbar/AppBar'
import { SideBarPost } from '../SidebarPost/SidebarPost'
import axios from 'axios'
import { useParams } from 'react-router-dom';
import { useIsAuthenticated, useAuthUser } from "react-auth-kit";
import { Modal } from "react-bootstrap";
import { Banner } from '../Banner/Banner';

export const Mainposts = () => {
  const maxLength = 400
  const isSign = useIsAuthenticated();
  const auth: any = useAuthUser()
  const { categoryId } = useParams()
  const [show, setShow] = useState(false)
  const [showComplain, setShowComplain] = useState(false)
  const [posts, setPost] = useState<any>()


  const [complainTitle, setComplainTitle] = useState<any>()
  const [complainDesc, setComplainDesc] = useState<any>()


  const complainHandle = async (e: any) => {
    e.preventDefault()
    const complain = await axios.post('http://80.253.246.129:3000/user/postComplain', {
      title: complainTitle,
      description: complainDesc
    }, {
      headers: {
        'x-access-token': auth().token
      }
    })
    if (complain.data.getComplain == 'Success complain') {
      alert("gönderildi")
      setShowComplain(false)
    }
  }

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const handleComplainShow = () => setShowComplain(true)
  const handleComplainClose = () => setShowComplain(false)

  const [expanded, setExpanded] = useState(false);
  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    axios.get(`http://80.253.246.129:3000/post/getMainPostAll/${categoryId}`).then((post: any) => {
      setPost(post.data.main)
    })
  }, [categoryId])
  const likePostHandle = async (e: any) => {
    if (isSign()) {
      e.preventDefault()
      const postId = e.target.id

      const post = await axios.post('http://80.253.246.129:3000/post/postLike', {
        postId
      }, {
        headers: {
          'x-access-token': auth().token
        }
      })
      if (post.data.message == 'Success Like') {
        e.target.style.color = 'red'
        alert("Beğenildi")
      }
      if (post.data.message == 'Success unLike') {
        e.target.style.color = 'gray'
        alert("Beğeni kaldırıldı")
      }
    }
    else {
      alert("giriş yapınız")
    }

  }
  const savedPostHandle = async (e: any) => {
    if (isSign()) {
      e.preventDefault()
      const postId = e.target.id
      const isBlue = e.target.style.color
      if (isBlue == 'blue') {
        alert("zaten kayıtlı")
      }
      else {
        const post = await axios.post('http://80.253.246.129:3000/post/postSaved', {
          postId
        }, {
          headers: {
            'x-access-token': auth().token
          }
        })
        e.target.style.color = 'blue'
        if (post.data.message = 'Success saved') {
          alert("kaydedildi")
        }
      }
    }
    else {
      alert("giriş yapınız")
    }

  }

  return (
    <>
      <AppBar />

      <div className="container-fluid align-self-stretch">
        <div className="row">
          <SideBarPost categoryId={categoryId} />

          <div className="col-md-5">

            {posts && posts.map((post: any, key: any) => (


              <section className="main-content" key={key} style={{width:'35rem',marginLeft:'-215px'}}>
                <div className="post-block">

                  <div className="d-flex justify-content-between">
                    <div className="d-flex mb-3">

                      <div className="d-flex" style={{ marginLeft: 390 }}>

                        <a href={"/profile/"+post[1].id} className="text-dark" style={{ fontSize: 11}}>
                          {post[1].nickname}
                          <pre>5m</pre>
                        </a>
                        <h5 className="mb-0 mx-1">
                          {post[1].image == 'null' ? (
                            <img
                              width={40}
                              height={40}
                              className='rounded-circle'
                              src="/1.jpeg"
                            />
                          ) : (
                            <img width={50} height={50} onClick={handleShow} src={'http://80.253.246.129:3000/public/users/' + post[1].image} className='rounded-circle' />
                          )}


                        </h5>

                      </div>
                    </div>
                  </div>

                  <div className="post-block__content mb-2 text-start">
                    <h4 className="mt-2" style={{fontSize:'18px',width:'80%'}}>{post[0].title}</h4>
                    <p
                        style={{ fontSize: "15px", width: "80%" }}
                        onClick={toggleExpanded}
                      >
                        {expanded ? (
                          <>{post[0].description}</>
                        ) : (
                          <>
                            {post[0].description.length > maxLength
                              ? post[0].description.slice(0, maxLength) + " Devamını oku..."
                              : post[0].description}
                          </>
                        )}
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
                        <i id={post[1].id} onClick={likePostHandle} className="fa-solid fa-heart" ></i>
                      </p>
                      <p
                        className="mb-0 mx-4 text-muted"
                        style={{ display: "inline-block" }}
                      >
                        <i className="fa-solid fa-bookmark" id={post[1].id} onClick={savedPostHandle}></i>
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
                          style={{ display: "inline-block", paddingLeft: 300 }}
                        >

                          <div className="dropdown">
                            <a className="text-muted" style={{ display: 'inline-block', margin: '2px' }} href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                              <i className="fa-solid fa-ellipsis"></i>
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                              <li><a className="dropdown-item" onClick={handleComplainShow} href="#">Şikayet Et</a></li>
                            </ul>
                          </div>

                        </p>
                      ) : (<></>)}

                    </div>
                  </div>
                  <Modal show={show} className="text-center" onHide={handleClose}>
                    <Modal.Header closeButton></Modal.Header>
                    <Modal.Body>
                      <img width={300} height={300} src={'http://80.253.246.129:3000/public/posts/' + post[1].title} />
                    </Modal.Body>
                  </Modal>

                  <Modal show={showComplain} className="text-center" onHide={handleComplainClose}>
                    <Modal.Header closeButton></Modal.Header>
                    <Modal.Body>
                      <form>
                        <div className="mb-3">
                          <label className="form-label">Şikayet nedeni</label>
                          <input type="text" value={complainTitle} onChange={(e: any) => setComplainTitle(e.target.value)} className="form-control" aria-describedby="emailHelp" />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Açıklama</label>
                          <input type="text" value={complainDesc} onChange={(e: any) => setComplainDesc(e.target.value)} className="form-control" id="exampleInputPassword1" />
                        </div>
                        <button type="submit" onClick={complainHandle} className="btn btn-primary">Gönder</button>
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
          <Banner />
        </div>

      </div>
    </>
  )
}