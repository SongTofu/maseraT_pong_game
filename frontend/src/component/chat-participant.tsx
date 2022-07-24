export function ChatParticipant({ userId, nickname, authority }) {
  return (
    <li id={userId}>
      {authority === 0 ? "참여자" : null}
      {authority === 1 ? "관리자" : null}
      {authority === 2 ? "방장" : null}
      <span> {nickname} </span>
    </li>
  );
}
