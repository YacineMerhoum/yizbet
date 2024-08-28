// router.js
import * as React from "react";
import { createBrowserRouter } from "react-router-dom";
import Home from "./Pages/Home";
import Euro24 from "./Pages/Euro24";
import Login from "./Pages/Login";
import GamesExotics from "./Pages/GamesExotics";
import Register from "./Pages/Register";
import Tokens from "./Pages/Tokens";

import TermsAndConditions from "./Pages/TermsAndConditions";
import About from "./Pages/About";
import MyBet from "./Pages/MyBet";


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
  {
    path: "/games-exotics",
    element: <GamesExotics />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/tokens",
    element: <Tokens />,
  },
  {
   path: "/conditions",
   element:<TermsAndConditions />

  },
  {
    path: "/about-us",
    element: <About />
  },
  {
    path: "/mybet",
    element: <MyBet />
  }
]);

export default router;
