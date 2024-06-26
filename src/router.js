// router.js
import * as React from "react";
import { createBrowserRouter } from "react-router-dom";
import Home from "./Pages/Home";
import Euro24 from "./Pages/Euro24";
import Login from "./Pages/Login";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/euro24",
    element: <Euro24 />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default router;
