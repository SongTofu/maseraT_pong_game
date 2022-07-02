import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Chat from "./pages/Chat";
import ChatRoom from "./pages/ChatRoom";
import Game from "./pages/Game";
import GameRoom from "./pages/GameRoom";
import Home from "./pages/Home";
import LogIn from "./pages/LogIn";
import SecondAuth from "./pages/SecondAuth";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="wrap min-w-max">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/second-auth" element={<SecondAuth />} />
            <Route path="/game" element={<Game />} />
            <Route path="/game-room" element={<GameRoom />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/chat-room" element={<ChatRoom />} />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
