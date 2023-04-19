import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Home } from "./components/home/home";
import { SignUp } from "./components/sign/signup";
import { SignIn } from "./components/sign/signin";
import { AuthProvider } from "react-auth-kit";

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
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
