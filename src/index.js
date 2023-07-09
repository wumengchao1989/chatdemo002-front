import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import ChatBoxLayout from "./components/chatbox/ChatBoxLayout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import DashboardAnalysisLayout from "./components/dashboardanalysis/DashboardanalysisLayout";
import ArchDesignLayout from "./components/archdesign/ArchdesignLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <ChatBoxLayout />,
      },
      {
        path: "/chatbox/:chatid",
        element: <ChatBoxLayout />,
      },
      {
        path: "dashboardanalysis",
        element: <DashboardAnalysisLayout />,
      },
      {
        path: "archdesign",
        element: <ArchDesignLayout />,
      },
    ],
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
