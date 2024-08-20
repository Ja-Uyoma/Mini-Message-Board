import "./index.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Root, { loader as rootLoader } from "./routes/Root";
import ErrorPage from "./routes/ErrorPage";
import MessagePage, { loader as msgLoader } from "./routes/MessagePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
  },
  {
    path: "/messages/:messageID",
    element: <MessagePage />,
    errorElement: <ErrorPage />,
    loader: msgLoader,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
