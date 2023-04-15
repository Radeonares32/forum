import { BrowserRouter,Routes,Route } from 'react-router-dom'

import { Home } from './components/home/home'
import { SignUp } from './components/sign/signup'
import { SignIn } from './components/sign/signin'

function App() {
  return (
   <BrowserRouter>
    <Routes>
        <Route path='/' element={ <Home/>}/>
        <Route path='signup' element={<SignUp/>}/>
        <Route path='signin' element={<SignIn/>}/>
    </Routes>
   </BrowserRouter>
  );
}

export default App;
