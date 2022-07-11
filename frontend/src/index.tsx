import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { RecoilRoot } from "recoil";
import PageLoading from "./components/PageLoading";
import { CookiesProvider } from "react-cookie";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  // <React.StrictMode>
  <RecoilRoot>
    <CookiesProvider>
      <Suspense fallback={<PageLoading />}>
        <App />
      </Suspense>
    </CookiesProvider>
  </RecoilRoot>,
  // </React.StrictMode>,
);
