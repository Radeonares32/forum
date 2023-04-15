import { AppBar } from './Navbar/AppBar'
import { SideBar } from './Sidebar/Sidebar'
import { Flow } from './Flow/Flow'
import { Banner } from './Banner/Banner'

export const Home = () => {
    return (
        <div>
      <AppBar />
      <div className='container-fluid align-self-stretch'>
        <div className='row'>
          <SideBar />
          <Flow />
          <Banner />
        </div>
      </div>
    </div>
    )
}