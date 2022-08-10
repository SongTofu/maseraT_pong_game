import { useRef, useEffect } from "react";
import { render } from "../func/draw";
import { socket } from "../App";

export class User {
  constructor(position: boolean) {
    if (position) this.x = 0;
    else this.x = 590;
    this.y = 150;
    this.width = 10;
    this.height = 100;
    this.color = "WHITE";
    this.score = 0;
  }
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  score: number;
}

export class Ball {
  constructor() {
    this.x = 300;
    this.y = 200;
    this.radius = 10;
    this.speed = 5;
    this.velocityX = 5;
    this.velocityY = 5;
    this.color = "WHTE";
  }
  x: number;
  y: number;
  radius: number;
  speed: number;
  velocityX: number;
  velocityY: number;
  color: string;
}

export type GameType = {
  position: number;
  gameRoomId: string | undefined;
  start: boolean;
};

const leftUser: User = new User(true);
const rightUser: User = new User(false);
const ball: Ball = new Ball();

function movePaddle(
  e: MouseEvent,
  cvs: HTMLCanvasElement | null,
  position: number
) {
  let rect;
  if (cvs) {
    rect = cvs.getBoundingClientRect();
    if (position === 0) leftUser.y = e.clientY - rect.top - leftUser.height / 2;
    else if (position === 1)
      rightUser.y = e.clientY - rect.top - rightUser.height / 2;
  }
}

export function Game({ position, gameRoomId, start }: GameType): JSX.Element {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cvs = ref.current;
    let context: CanvasRenderingContext2D | null = null;

    if (cvs) context = cvs.getContext("2d");

    if (ref.current) {
      ref.current.addEventListener("mousemove", e =>
        movePaddle(e, ref.current, position)
      );
      render(ref.current, context, leftUser, rightUser, ball);
    }

    socket.on(
      "game",
      (data: { ball: Ball; leftUser: User; rightUser: User }) => {
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
        if (ref.current)
          render(ref.current, context, leftUser, rightUser, ball);
      }
    );
    return () => {
      if (cvs)
        cvs.removeEventListener("mousemove", e => movePaddle(e, cvs, position));
      socket.off("game");
    };
  }, [gameRoomId, position]);

  return (
    <div className="flex justify-center items-center">
      <canvas ref={ref} width="600px" height="400px"></canvas>
    </div>
  );
}
