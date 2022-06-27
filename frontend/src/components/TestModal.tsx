import React from "react";

function TestModal() {
  return (
    <div className="w-full h-full fixed flex justify-center z-99">
      <div className="w-[500px] h-[500px] rounded-[12px] bg-white border-black border-2  p-[25px]">
        <div className="flex justify-end">
          <button>X</button>
        </div>
        <div className="">
          <h1 className="leading-[400px] text-center text-3xl">modal</h1>
        </div>
      </div>
    </div>
  );
}

export default TestModal;
