import React from "react";
import RecordList from "./RecordList";

function PopUpRecord(): JSX.Element {
  return (
    <>
      <div className="wrap h-[300px] overflow-auto">
        <RecordList
          enemy={"Nickname"}
          date={"2022.07.01 16:40"}
          isLadder={true}
          gameWin={true}
        />
        <RecordList
          enemy={"Nickname"}
          date={"2022.07.02 17:40"}
          isLadder={true}
          gameWin={true}
        />
        <RecordList
          enemy={"Nickname"}
          date={"2022.07.02 18:40"}
          isLadder={true}
          gameWin={false}
        />
        <RecordList
          enemy={"Nickname"}
          date={"2022.07.02 19:20"}
          isLadder={false}
          gameWin={false}
        />
        <RecordList
          enemy={"Nickname"}
          date={"2022.07.02 19:30"}
          isLadder={true}
          gameWin={false}
        />
        <RecordList
          enemy={"Nickname"}
          date={"2022.07.02 19:35"}
          isLadder={false}
          gameWin={true}
        />
        <RecordList
          enemy={"Nickname"}
          date={"2022.07.02 19:42"}
          isLadder={true}
          gameWin={true}
        />
        <RecordList
          enemy={"Nickname"}
          date={"2022.07.02 19:52"}
          isLadder={false}
          gameWin={true}
        />
      </div>
    </>
  );
}

export default PopUpRecord;
