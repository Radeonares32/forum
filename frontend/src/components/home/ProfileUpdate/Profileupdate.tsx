import { AppBar } from "../Navbar/AppBar"
import { SideBar } from "../Sidebar/Sidebar"
import { Update } from "./update/update"

export const Profileupdate = () => {
    return (
        <div>
            <AppBar />
            <div className='container-fluid align-self-stretch'>
                <div className='row'>
                    <SideBar />
                    <Update />
                </div>
            </div>
        </div>
    )
}