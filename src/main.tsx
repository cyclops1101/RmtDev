import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App.tsx";
import "./index.css";
import { Toaster } from "react-hot-toast";
import AppProviders from "./libs/AppProviders.tsx";


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
    <Toaster position="top-right" />
  </React.StrictMode>
);
