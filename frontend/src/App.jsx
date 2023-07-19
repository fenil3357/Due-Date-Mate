import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Group from "./pages/Group";
import CreateGroup from "./pages/CreateGroup";
import Dashboard from "./pages/Dashboard";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import SetReminder from "./pages/SetReminder";

const Home = () => {
  const navigate = useNavigate();

  useEffect((e) => {
    navigate("/dashboard");
  });

  return (
    <center>
      <h2>Home Page</h2>
    </center>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/group/" element={<Group/>} />
        <Route path="/create-group" element={<CreateGroup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/set-reminder" element={<SetReminder />} />
        <Route
          path="*"
          element={
            <center>
              <h2>404 : Page not found</h2>
            </center>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
