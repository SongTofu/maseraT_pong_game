export function Chat({ nickname, msg }) {
  return (
    <li>
      {nickname}
      {nickname ? ": " : ""}
      {msg}
    </li>
  );
}
