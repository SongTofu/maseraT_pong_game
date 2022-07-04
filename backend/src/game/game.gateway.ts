import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
} from "@nestjs/websockets";
import { Socket } from "socket.io";

@WebSocketGateway({
  cors: {
    origin: "*",
  },
})
export class GameGateway {
  constructor() {}

  @WebSocketServer()
  server;
}
