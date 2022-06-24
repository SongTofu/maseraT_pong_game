import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Chat from "./pages/Chat";
import ChatRoom from "./pages/ChatRoom";
import Game from "./pages/Game";
import GameRoom from "./pages/GameRoom";
import LogIn from "./pages/LogIn";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/login" element={<LogIn />} />
          <Route path="/game" element={<Game />} />
          <Route path="/game-room" element={<GameRoom />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/chat-room" element={<ChatRoom />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
