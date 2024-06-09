// router.js
import * as React from "react";
import { createBrowserRouter } from "react-router-dom";
import Home from "./Pages/Home";
import Euro24 from "./Pages/Euro24";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/euro24",
    element: <Euro24 />,
  },
]);

export default router;
