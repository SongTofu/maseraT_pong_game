import { useState, useEffect } from "react";
import { UserList } from "../component/list/user-list";
import { getCookie } from "../func/cookieFunc";
import { GameRoomList } from "../component/list/game-room-list";
import { socket } from "../App";
import { useNavigate } from "react-router-dom";
import Popup from "reactjs-popup";
import { GameCreatePopup } from "../popup/game-create-popup";
import { MatchPopup } from "../popup/match-popup";

export type GameRoomType = {
  id: number;
  title: string;
  isLadder: boolean;
  isStart: boolean;
};

export function GameMain() {
  const [gameRooms, setGameRooms] = useState<GameRoomType[]>([]);
  const [isMatching, setIsMatching] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL + "game/room", {
      method: "GET",
      headers: {
        Authorization: getCookie("token")
      }
    })
      .then(res => res.json())
      .then((gameRoom: GameRoomType[]) => setGameRooms(gameRoom));
  }, []);

  useEffect(() => {
    socket.on("game-room-create", (gameRoom: GameRoomType) => {
      setGameRooms(curr => [...curr, gameRoom]);
    });

    socket.on("game-room-join", ({ gameRoomId }: { gameRoomId: number }) => {
      navigate("/game/" + gameRoomId);
    });

    socket.on("game-room-destroy", ({ gameRoomId }: { gameRoomId: number }) => {
      setGameRooms(rooms => rooms.filter(room => room.id !== +gameRoomId));
    });

    // socket.on("match", ({ gameRoomId }) => {
    //   navigate("/game/" + gameRoomId);
    // });

    return () => {
      socket.off("game-room-create");
      socket.off("game-room-join");
      socket.off("game-room-destroy");
      socket.off("match");
    };
  }, [gameRooms, navigate]);

  const onMatch = () => {
    setIsMatching(true);
  };

  return (
    <div>
      <h1>GameMain</h1>
      <Popup trigger={<button>방생성</button>} position={"bottom left"}>
        <GameCreatePopup />
      </Popup>

      {gameRooms.map(gameRoom => (
        <GameRoomList
          key={gameRoom.id}
          id={gameRoom.id}
          title={gameRoom.title}
          isLadder={gameRoom.isLadder}
          isStart={gameRoom.isStart}
        />
      ))}
      <h1>UserList</h1>
      <UserList isChatRoom={false} participants={null} />
      <button onClick={onMatch}>래더 매칭</button>
      {isMatching ? <MatchPopup setIsMatching={setIsMatching} /> : null}
    </div>
  );
}
