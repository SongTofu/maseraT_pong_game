import React from "react";
import SecAuthContent from "../components/Content/SecAuthContent";

function SecondAuth(): JSX.Element {
  return (
    <div className="auth__wrap bg-red-900 flex items-center p-10 my-20 mx-28 min-w-max">
      <SecAuthContent />
    </div>
  );
}

export default SecondAuth;
