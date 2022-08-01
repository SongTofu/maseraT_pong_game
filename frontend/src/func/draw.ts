const net = {
  x: 600 / 2 - 1,
  y: 0,
  width: 2,
  height: 10,
  color: "WHITE"
};

export function drawRect(ctx, x, y, w, h, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h);
}

export function drawNet(cvs, ctx) {
  for (let i = 0; i <= cvs.height; i += 15) {
    drawRect(ctx, net.x, net.y + i, net.width, net.height, net.color);
  }
}

export function drawCircle(ctx, x, y, r, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2, false);

  ctx.closePath();
  ctx.fill();
}

export function drawText(ctx, leftText, rightText, color) {
  ctx.fillStyle = color;
  ctx.font = "45px fantasy";
  ctx.fillText(leftText, 140, 80);
  ctx.fillText(rightText, 440, 80);
}

export function render(cvs, ctx, leftUser, rightUser, ball) {
  drawRect(ctx, 0, 0, cvs.width, cvs.height, "BLACK");
  drawNet(cvs, ctx);
  drawText(ctx, leftUser.score, rightUser.score, "WHITE");

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
