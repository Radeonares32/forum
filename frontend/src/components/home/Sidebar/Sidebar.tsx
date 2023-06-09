export const SideBar = () => {
  return (
    <div className="col-md-4">
      <div className="col-lg-9">
        <p className="" style={{ fontSize: "30px",color:'#0d6df3', }}>
          Gündem
        </p>
      </div>
      <div className="border border-3 p-1" style={{width:'70%'}}>
      <div className="d-flex justify-content-between" style={{}}>
        <p>spor</p>
        <p>siyaset</p>
        <p>anket</p>
      </div>
      <div className="d-flex justify-content-between">
        <p>seçim</p>
        <p>yetiskin</p>
        <p>iliski</p>
      </div>
      </div>
      <hr style={{width:'70%'}}/>
      <div className="col-lg-12  my-4">
        <p className="mx-3" style={{ fontSize: "14px" }}>
        28 mayıs 2023 kılıçdaroğlu'nun alacağı oy oranı 
        </p>
      </div>
      <div className="col-lg-12  my-4">
        <p className="mx-3" style={{ fontSize: "14px" }}>
        ankara ekspresi 
        </p>
      </div>
      <div className="col-lg-12  my-4">
        <p className="mx-3" style={{ fontSize: "14px" }}>
        koltuğa örtü sermek 
        </p>
      </div>
      <div className="col-lg-12  my-4">
        <p className="mx-3" style={{ fontSize: "14px" }}>
        ekşi itiraf 
        </p>
      </div>
      <div className="col-lg-12  my-4">
        <p className="mx-3" style={{ fontSize: "14px" }}>
          talinn
        </p>
      </div>
      <div className="col-lg-12  my-4">
        <p className="mx-3" style={{ fontSize: "14px" }}>
          hayatu özetleyen sözler
        </p>
      </div>
      <div className="col-lg-12  my-4">
        <p className="mx-3" style={{ fontSize: "14px" }}>
          nuri bile ceylan gibi
        </p>
      </div>
    </div>
  );
};
