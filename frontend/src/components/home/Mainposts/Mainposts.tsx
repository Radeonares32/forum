import { useEffect, useState } from 'react';
import { AppBar } from '../Navbar/AppBar'
import { SideBar } from '../Sidebar/Sidebar'
import axios from 'axios'
import { useParams } from 'react-router-dom';
import { useIsAuthenticated, useAuthUser } from "react-auth-kit";
import { Modal } from "react-bootstrap";
import { Banner } from '../Banner/Banner';

export const Mainposts = () => {

  const isSign = useIsAuthenticated();
  const auth: any = useAuthUser()
  const [categories, setCategories] = useState<any>()

  const { categoryId } = useParams<any>()



  useEffect(() => {
    axios.get(`http://80.253.246.129:3000/category/getMainRelCategory/${categoryId}`, {

    }).then((post: any) => {
      setCategories(post.data.category.post)
    })
  }, [categoryId])

  return (
    <>
      <AppBar />

      <div className="container-fluid align-self-stretch">
        <div className="row">
          <SideBar />

          <div className="col-md-4 border-0" >
            {categories && categories.map((cat:any,key:any)=>(
              <div className="list-group border-0 mt-2">
              <a href={'/subposts/'+cat[0].id} className="list-group-item list-group-item-action" aria-current="true">
                <div className="d-flex w-100 justify-content-between">
                  <h5 className="mb-1">{cat[0].title}</h5>
                </div>
              </a>
            </div>
            ))}
          </div>
          <Banner />
        </div>

      </div>
    </>
  )
}