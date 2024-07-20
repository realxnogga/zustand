

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./page/login";
import { Register } from "./page/register";
import { Home } from "./page/home";
import { Page404 } from "./page/page404";
import { useLogin } from "./store/loginstore";
import { SendEmail } from "./page/sendemail";
import { ChangePassword } from "./page/changepassword";

export const App = () => {

  const returnedLoginData = useLogin(state => state.returnedLoginData);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/sendemail" element={<SendEmail />} />
        <Route path="/changepassword" element={<ChangePassword />} />
        <Route path="*" element={<Page404 />} />
        {
          returnedLoginData.isrouteprotected ?
            (
              <Route path="/home" element={<Home />} />
            )
            :
            (
              <Route path="/home" element={<Page404 />} />
            )
        }
      </Routes>
    </Router>
  );
}


