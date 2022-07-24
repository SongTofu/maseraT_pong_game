import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home } from "./routes/Home";
import { Login } from "./routes/Login";
import { SecondAuth } from "./routes/Second-auth";
import { ChatMain } from "./routes/ChatMain";
import { io } from "socket.io-client";
import { ChatDetail } from "./routes/ChatDetail";

export let socket = io("http://localhost:3000");

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/second-auth" element={<SecondAuth />}></Route>
        <Route path="/chat" element={<ChatMain />}></Route>
        <Route path="/chat/:chatRoomId" element={<ChatDetail />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
