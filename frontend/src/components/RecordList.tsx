import React from "react";

interface RecordProps {
  enemy: string;
  date: string;
  isLadder: boolean;
  gameWin: boolean;
}

function RecordList({
  enemy,
  date,
  isLadder,
  gameWin,
}: RecordProps): JSX.Element {
  return (
    <>
      <div className="line__wrap flex justify-between m-2">
        <div
          className={`texts__wrap ${
            gameWin ? "bg-blue-800" : "bg-red-800"
          } rounded w-[420px] h-[40px] flex justify-between`}
        >
          <div className="text__wrap flex items-center ml-2">
            <span className="font-main text-xl text-white font-bold tracking-wider">
              {`vs ${enemy} `}
            </span>
          </div>
          <div className="text__wrap flex items-center">
            <span className="font-main text-xl text-white font-bold tracking-wider">
              {isLadder ? "래더 게임" : " 일반 게임"}
            </span>
          </div>
          <div className="text__wrap flex items-center mr-2">
            <span className="font-main text-xl text-white font-bold tracking-wider">
              {`${date}`}
            </span>
          </div>
        </div>
        <div className="text__wrap flex items-center">
          <span
            className={`font-main font-bold text-xl ${
              gameWin ? "text-blue-800" : "text-red-800"
            }`}
          >
            {gameWin ? "승리" : "패배"}
          </span>
        </div>
      </div>
    </>
  );
}

export default RecordList;
