import './admin.css'

import axios from 'axios'
import { useEffect, useState } from 'react'


export const Admin = () => {
    const [complain, setComplain] = useState<any>()

    useEffect(() => {
        axios.get('http://80.253.246.129:3000/user/getComplain').then((complain: any) => {
            setComplain(complain.data.user.complain)
        })
    })
    return (

        <div id="wrapper">
            <nav className="navbar-default navbar-side" role="navigation">
                <div className="sidebar-collapse">
                    <ul className="nav" id="main-menu">
                        <li>
                            <a href="#"><i className="fa fa-desktop "></i>Panel</a>
                        </li>
                    </ul>

                </div>

            </nav>

            <div id="page-wrapper">
                <div id="page-inner">
                    <div className="row">
                        <div className="col-md-12">
                            <h2>Admin Paneli</h2>
                        </div>
                    </div>

                    <hr />
                    <div className="row">
                        <div className="col-md-12">
                            <h5>Şikayetler</h5>
                            <table className="table  table-bordered table-hover">
                                <thead>
                                    <tr>
                                        <th>Kullanıcı adı</th>
                                        <th>Email</th>
                                        <th>Şikayet başlıgı</th>
                                        <th>Şikayet açıklaması</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {complain && complain.map((com: any, key: any) => (
                                        <tr>
                                            <td>{com[0].nickname}</td>
                                            <td>{com[0].email}</td>
                                            <td>{com[1].title}</td>
                                            <td>{com[1].description}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
            </div>
        </div>

    )
}