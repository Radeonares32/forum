import { Link } from "react-router-dom";
import { useAuthUser, useIsAuthenticated } from "react-auth-kit";
import { useEffect, useState } from 'react'
import axios from 'axios'



export const SideBarPost = (props: any) => {
  const isAuthenticated = useIsAuthenticated();
  const auth: any = useAuthUser();
  const [categories, setCategories] = useState<any>()
  const [newCat, setNewCat] = useState<any>()
  const [subCat, setSubCat] = useState<any>()
  const [catId, setCatId] = useState<any>()
  useEffect(() => {
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
  useEffect(() => {
    axios.get(`http://80.253.246.129:3000/category/getMainRelCategory/${props.categoryId}`).then((subCat: any) => {
      setSubCat(subCat.data.category.post)
      setCatId(catId)
    })
  }, [props.categoryId])
  return (
    <div className="col-md-4">
      <div className="col-lg-9">
        <p className="" style={{ fontSize: "30px", color: '#0d6df3', }}>
          Gündem
        </p>
      </div>
      <div className="border border-3 p-1" style={{ width: '70%' }}>

        <div className="d-flex justify-content-between" style={{}}>
          {categories && categories.slice(0, 3).map((cat: any, key: any) => (
            <p id={cat[0].id} style={{ cursor: 'grab' }} key={key}>{cat[0].title}</p>


          ))}
        </div>
        <div className="d-flex justify-content-between" style={{}}>
          {categories && categories.slice(3, 6).map((cat: any, key: any) => (
            <p id={cat[0].id} style={{ cursor: 'grab' }} key={key}>{cat[0].title}</p>
          ))}
        </div>

      </div>
      <hr style={{ width: '70%' }} />
      {isAuthenticated() ? (<>
        <input type="text" placeholder="kategori ekle" onChange={(e: any) => setNewCat(e.target.value)} value={newCat} />
        <button style={{ backgroundColor: '#0d6df3', border: '0', height: '30px', color: 'white' }} onClick={subCategoryHandle}>ekle</button>
      </>) : (<></>)}
      <div className="border mt-2 " style={{ width: '70%' }}>
        {subCat && subCat.map((cat: any, key: any) => (

          <div key={key} className="col-lg-12  my-4">
            <a href={'/subposts/' + cat[0].id} className="mx-3" id={cat[0].id} style={{ fontSize: "14px", cursor: 'grab',color:'black',textDecoration:'none' }}>
              {cat[0].title}
            </a>
          </div>

        ))}
      </div>
    </div>
  );
};
