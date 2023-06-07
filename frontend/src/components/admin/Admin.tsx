export const Admin = () => {
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
                                    <tr>
                                        <td>1</td>
                                        <td>Mark</td>
                                        <td>Otto</td>
                                        <td>@mdo</td>
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td>Jacob</td>
                                        <td>Thornton</td>
                                        <td>@fat</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
            </div>
        </div>

    )
}