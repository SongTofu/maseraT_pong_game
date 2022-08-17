export class UserData {
  constructor(userPosition: Boolean) {
    if (userPosition) {
      this.x = 0;
    } else {
      this.x = 590;
    }
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

  top: number;
  bottom: number;
  left: number;
  right: number;
}
