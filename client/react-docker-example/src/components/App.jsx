import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddPost from "./AddPost";
import Profile from "./Profile";

function App() {
  return (
    <div style={{ marginTop: "0" }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/addPost" element={<AddPost />} />
        </Routes>
        <Profile />
      </BrowserRouter>
    </div>
  );
}

export default App;
