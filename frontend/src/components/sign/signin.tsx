import { AppBar } from '../home/Navbar/AppBar'
import { SideBar } from '../home/Sidebar/Sidebar'

import { Signin } from './signin/signin'

export const SignIn = () =>{
    return (
        <div>
            <AppBar/>
            <div className='container-fluid align-self-stretch'>
                <div className='row'>
            <SideBar />
            <Signin/>
            </div>
            </div>
        </div>
    )
}