import "./App.css";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup"
import Login from "./pages/Login";
import CreateGroup from "./pages/CreateGroup";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<>Home Page</>} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-group" element={<CreateGroup/>}/>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<center><h2>404 : Page not found</h2></center>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
