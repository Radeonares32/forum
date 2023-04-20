
import { useIsAuthenticated } from "react-auth-kit";

export const Flow = () => {
    let isSign = useIsAuthenticated()
  return (
    <div className="col-md-5">
        {
            isSign() ?  
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
          :
          <></>
        }
     
      <div className="col-lg-9" style={{ margin: "5rem" }}>
        <p className="" style={{ fontSize: "20px" }}>
          süslülerin aylık kuaför masrafları
        </p>
        <p className="" style={{ fontSize: "14px" }}>
          Yılda 2 defa kuaföre giderim kesim için, bu 2 ziyaretin birinde hafif
          balyaj da yaptırırım. Yani 2 kesim+1 renk masrafım dışında kıvırcık
          saçlatımın ekmeğini yiyorum{" "}
        </p>
        <hr />
      </div>
      <div className="col-lg-9" style={{ margin: "5rem" }}>
        <p className="" style={{ fontSize: "20px" }}>
          süslülerin aylık kuaför masrafları
        </p>
        <p className="" style={{ fontSize: "14px" }}>
          Yılda 2 defa kuaföre giderim kesim için, bu 2 ziyaretin birinde hafif
          balyaj da yaptırırım. Yani 2 kesim+1 renk masrafım dışında kıvırcık
          saçlatımın ekmeğini yiyorum{" "}
        </p>
        <hr />
      </div>
      <div className="col-lg-9" style={{ margin: "5rem" }}>
        <p className="" style={{ fontSize: "20px" }}>
          süslülerin aylık kuaför masrafları
        </p>
        <p className="" style={{ fontSize: "14px" }}>
          Yılda 2 defa kuaföre giderim kesim için, bu 2 ziyaretin birinde hafif
          balyaj da yaptırırım. Yani 2 kesim+1 renk masrafım dışında kıvırcık
          saçlatımın ekmeğini yiyorum{" "}
        </p>
        <hr />
      </div>
      <div className="col-lg-9" style={{ margin: "5rem" }}>
        <p className="" style={{ fontSize: "20px" }}>
          süslülerin aylık kuaför masrafları
        </p>
        <p className="" style={{ fontSize: "14px" }}>
          Yılda 2 defa kuaföre giderim kesim için, bu 2 ziyaretin birinde hafif
          balyaj da yaptırırım. Yani 2 kesim+1 renk masrafım dışında kıvırcık
          saçlatımın ekmeğini yiyorum{" "}
        </p>
        <hr />
      </div>
    </div>
  );
};
