import { AppBar } from './components/Navbar/AppBar'
import { SideBar } from './components/Sidebar/Sidebar'
import { Flow } from './components/Flow/Flow'
import { Banner } from './components/Banner/Banner'
function App() {
  return (
    <div>
      <AppBar />
      <div className='container-fluid align-self-stretch'>
        <div className='row'>
          <SideBar />
          <Flow />
          <Banner/>
        </div>
      </div>
    </div>
  );
}

export default App;
