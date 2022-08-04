import React from "react";
import { useEffect, useState } from "react";
import { RecordType } from "../type/record-type";
import { getCookie } from "../func/get-cookie";

export function Record({ userId }: { userId: number }): JSX.Element {
  const [records, setRecords] = useState<RecordType[]>([]);

  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL + "record/" + userId, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + getCookie("token")
      }
    })
      .then(res => res.json())
      .then((record: RecordType[]) => setRecords(record));
  }, []);

  return (
    <div>
      {records.map((record, index) => {
        return (
          <div key={index}>
            <span>vs </span>
            <span>{record.enemy} </span>
            <span>{record.isLadder ? "래더게임 " : "일반게임 "}</span>
            <span>{record.date}</span>
            <span>{record.gameWin ? " 승리" : " 패배"}</span>
          </div>
        );
      })}
    </div>
  );
}
