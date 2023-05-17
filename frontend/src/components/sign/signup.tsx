import { AppBar } from '../home/Navbar/AppBar'
import { SideBar } from '../home/Sidebar/Sidebar'

import { Signup } from './signup/signup'
export const SignUp = () => {
    return (
        <div>
            <AppBar/>
            <div className='container-fluid align-self-stretch'>
                <div className='row'>
            <SideBar />
            <Signup/>
            </div>
            </div>
        </div>
    )
}