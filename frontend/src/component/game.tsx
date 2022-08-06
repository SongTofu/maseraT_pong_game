import { useRef, useEffect } from "react";
import { render } from "../func/draw";
import { socket } from "../App";

const leftUser = {
  x: 0,
  y: 400 / 2 - 100 / 2,
  width: 10,
  height: 100,
  color: "WHITE",
  score: 0,
};

const rightUser = {
  x: 600 - 10,
  y: 400 / 2 - 100 / 2,
  width: 10,
  height: 100,
  color: "WHITE",
  score: 0,
};

const ball = {
  x: 600 / 2,
  y: 400 / 2,
  radius: 10,
  speed: 5,
  velocityX: 5,
  velocityY: 5,
  color: "WHITE",
};

function movePaddle(evt, cvs, position) {
  let rect = cvs.getBoundingClientRect();

  if (position === 0) leftUser.y = evt.clientY - rect.top - leftUser.height / 2;
  else if (position === 1)
    rightUser.y = evt.clientY - rect.top - rightUser.height / 2;
}

export function Game({ position, gameRoomId, start }) {
  const ref = useRef(null);

  useEffect(() => {
    const cvs = ref.current;

    const context = cvs.getContext("2d");
    ref.current.addEventListener("mousemove", (e) =>
      movePaddle(e, ref.current, position),
    );

    render(ref.current, context, leftUser, rightUser, ball);

    socket.on("game", (data: { ball; leftUser; rightUser }) => {
      ball.x = data.ball.x;
      ball.y = data.ball.y;
      rightUser.score = data.rightUser.score;
      leftUser.score = data.leftUser.score;

      if (position === 0) {
        rightUser.y = data.rightUser.y;
        socket.emit("user-paddle", { position, gameRoomId, y: leftUser.y });
      } else if (position === 1) {
        leftUser.y = data.leftUser.y;
        socket.emit("user-paddle", { position, gameRoomId, y: rightUser.y });
      } else {
        rightUser.y = data.rightUser.y;
        leftUser.y = data.leftUser.y;
      }
      render(ref.current, context, leftUser, rightUser, ball);
    });
    return () => {
      cvs.removeEventListener("mousemove", (e) => movePaddle(e, cvs, position));
      socket.off("game");
    };
  }, [gameRoomId, position]);

  return (
    <div className="flex justify-center items-center">
      <canvas ref={ref} width="600px" height="400px"></canvas>
    </div>
  );
}
