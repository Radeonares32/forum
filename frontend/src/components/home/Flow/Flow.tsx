import { useIsAuthenticated, useAuthUser } from "react-auth-kit";
import { Modal } from "react-bootstrap";
import { useEffect, useState } from 'react'
import axios from 'axios'
import "./flow.css";
export const Flow = () => {
  const isSign = useIsAuthenticated();
  const auth: any = useAuthUser()
  const [show, setShow] = useState(false)
  const [category, setCategory] = useState<any>()
  const [categories, setCategories] = useState<any>()
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const categoryCreate = (e: any) => {
    e.preventDefault()
    axios.post('http://localhost:3000/category/postCategory', {
      title: category
    }, {
      headers: {
        'x-access-token': auth().token
      }
    })
    setCategory(null)
  }
  /*  */
  const  catSelectChange = () => {
    axios.get('http://localhost:3000/category/getCategory', {
      headers: {
        'x-access-token': auth().token
      }
    }).then((cat: any) => {
      
      setCategories(cat.data.category)
    })
  }
  return (
    <div className="col-md-5">
      {isSign() ? (
        <>
          <div className="col-lg-8" style={{ margin: "5rem" }}>
            <div className="">
              <label className="form-label">Post</label>
              <input
                type="text"
                className="form-control"
                placeholder="post başlıgı"
              />
            </div>
            <div className="mt-3">
              <textarea
                className="form-control"
                placeholder="post açıklaması"
              ></textarea>
            </div>

            <select onClick={catSelectChange}  className="form-select mt-3" aria-label="Default select example">
              {categories && categories.map((cat: any,key:number) => (
                <>
                
                  <option value={cat[0].id} key={key}>{cat[0].title}</option>
                </>
              ))}

            </select>
            <button
              className="btn btn-primary mt-2"
              style={{ backgroundColor: "#1D9BF0" }}
            >
              Post oluştur
            </button>
          </div>
          <div className="col-lg-8" style={{ margin: "5rem" }}>
            <div className="">
              <label className="form-label">Entry kategorisi</label>
              <input
                type="text"
                className="form-control"
                placeholder="entry kategori ismi"
                onChange={(e: any) => setCategory(e.target.value)}
                value={category}
              />
            </div>
            <button
              onClick={categoryCreate}
              className="btn btn-primary mt-1"
              style={{ backgroundColor: "#1D9BF0" }}
            >
              kategori oluştur
            </button>
          </div>
        </>
      ) : (
        <></>
      )}
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
            <img width={300} height={300} onClick={handleShow} src="logo512.png" />

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
                style={{ display: "inline-block", paddingLeft: 300 }}
              >

                <div className="dropdown">
                  <a className="text-muted" style={{ display: 'inline-block', margin: '2px' }} href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                    <i className="fa-solid fa-ellipsis"></i>
                  </a>
                  <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                    <li><a className="dropdown-item" href="#">Şikayet Et</a></li>
                  </ul>
                </div>

              </p>
            </div>
          </div>
          <Modal show={show} className="text-center" onHide={handleClose}>
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>
              <img width={300} height={300} src="logo512.png" />
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
  );
};
