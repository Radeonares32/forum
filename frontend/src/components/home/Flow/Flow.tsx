import { useIsAuthenticated } from "react-auth-kit";
import "./flow.css";
export const Flow = () => {
  let isSign = useIsAuthenticated();
  return (
    <div className="col-md-5">
      {isSign() ? (
        <div className="col-lg-9" style={{ margin: "5rem" }}>
          <div className="">
            <label className="form-label">Create Post</label>
            <input
              type="text"
              className="form-control"
              placeholder="post title"
            />
          </div>
          <div className="mt-3">
            <textarea
              className="form-control"
              placeholder="post description"
            ></textarea>
          </div>
          <button className="btn btn-primary mt-1">Create Post</button>
        </div>
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
              <div>
                <h5 className="mb-0">
                  <a href="#!" className="text-dark">
                    Kiran Acharya
                  </a>
                </h5>
                <p className="mb-0 text-muted">5m</p>
              </div>
            </div>
          </div>
          <div className="post-block__content mb-2">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ratione
              laboriosam non atque, porro cupiditate commodi? Provident culpa
              vel sit enim!
            </p>
          </div>
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
          <div className="post-block__comments">
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
                >
                  <i className="fa fa-paper-plane"></i>
                </button>
              </div>
            </div>

            <div className="comment-view-box mb-3">
              <div className="d-flex mb-2">
                <div>
                  <h6 className="mb-1">
                    <a href="#!" className="text-dark">
                      John doe
                    </a>{" "}
                    <small className="text-muted">1m</small>
                  </h6>
                  <p className="mb-1">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                  <div className="d-flex">
                    <a href="#!" className="text-dark mr-2">
                      <span>
                        <i className="fa fa-heart-o"></i>
                      </span>
                    </a>
                    <a href="#!" className="text-dark mr-2">
                      <span>Reply</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <hr />
            <a href="#!" className="text-dark">
              View More comments <span className="font-weight-bold">(12)</span>
            </a>
          </div>
        </div>
      </section>
        <section className="main-content">
        <div className="post-block">
          <div className="d-flex justify-content-between">
            <div className="d-flex mb-3">
              <div className="className-2">
                <a href="#!" className="text-dark"></a>
              </div>
              <div>
                <h5 className="mb-0">
                  <a href="#!" className="text-dark">
                    Kiran Acharya
                  </a>
                </h5>
                <p className="mb-0 text-muted">5m</p>
              </div>
            </div>
          </div>
          <div className="post-block__content mb-2">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ratione
              laboriosam non atque, porro cupiditate commodi? Provident culpa
              vel sit enim!
            </p>
          </div>
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
          <div className="post-block__comments">
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
                >
                  <i className="fa fa-paper-plane"></i>
                </button>
              </div>
            </div>

            <div className="comment-view-box mb-3">
              <div className="d-flex mb-2">
                <div>
                  <h6 className="mb-1">
                    <a href="#!" className="text-dark">
                      John doe
                    </a>{" "}
                    <small className="text-muted">1m</small>
                  </h6>
                  <p className="mb-1">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                  <div className="d-flex">
                    <a href="#!" className="text-dark mr-2">
                      <span>
                        <i className="fa fa-heart-o"></i>
                      </span>
                    </a>
                    <a href="#!" className="text-dark mr-2">
                      <span>Reply</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <hr />
            <a href="#!" className="text-dark">
              View More comments <span className="font-weight-bold">(12)</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
