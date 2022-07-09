import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { RecoilRoot } from "recoil";
import PageLoading from "./components/PageLoading";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  // <React.StrictMode>
  <RecoilRoot>
    <Suspense fallback={<PageLoading />}>
      <App />
    </Suspense>
  </RecoilRoot>,
  // </React.StrictMode>,
);
