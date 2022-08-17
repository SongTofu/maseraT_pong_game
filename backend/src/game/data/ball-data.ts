export class BallData {
  constructor() {
    this.x = 300;
    this.y = 200;
    this.radius = 10;
    this.color = "WHITE";

    this.speed = 5;
    this.velocityX = this.speed * Math.cos(Math.PI / 4);
    this.velocityY = this.speed * Math.sin(Math.PI / 4);
  }
  x: number;
  y: number;
  radius: number;
  color: string;

  speed: number;
  velocityX: number;
  velocityY: number;

  top: number;
  bottom: number;
  left: number;
  right: number;
}
