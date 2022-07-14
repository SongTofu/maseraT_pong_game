import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
} from "@nestjs/websockets";
import { Socket } from "socket.io";
import { GameRoomRepository } from "./repository/game-room.repository";
import { GameParticipantRepository } from "./repository/game-participant.repository";
import { GameRoom } from "./entity/game-room.entity";
import { BallData } from "./data/ball-data";
import { UserData } from "./data/user-data";
import { StartGameDto } from "./dto/start-game.dto";
import { GamePosition } from "./game-position.enum";
import { GameParticipant } from "./entity/game-participant.entity";
import { RecordRepository } from "src/record/record.repository";
import { GameDataDto } from "./dto/game-data.dto";
import { UserRepository } from "src/user/user.repository";
import { GameJoinDto, GameLeaveDto } from "./dto/game-room.dto";
import { User } from "src/user/user.entity";
import { GameParticipantDto } from "./dto/game-participant.dto";

const cvs = {
  width: 600,
  height: 400,
};

@WebSocketGateway({
  cors: {
    origin: "*",
  },
})
export class GameGateway {
  constructor(
    private gameRoomRepository: GameRoomRepository,
    private gameParticipantRepository: GameParticipantRepository,
    private recordRepository: RecordRepository,
    private userRepository: UserRepository,
  ) {}

  gameData: Object = {};
  match = [];

  @WebSocketServer()
  server;

  @SubscribeMessage("game-room-join")
  async handleJoinGameRoom(
    @ConnectedSocket() socket: Socket,
    @MessageBody() gameJoinDto: GameJoinDto,
  ) {
    const user: User = await this.userRepository.findOne(gameJoinDto.userId);
    const isJoin: boolean = await this.joinGameRoom(gameJoinDto, user);

    // id가 0이여서 방을 새로 만드는 경우
    if (!gameJoinDto.gameRoomId) {
      gameJoinDto.gameRoomId = await this.gameRoomRepository.createRoom(
        gameJoinDto,
      );
    }

    if (!isJoin) return;

    // 방에 들어올 때 무조건 관전자로 들어오는지?
    // leftUser, rightUser 체크해서 없으면 거기 넣어야할거같은데?
    const gameParticipantDto: GameParticipantDto = {
      gameRoomId: gameJoinDto.gameRoomId,
      title: gameJoinDto.title,
      userId: user.id,
      nickname: user.nickname,
      position: GamePosition.spectator,
    };

    const joinGameTitle = "game-" + gameParticipantDto.gameRoomId;

    this.server.in(joinGameTitle).emit("game-room-join", gameParticipantDto);

    socket.join(joinGameTitle);
  }

  private async joinGameRoom(
    gameJoinDto: GameJoinDto,
    user: User,
  ): Promise<boolean> {
    const gameRoom: GameRoom = await this.gameRoomRepository.findOne(
      gameJoinDto.gameRoomId,
    );

    // 게임 첫 참여자는 무조건 leftUser인지?
    if (!gameJoinDto.gameRoomId) {
      let gameParticipant: GameParticipant =
        this.gameParticipantRepository.create({
          position: GamePosition.leftUser,
          user,
          gameRoom,
        });

      const participant = this.gameParticipantRepository.find({
        where: {
          gameRoom,
        },
        order: {
          position: "ASC",
        },
      });

      if (!participant[0]) {
        gameParticipant = this.gameParticipantRepository.create({
          position: GamePosition.leftUser,
          user,
          gameRoom,
        });
      } else if (!participant[1]) {
        gameParticipant = this.gameParticipantRepository.create({
          position: GamePosition.rightUser,
          user,
          gameRoom,
        });
      } else if (!participant[2]) {
        gameParticipant = this.gameParticipantRepository.create({
          position: GamePosition.spectator,
          user,
          gameRoom,
        });
      }
      await gameParticipant.save();

      return true;
    }
    return false;
  }

  // gameRoomId, userId
  @SubscribeMessage("game-room-leave")
  async handleGameRoomLeave(
    @ConnectedSocket() socket: Socket,
    @MessageBody() gameLeaveDto: GameLeaveDto,
  ): Promise<void> {
    const user: User = await this.userRepository.findOne(gameLeaveDto.userId);

    const gameParticipantDto: GameParticipantDto = {
      gameRoomId: gameLeaveDto.gameRoomId,
      title: gameLeaveDto.title,
      userId: user.id,
      nickname: user.nickname,
      position: GamePosition.spectator,
    };

    const leaveGameTitle = "game-" + gameParticipantDto.gameRoomId;

    socket.leave(leaveGameTitle);

    const delUser: GameParticipant =
      await this.gameParticipantRepository.findOne({
        where: {
          gameRoom: gameLeaveDto.gameRoomId,
          user: user.id,
        },
      });

    await this.gameParticipantRepository.delete(delUser);

    const participant: GameParticipant =
      await this.gameParticipantRepository.findOne(gameLeaveDto.userId);

    this.server.in(leaveGameTitle).emit("game-room-leave", gameLeaveDto);

    // spactator가 나가면 무시
    // leftUser 혹은 rightUser가 나가면 게임 중지 후 대기?
    // 전부 다 나가면 gameRoom 폭파
    if (
      participant.position === GamePosition.leftUser ||
      participant.position === GamePosition.rightUser
    ) {
      participant.position = null;
    } else if (!participant) {
      await this.gameRoomRepository.deleteRoom(gameLeaveDto.gameRoomId);
    }
  }

  //// test 게임방 참여, game room join으로 바꿔야함
  @SubscribeMessage("test")
  handleConnect(@ConnectedSocket() socket: Socket) {
    socket.join("game-1");
  }

  @SubscribeMessage("start-game")
  async handleGameStart(@MessageBody() startGameDto: StartGameDto) {
    const { gameRoomId, isLadder } = startGameDto;

    // const gameRoom: GameRoom = await this.gameRoomRepository.findOne(
    //   gameRoomId,
    // );

    // gameRoom.isStart = true;
    // await gameRoom.save();

    // 방 생성, 방 수정으로 이동할 예정
    this.gameData[gameRoomId] = {};
    this.gameData[gameRoomId].ball = new BallData();
    this.gameData[gameRoomId].leftUser = new UserData(true);
    this.gameData[gameRoomId].rightUser = new UserData(false);
    this.gameData[gameRoomId].isLadder = isLadder;
    this.gameData[gameRoomId].mode = 1;
    this.server.in("game-" + gameRoomId).emit("game-start");

    this.gameData[gameRoomId].interval = setInterval(() => {
      this.update(gameRoomId);
      this.server
        .in("game-" + gameRoomId)
        .emit("game", this.gameData[gameRoomId]);
    }, 30);
  }

  // @SubscribeMessage("left-user")
  // handleLeftUser(
  //   @ConnectedSocket() socket: Socket,
  //   @MessageBody() data: { gameRoomId: number; y: number },
  // ) {
  //   this.gameData[data.gameRoomId].leftUser.y = data.y;
  // }

  // @SubscribeMessage("right-user")
  // handleRightUser(
  //   @ConnectedSocket() socket: Socket,
  //   @MessageBody() data: { gameRoomId: number; y: number },
  // ) {
  //   this.gameData[data.gameRoomId].rightUser.y = data.y;
  // }

  @SubscribeMessage("user")
  handleGame(
    @ConnectedSocket() socket: Socket,
    // @MessageBody() data: { gameRoomId: number; position: number; y: number },
    @MessageBody() gameDataDto: GameDataDto,
  ) {
    if (gameDataDto.position === GamePosition.leftUser) {
      this.gameData[gameDataDto.gameRoomId].leftUser.y = gameDataDto.y;
    } else if (gameDataDto.position === GamePosition.rightUser) {
      this.gameData[gameDataDto.gameRoomId].rightUser.y = gameDataDto.y;
    }
  }

  @SubscribeMessage("match")
  handleMatch(@ConnectedSocket() socket: Socket) {
    // this.userRepository.findOne({
    //   where: {
    //   },
    // });
    // this.match.push(data.userId);
    if (this.match.length >= 2) {
      //게임방 join 추가
      const startGameDto: StartGameDto = { isLadder: true, gameRoomId: 1 };
      this.handleGameStart(startGameDto);
    }
  }

  // ladder 게임과 일반 게임 차이 추가 해야함!
  private update(gameRoomId: number) {
    const { ball, leftUser, rightUser } = this.gameData[gameRoomId];
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;

    // 위 아래 벽 충돌 시
    if (ball.y + ball.radius > cvs.height || ball.y - ball.radius < 0) {
      ball.velocityY = -ball.velocityY;
    }

    const player = ball.x < cvs.width / 2 ? leftUser : rightUser;

    if (this.collision(ball, player)) {
      let collidePoint: number = ball.y - (player.y + player.height / 2);

      collidePoint = collidePoint / (player.height / 2);

      const angleRad: number = collidePoint * (Math.PI / 4);

      const direction: number = ball.x < cvs.width / 2 ? 1 : -1;

      ball.velocityX = ball.speed * Math.cos(angleRad) * direction;
      ball.velocityY = ball.speed * Math.sin(angleRad);

      if (this.gameData[gameRoomId].mode && ball.speed < 25) {
        ball.speed += 2;
      }
    }

    if (ball.x - ball.radius < -10) {
      rightUser.score++;
      this.resetBall(ball);
      this.endGameCheck(gameRoomId);
    } else if (ball.x + ball.radius > cvs.width + 10) {
      leftUser.score++;
      this.resetBall(ball);
      this.endGameCheck(gameRoomId);
    }
  }

  private collision(ball: BallData, player: UserData) {
    ball.top = ball.y - ball.radius;
    ball.bottom = ball.y + ball.radius;
    ball.left = ball.x - ball.radius;
    ball.right = ball.x + ball.radius;

    player.top = player.y;
    player.bottom = player.y + player.height;
    player.left = player.x;
    player.right = player.x + player.width;

    return (
      ball.right >= player.left &&
      ball.bottom >= player.top &&
      ball.left <= player.right &&
      ball.top <= player.bottom
    );
  }

  private resetBall(ball: BallData) {
    const direction: number = ball.x < 0 ? 1 : -1;
    ball.x = cvs.width / 2;
    ball.y = cvs.height / 2;

    ball.speed = 5;
    ball.velocityX = ball.speed * Math.cos(Math.PI / 4) * direction;
    ball.velocityY = ball.speed * Math.sin(Math.PI / 4);
  }

  private async endGameCheck(gameRoomId: number) {
    // const leftUser = await this.gameParticipantRepository.findOne({
    //   where: { gameRoom: gameRoomId, position: GamePosition.leftUser },
    //   relations: ["User"],
    // });
    // const rightUser = await this.gameParticipantRepository.findOne({
    //   where: { gameRoom: gameRoomId, position: GamePosition.rightUser },
    //   relations: ["User"],
    // });

    if (
      this.gameData[gameRoomId].leftUser.score > 5 ||
      this.gameData[gameRoomId].rightUser.score > 5
    ) {
      clearInterval(this.gameData[gameRoomId].interval);
      // let gameWin: boolean;

      // if (this.gameData[gameRoomId].leftUser.score > 5) {
      //   gameWin = true;
      // } else if (this.gameData[gameRoomId].rightUser > 5) {
      //   gameWin = false;
      // }

      // this.recordRepository.gameEnd(
      //   this.gameData[gameRoomId].isLadder,
      //   gameWin,
      //   leftUser.user,
      //   rightUser.user,
      // );

      // const gameRoom: GameRoom = await this.gameRoomRepository.findOne(
      //   gameRoomId,
      // );
      // gameRoom.isStart = false;
      // gameRoom.save();

      delete this.gameData[gameRoomId];

      // 게임 끝날 시 보내줄 정보 정하기
      this.server.to("game-" + gameRoomId).emit("end-game", {});
    }
  }
}
