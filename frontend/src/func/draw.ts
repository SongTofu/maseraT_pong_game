import { Ball, User } from "../component/game";

const net = {
  x: 600 / 2 - 1,
  y: 0,
  width: 2,
  height: 10,
  color: "WHITE"
};

export function drawRect(
  ctx: CanvasRenderingContext2D | null,
  x: number,
  y: number,
  w: number,
  h: number,
  color: string
) {
  if (ctx) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
  }
}

export function drawNet(
  cvs: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D | null
) {
  for (let i = 0; i <= cvs.height; i += 15) {
    drawRect(ctx, net.x, net.y + i, net.width, net.height, net.color);
  }
}

export function drawCircle(
  ctx: CanvasRenderingContext2D | null,
  x: number,
  y: number,
  r: number,
  color: string
) {
  if (ctx) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2, false);

    ctx.closePath();
    ctx.fill();
  }
}

export function drawText(
  ctx: CanvasRenderingContext2D | null,
  leftText: string,
  rightText: string,
  color: string
) {
  if (ctx) {
    ctx.fillStyle = color;
    ctx.font = "45px fantasy";
    ctx.fillText(leftText, 140, 80);
    ctx.fillText(rightText, 440, 80);
  }
}

export function render(
  cvs: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D | null,
  leftUser: User,
  rightUser: User,
  ball: Ball
) {
  drawRect(ctx, 0, 0, cvs.width, cvs.height, "BLACK");
  drawNet(cvs, ctx);
  drawText(ctx, String(leftUser.score), String(rightUser.score), "WHITE");

  drawRect(
    ctx,
    leftUser.x,
    leftUser.y,
    leftUser.width,
    leftUser.height,
    leftUser.color
  );
  drawRect(
    ctx,
    rightUser.x,
    rightUser.y,
    rightUser.width,
    rightUser.height,
    rightUser.color
  );

  drawCircle(ctx, ball.x, ball.y, ball.radius, ball.color);
}
