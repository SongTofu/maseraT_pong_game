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
import { GameJoinDto } from "./dto/game-room-join.dto";
import { GameLeaveDto } from "./dto/game-room-leave.dto";
import { User } from "src/user/user.entity";
import { GameParticipantProfile } from "./dto/game-participant-profile.dto";
import { UserState } from "src/user/user-state.enum";
import { BadRequestException } from "@nestjs/common";

const cvs = {
  width: 600,
  height: 400,
};
//api에서 레더룸 삭제, createroom 레더게임시 안보여주기
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
  ): Promise<void> {
    const { userId, isLadder, isSpeedMode } = gameJoinDto;
    let gameRoomId = gameJoinDto.gameRoomId;
    const user: User = await this.userRepository.findOne(userId);

    let isCreate: Boolean = false;
    const joinGameTitle = "game-" + gameRoomId;

    if (!gameRoomId) {
      gameRoomId = await this.gameRoomRepository.createRoom(
        gameJoinDto,
        this.gameData,
      );
      isCreate = true;
    }
    //createRoom함수 안으로 넣음
    // if (isCreate) {
    //   this.gameData[gameRoomId] = {};
    //   this.gameData[gameRoomId].ball = new BallData();
    //   this.gameData[gameRoomId].leftUser = new UserData(true);
    //   this.gameData[gameRoomId].rightUser = new UserData(false);
    //   this.gameData[gameRoomId].isLadder = isLadder;
    //   this.gameData[gameRoomId].isSpeedMode = isSpeedMode;
    // }

    const gameRoom: GameRoom = await this.gameRoomRepository.findOne(
      gameRoomId,
    );
    const joinUser: GameParticipant =
      await this.gameParticipantRepository.findOne({
        where: { gameRoom: gameJoinDto.gameRoomId, user: user.id },
      });
    if (joinUser) {
      socket.join(joinGameTitle);
      return;
    }
    const gameUser: GameParticipantProfile = await this.joinGameRoom(
      gameJoinDto,
      user,
    );

    if (isCreate && gameJoinDto.isLadder == false) {
      this.server.emit("game-room-create", gameRoom);
    }

    socket.join(joinGameTitle);
    this.server
      .in(joinGameTitle)
      .emit("game-room-join", { gameRoomId, gameUser });
  }

  private async joinGameRoom(
    gameJoinDto: GameJoinDto,
    user: User,
  ): Promise<GameParticipantProfile> {
    const gameRoom: GameRoom = await this.gameRoomRepository.findOne(
      gameJoinDto.gameRoomId,
    );
    let gameParticipant: GameParticipant;

    const existLeftUser = await this.gameParticipantRepository.findOne({
      where: {
        gameRoom: gameJoinDto.gameRoomId,
        position: GamePosition.leftUser,
      },
    });

    const existRightUser = await this.gameParticipantRepository.findOne({
      where: {
        gameRoom: gameJoinDto.gameRoomId,
        position: GamePosition.rightUser,
      },
    });

    gameParticipant = this.gameParticipantRepository.create({
      user,
      gameRoom,
    });

    if (!existLeftUser) {
      gameParticipant.position = GamePosition.leftUser;
    } else if (!existRightUser) {
      gameParticipant.position = GamePosition.rightUser;
    } else {
      gameParticipant.position = GamePosition.spectator;
    }
    await gameParticipant.save();

    const gameParticipantProfile: GameParticipantProfile =
      new GameParticipantProfile(user, gameParticipant.position);

    return gameParticipantProfile;
  }

  private async escapeGame(gameRoom: GameRoom, user: User) {
    const gameRoomTitle: string = "game-" + gameRoom.id;
    const endGameInfo: GameParticipantProfile[] = [];
    const gameParticipants: GameParticipant[] =
      await this.gameParticipantRepository.find({
        where: { gameRoom },
        relations: ["user"],
      });
    let target: User;
    let gameWin: boolean = false;
    gameParticipants.forEach((gameParticipant) => {
      if (gameParticipant.user.id !== user.id) {
        if (gameParticipant.position === GamePosition.leftUser) {
          gameWin = true;
          target = gameParticipant.user;
          endGameInfo.push(
            new GameParticipantProfile(target, GamePosition.leftUser),
          );
        } else if (gameParticipant.position === GamePosition.rightUser) {
          target = gameParticipant.user;
          endGameInfo.push(
            new GameParticipantProfile(target, GamePosition.rightUser),
          );
        }
      }
    });
    gameRoom.isStart = false;
    await gameRoom.save();
    user.state = UserState.CONNECT; //게임중에서 접속 중으로 변경
    await user.save();
    await target.save();
    this.server.emit("change-state", {
      userId: user.id,
      state: user.state,
    });

    if (gameWin)
      this.recordRepository.gameEnd(gameRoom.isLadder, gameWin, target, user);
    if (gameRoom.isLadder) {
      const targetParticipant: GameParticipant =
        await this.gameParticipantRepository.findOne({
          where: { gameRoom, user: target },
          relations: ["user"],
        });
      await this.gameParticipantRepository.delete(targetParticipant);
      target.state = UserState.CONNECT;
      this.server.emit("change-state", {
        userId: target.id,
        state: target.state,
      });
      this.server.in(gameRoomTitle).emit("game-room-leave", {
        userId: target.id,
        gameRoomId: gameRoom.id,
      }); //괜춘ㄴ?
      this.server.in(target.socketId).socketsLeave(gameRoomTitle);
    }
    this.server.to(gameRoomTitle).emit("end-game", endGameInfo);
  }

  //게임 안끝났는데 나온 유저 체크
  @SubscribeMessage("game-room-leave")
  async handleGameRoomLeave(
    @ConnectedSocket() socket: Socket,
    @MessageBody() gameLeaveDto: GameLeaveDto,
  ): Promise<void> {
    const user: User = await this.userRepository.findOne(gameLeaveDto.userId);

    const gameRoom: GameRoom = await this.gameRoomRepository.findOne(
      gameLeaveDto.gameRoomId,
    );
    //게임 중에 나온 거라면
    if (gameRoom.isStart) {
      const gameParticipant: GameParticipant =
        await this.gameParticipantRepository.findOne({ where: { user } });
      if (gameParticipant.position === GamePosition.leftUser) {
        this.gameData[gameRoom.id].rightUser.score = 1;
      } else if (gameParticipant.position === GamePosition.rightUser) {
        this.gameData[gameRoom.id].leftUser.score = 1;
      }
      await this.endGameCheck(gameRoom.id);
      console.log("end game after");
      // if (gameRoom.isLadder) {
      //   return;
      // }
      // this.escapeGame(gameRoom, user);
      // clearInterval(this.gameData[gameRoom.id].interval);
    }

    const delUser: GameParticipant =
      await this.gameParticipantRepository.findOne({
        where: {
          gameRoom: gameLeaveDto.gameRoomId,
          user: user.id,
        },
      });

    await this.gameParticipantRepository.delete(delUser);

    const leaveGameTitle = "game-" + gameLeaveDto.gameRoomId;

    this.server.in(leaveGameTitle).emit("game-room-leave", gameLeaveDto);
    socket.leave(leaveGameTitle);

    //게임방 유저 모두 나가면 방 폭파
    const participant: GameParticipant =
      await this.gameParticipantRepository.findOne({
        where: { gameRoom: gameLeaveDto.gameRoomId },
      });
    if (!participant) {
      await this.gameParticipantRepository.deleteAllParticipants(
        gameLeaveDto.gameRoomId,
      );
      await this.gameRoomRepository.deleteRoom(gameLeaveDto.gameRoomId);
      this.server.emit("game-room-destroy", {
        gameRoomId: gameLeaveDto.gameRoomId,
      });
    }
  }

  //// test 게임방 참여, game room join으로 바꿔야함
  // @SubscribeMessage("test")
  // handleConnect(@ConnectedSocket() socket: Socket) {
  //   socket.join("game-1");
  // }
  @SubscribeMessage("start-game")
  async handleGameStart(@MessageBody() startGameDto: StartGameDto) {
    const { gameRoomId, isLadder } = startGameDto;

    const gameUsers: GameParticipant[] =
      await this.gameParticipantRepository.find({
        where: { gameRoom: gameRoomId },
        relations: ["user"],
      });

    const gameRoom: GameRoom = await this.gameRoomRepository.findOne(
      gameRoomId,
    );

    gameUsers.forEach(async (gameUser) => {
      gameUser.user.state = UserState.IN_GAME;
      await gameUser.user.save();
      this.server.emit("change-state", {
        userId: gameUser.user.id,
        state: gameUser.user.state,
      });
    });

    gameRoom.isStart = true;
    await gameRoom.save();
    this.server.emit("change-state-game", {
      gameRoomId,
      isStart: gameRoom.isStart,
    });
    // 방 생성, 방 수정으로 이동할 예정

    // this.server.in("game-" + gameRoomId).emit("game-start");

    this.gameData[gameRoomId].interval = setInterval(() => {
      this.update(gameRoomId);
      this.server
        .in("game-" + gameRoomId)
        .emit("game", this.gameData[gameRoomId]);
    }, 30);
  }

  @SubscribeMessage("user-paddle")
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
  async handleMatch(
    @ConnectedSocket() socket: Socket,
    @MessageBody() { userId },
  ) {
    // 유저 찾고
    const readyUser: User = await this.userRepository.findOne(userId);
    // 시작 안한 래더 게임방
    const ladderGameRoom: GameRoom = await this.gameRoomRepository.findOne({
      where: { isLadder: true, isStart: false },
    });
    let isCreate: Boolean = false;
    const ladderGameJoinDto: GameJoinDto = {
      gameRoomId: null,
      title: "",
      userId: readyUser.id,
      isSpeedMode: true,
      isLadder: true,
    };
    // 게임방 없으면 만들고
    if (!ladderGameRoom) {
      ladderGameJoinDto.gameRoomId = await this.gameRoomRepository.createRoom(
        ladderGameJoinDto,
        this.gameData,
      );
      isCreate = true;
    } else {
      ladderGameJoinDto.gameRoomId = ladderGameRoom.id;
    }
    // 만들어진 게임방, 기존 게임방
    const gameRoom: GameRoom = await this.gameRoomRepository.findOne(
      ladderGameJoinDto.gameRoomId,
    );

    // if (isCreate) {
    //   this.gameData[gameRoom.id] = {};
    //   this.gameData[gameRoom.id].ball = new BallData();
    //   this.gameData[gameRoom.id].leftUser = new UserData(true);
    //   this.gameData[gameRoom.id].rightUser = new UserData(false);
    //   this.gameData[gameRoom.id].isLadder = gameRoom.isLadder;
    //   this.gameData[gameRoom.id].isSpeedMode = gameRoom.isSpeedMode;
    // }
    // 게임 참여자
    await this.joinGameRoom(ladderGameJoinDto, readyUser);
    const joinGameTitle = "game-" + ladderGameJoinDto.gameRoomId;
    socket.join(joinGameTitle);

    if (!isCreate) {
      this.server
        .in(joinGameTitle)
        .emit("game-room-join", { gameRoomId: gameRoom.id });
    }
    // this.server.in(joinGameTitle).emit("match", { gameRoomId: gameRoom.id });
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

      if (this.gameData[gameRoomId].isSpeedMode && ball.speed < 25) {
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
    // this.endGameCheck(gameRoomId);
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
    if (
      this.gameData[gameRoomId].leftUser.score >= 1 ||
      this.gameData[gameRoomId].rightUser.score >= 1
    ) {
      clearInterval(this.gameData[gameRoomId].interval);
      let gameWin: boolean;

      if (this.gameData[gameRoomId].leftUser.score >= 1) {
        gameWin = true;
        // if (this.gameData[gameRoomId].isLadder) {
        //   leftUser.user.ladderWin++;
        //   rightUser.user.ladderLose++;
        // } else {
        //   leftUser.user.personalWin++;
        //   rightUser.user.personalLose++;
        // }
        // leftUser.user.level = +leftUser.user.level + 0.7;
      } else if (this.gameData[gameRoomId].rightUser.score >= 1) {
        gameWin = false;
        // if (this.gameData[gameRoomId].isLadder) {
        //   rightUser.user.ladderWin++;
        //   leftUser.user.ladderLose++;
        // } else {
        //   rightUser.user.personalWin++;
        //   leftUser.user.personalLose++;
        // }
        // rightUser.user.level = +rightUser.user.level + 0.7;
      }
      const leftUser = await this.gameParticipantRepository.findOne({
        where: { gameRoom: gameRoomId, position: GamePosition.leftUser },
        relations: ["user"],
      });
      const rightUser = await this.gameParticipantRepository.findOne({
        where: { gameRoom: gameRoomId, position: GamePosition.rightUser },
        relations: ["user"],
      });
      // if (!leftUser || !rightUser) return;

      this.recordRepository.gameEnd(
        this.gameData[gameRoomId].isLadder,
        gameWin,
        leftUser.user,
        rightUser.user,
      );

      const gameRoom: GameRoom = await this.gameRoomRepository.findOne(
        gameRoomId,
      );
      gameRoom.isStart = false;
      await gameRoom.save();
      // await rightUser.user.save();
      // await leftUser.user.save();
      this.server.emit("change-state-game", {
        gameRoomId,
        isStart: gameRoom.isStart,
      });

      // delete this.gameData[gameRoomId];
      this.gameData[gameRoomId].leftUser.score = 0;
      this.gameData[gameRoomId].rightUser.score = 0;

      const endGameInfo: GameParticipantProfile[] = [];
      endGameInfo.push(
        new GameParticipantProfile(leftUser.user, GamePosition.leftUser),
      );
      endGameInfo.push(
        new GameParticipantProfile(rightUser.user, GamePosition.rightUser),
      );

      // 게임 끝날 시 보내줄 정보 정하기 (유저 아이디랑, 승패) 왼, 오 순서, 레벨!
      rightUser.user.state = UserState.CONNECT;
      leftUser.user.state = UserState.CONNECT;
      await rightUser.user.save();
      await leftUser.user.save();
      this.server.emit("change-state", {
        userId: rightUser.user.id,
        state: rightUser.user.state,
      });
      this.server.emit("change-state", {
        userId: leftUser.user.id,
        state: leftUser.user.state,
      });
      this.resetBall(this.gameData[gameRoomId].ball);
      this.server.to("game-" + gameRoomId).emit("end-game", endGameInfo);
      this.server
        .in("game-" + gameRoomId)
        .emit("game", this.gameData[gameRoomId]);
    }
  }

  @SubscribeMessage("request-game")
  async handleRequestGame(
    // @ConnectedSocket() socket: Socket,
    @MessageBody() { userId, targetId, isSpeedMode },
  ) {
    const user: User = await this.userRepository.findOne(userId);
    const target: User = await this.userRepository.findOne(targetId);

    //유저 닉네임이랑, 스피드 모드인지
    this.server.in(target.socketId).emit("request-game", {
      nickname: user.nickname,
      isSpeedMode,
      targetId: userId,
    });
  }

  @SubscribeMessage("response-game")
  async handleResponseGame(
    @ConnectedSocket() socket: Socket,
    @MessageBody() { userId, targetId, isSpeedMode, isAccept },
  ) {
    if (!isAccept) {
      this.server.in(socket.id).emit("response-game", isAccept); //거절했다는 걸 알려줌
      return;
    }
    const user: User = await this.userRepository.findOne(userId);
    const target: User = await this.userRepository.findOne(targetId);

    const gameRoomJoin: GameJoinDto = {
      gameRoomId: null,
      title: "",
      userId: user.id,
      isSpeedMode,
      isLadder: false,
    };

    gameRoomJoin.gameRoomId = await this.gameRoomRepository.createRoom(
      gameRoomJoin,
      this.gameData,
    );
    const gameRoom: GameRoom = await this.gameRoomRepository.findOne(
      gameRoomJoin.gameRoomId,
    );
    this.server.emit("game-room-create", gameRoom);

    const gameUser: GameParticipantProfile = await this.joinGameRoom(
      gameRoomJoin,
      user,
    );
    const gameTarget: GameParticipantProfile = await this.joinGameRoom(
      gameRoomJoin,
      target,
    );

    const gameTitle: string = "game-" + gameRoom.id;
    socket.join(gameTitle);
    this.server.in(target.socketId).socketsJoin(gameTitle);

    this.server
      .in(gameTitle)
      .emit("game-room-join", { gameRoomId: gameRoom.id, gameUser });
    this.server
      .in(gameTitle)
      .emit("game-room-join", { gameRoomId: gameRoom.id, gameTarget });
  }
}
