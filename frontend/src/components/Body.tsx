import React from "react";
import LoginContent from "./LoginContent";

function Body(): JSX.Element {
  return (
    <div className="bg-red-900 p-10 flex items-center my-20 mx-28 min-w-max">
      <LoginContent />
    </div>
  );
}

export default Body;
