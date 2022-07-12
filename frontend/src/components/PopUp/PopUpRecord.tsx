import React from "react";
import { useRecoilValue } from "recoil";
import { getRecordSelector, IRecord } from "../../state/getRecord";
import RecordList from "../List/RecordList";
import shortid from "shortid";

function PopUpRecord(): JSX.Element {
  const records = useRecoilValue<IRecord[]>(getRecordSelector);

  return (
    <>
      <div className="wrap h-[300px] overflow-auto">
        {records.map((record) => (
          <div key={shortid.generate()}>
            <RecordList
              enemy={record.enemy}
              date={record.date}
              isLadder={record.isLadder}
              gameWin={record.gameWin}
            />
          </div>
        ))}
      </div>
    </>
  );
}

export default PopUpRecord;
