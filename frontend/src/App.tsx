import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Home } from "./components/home/home";
import { SignUp } from "./components/sign/signup";
import { SignIn } from "./components/sign/signin";
import { Profile } from "./components/profile/profile";
import { AuthProvider, RequireAuth } from "react-auth-kit";

function App() {
  return (
    <AuthProvider
      authType={"cookie"}
      authName={"_auth"}
      cookieDomain={window.location.hostname}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="signin" element={<SignIn />} />
          <Route
            path="profile"
            element={
              <RequireAuth loginPath={"/"} >
                <Profile />
              </RequireAuth>
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
