import { ChatRoomList } from "../component/list/chat-room-list";
import { useState, useEffect } from "react";
import { ChatRoomInfo } from "../type/chat-room-info";
import { socket } from "../App";
import { useNavigate } from "react-router-dom";
import { ChatCreatePopup } from "../popup/chat-create-popup";
import { UserList } from "../component/list/user-list";
import TopBar from "../component/TopNavBar";
import Button from "../component/button/Button";
import PopupControl from "../popup/PopupControl";
import { getCookie } from "../func/cookieFunc";

export function ChatMain(): JSX.Element {
  const [rooms, setRooms] = useState<ChatRoomInfo[]>([]);
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL + "chat/room", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + getCookie("token")
      }
    })
      .then(res => res.json())
      .then((room: ChatRoomInfo[]) => {
        setRooms(room);
      });

    socket.on("chat-room-join", (chatRoomInfo: ChatRoomInfo) => {
      navigate("/chat/" + chatRoomInfo.chatRoomId);
    });
    return () => {
      socket.off("chat-room-join");
    };
  }, [navigate]);

  useEffect(() => {
    socket.on("chat-room-create", (chatRoomInfo: ChatRoomInfo) => {
      setRooms(curr => {
        return [...curr, chatRoomInfo];
      });
    });

    socket.on("chat-room-destroy", ({ chatRoomId }: { chatRoomId: number }) => {
      setRooms(curr =>
        curr.filter(idx => {
          return idx.chatRoomId !== +chatRoomId;
        })
      );
    });

    socket.on(
      "chat-room-setting",
      ({
        chatRoomId,
        title,
        isPassword
      }: {
        chatRoomId: number;
        title: string;
        isPassword: boolean;
      }) => {
        setRooms(currRooms => {
          return currRooms.map(currRoom => {
            if (currRoom.chatRoomId === +chatRoomId) {
              currRoom.isPassword = isPassword;
              currRoom.title = title;
            }
            return currRoom;
          });
        });
      }
    );

    return () => {
      socket.off("chat-room-create");
      socket.off("chat-room-destroy");
      socket.off("chat-room-setting");
    };
  }, [rooms]);

  const handleOptionChange = (val: boolean) => {
    setOpenModal(!val);
  };

  return (
    <div className="h-full flex flex-col">
      <TopBar>
        <div className="content">
          <div className="content-box w-[550px] mr-3 my-5">
            <div className="w-[90%] flex justify-end pt-4 pb-4">
              <Button
                tag={"방생성"}
                className="btn-sm px-4 tracking-widest text-sm"
                onClick={() => handleOptionChange(openModal)}
              />
              {openModal && (
                <PopupControl
                  mainText={"방생성"}
                  onClick={() => handleOptionChange(openModal)}
                >
                  <ChatCreatePopup />
                </PopupControl>
              )}
            </div>
            <div className="h-full w-full flex flex-col items-center">
              {rooms.map(room => {
                return (
                  <ChatRoomList
                    key={room.chatRoomId}
                    chatRoomId={room.chatRoomId}
                    title={room.title}
                    isPassword={room.isPassword}
                  />
                );
              })}
            </div>
          </div>
          <div>
            <UserList isChatRoom={false} participants={null} />
          </div>
        </div>
      </TopBar>
    </div>
  );
}
