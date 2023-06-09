import { Link } from "react-router-dom";
import { useAuthUser, useIsAuthenticated } from "react-auth-kit";
import { useEffect, useState } from 'react'
import axios from 'axios'



export const SideBar = () => {
  const isAuthenticated = useIsAuthenticated();
  const auth: any = useAuthUser();
  const [categories, setCategories] = useState<any>()
  const [newCat, setNewCat] = useState<any>()
  const [subCat, setSubCat] = useState<any>()
  const [catId, setCatId] = useState<any>()
  useEffect(() => {
    axios
    .get(`http://80.253.246.129:3000/category/getCategory`)
    .then((cat: any) => {
      setSubCat(cat.data.category);
    });
    axios.get(`http://80.253.246.129:3000/category/getMainCategory`, {

    }).then((cat: any) => {
      setCategories(cat.data.category)
    })
  }, [])
  const subCategoryHandle = async (e: any) => {
    await axios.post('http://80.253.246.129:3000/category/postCategory', {
      title: newCat,
      mainRel: catId
    }, {
      headers: {
        'x-access-token': auth().token
      }
    })
    setNewCat('')
  }
  const getSubCatHandle = async (e: any) => {
    e.preventDefault()
    const catId = e.target.id
    setCatId(catId)
  }
  return (
    <div className="col-md-4" style={{marginTop: "-39px",marginLeft:"-70px"}}>
      <div className="col-lg-4">
      <a
          href="/"
          className="text-decoration-none"
          style={{ fontSize: "25px", color: "#0d6df3", width: "20px" }}
        >
          Gündem
        </a>
      </div>
      <div className="border border-2 border-dark p-1" style={{ width: '50%' }}>

        <div className="d-flex justify-content-between" style={{}}>
          {categories && categories.slice(0, 3).map((cat: any, key: any) => (
            <p onClick={getSubCatHandle} id={cat[0].id} style={{ cursor: 'grab',fontWeight:"bold" }} key={key}>{cat[0].title}</p>
          ))}
        </div>
        <div className="d-flex justify-content-between" style={{}}>
          {categories && categories.slice(3, 6).map((cat: any, key: any) => (
            <p onClick={getSubCatHandle} id={cat[0].id} style={{ cursor: 'grab',fontWeight:"bold" }} key={key}>{cat[0].title}</p>
          ))}
        </div>

      </div>
      <hr style={{ width: '50%' }} />
      {isAuthenticated() ? (<>
        <input type="text" placeholder="başlık oluştur" onChange={(e: any) => setNewCat(e.target.value)} style={{width:'41.8%'}} value={newCat} />
        <button style={{ backgroundColor: '#0d6df3', border: '0', height: '30px', color: 'white' }} onClick={subCategoryHandle}>ekle</button>
      </>) : (<></>)}
      <div className="border border-2 border-dark mt-2 " style={{ width: '50%' }}>
        {subCat && subCat.map((cat: any, key: any) => (

          <div key={key} className="col-lg-12  my-4">
            <a  href={'/subposts/'+cat[0].id}  className="mx-3" id={cat[0].id} style={{ fontSize: "14px", cursor: 'grab' ,color:'black',textDecoration:'none'}}>
              {cat[0].title}
            </a>
          </div>

        ))}
      </div>
    </div>
  );
};
