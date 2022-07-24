import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home } from "./routes/Home";
import { Login } from "./routes/Login";
import { SecondAuth } from "./routes/Second-auth";
import { Chat } from "./routes/Chat";
import { io } from "socket.io-client";

export let socket = io("http://localhost:3000");

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/second-auth" element={<SecondAuth />}></Route>
        <Route path="/chat" element={<Chat />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
