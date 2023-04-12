import { AppBar } from './components/home/Navbar/AppBar'
import { SideBar } from './components/home/Sidebar/Sidebar'
import { Flow } from './components/home/Flow/Flow'
import { Banner } from './components/home/Banner/Banner'
function App() {
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
  );
}

export default App;
