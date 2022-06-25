import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import LoginContent from "./LoginContent";

function Body(): JSX.Element {
  return (
    <div className="h-full w-full min-w-max">
      <Header />
      <div className="h-96 bg-white p-4 min-w-max">
        <div className="bg-white h-72 mx-4 my-8 flex min-w-max">
          <LoginContent />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Body;
