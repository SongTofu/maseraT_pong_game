import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes
} from "react-router-dom";
import { Home } from "./routes/Home";
import { Login } from "./routes/Login";
import { SecondAuth } from "./routes/Second-auth";
import { ChatMain } from "./routes/ChatMain";
import { io } from "socket.io-client";
import { ChatDetail } from "./routes/ChatDetail";
import { GameMain } from "./routes/GameMain";
import { GameDetail } from "./routes/GameDetail";
import Header from "./component/Header";
import Footer from "./component/Footer";
import { DM } from "./routes/DM";
import { isLogin } from "./func/isLogin";

export let socket = io("http://localhost:3000");

function App() {
  return (
    <Router>
      <div className="h-screen min-h-[900px] min-w-[1024px] relative text-center w-full flex flex-col justify-between">
        <Header />
        <Routes>
          {isLogin() ? (
            <>
              <Route path="/login" element={<Login />}></Route>
              <Route path="/second-auth" element={<SecondAuth />}></Route>
              <Route path="/chat" element={<ChatMain />}></Route>
              <Route path="/chat/:chatRoomId" element={<ChatDetail />}></Route>
              <Route path="/game" element={<GameMain />}></Route>
              <Route path="/game/:gameRoomId" element={<GameDetail />}></Route>
              <Route path="/DM/:chatRoomId" element={<DM />}></Route>
              <Route
                path="/*"
                element={<Navigate to="/chat"></Navigate>}
              ></Route>
            </>
          ) : (
            <>
              <Route path="/" element={<Home />}></Route>
              <Route path="/*" element={<Navigate to="/"></Navigate>}></Route>
            </>
          )}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
