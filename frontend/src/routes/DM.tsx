import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Chat } from "../component/chat";
import { ChatType } from "../type/chat-type";
import { DMProfile } from "../component/DMProfile";

export function DM() {
  const { chatRoomId, targetId } = useParams();
  const [messages, setMessages] = useState<ChatType[]>([]);

  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL + "chat/dm/" + chatRoomId)
      .then(res => res.json())
      .then(json => setMessages(json.message));
  }, []);

  return (
    <div>
      <DMProfile targetId={targetId} />
      {messages.map((message, index) => (
        <Chat key={index} nickname={message.nickname} msg={message.message} />
      ))}
    </div>
  );
}
