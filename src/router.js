// router.js
import * as React from "react"
import { createBrowserRouter } from "react-router-dom"
import Home from "./Pages/Home"
import Login from "./Pages/Login"
import GamesExotics from "./Pages/GamesExotics"
import Register from "./Pages/Register"
import Tokens from "./Pages/Tokens"
import TermsAndConditions from "./Pages/TermsAndConditions"
import About from "./Pages/About"
import MyBet from "./Pages/MyBet"
import AdminDashboard from "./admin/AdminDashboard"
import AdminLogin from "./admin/AdminLogin"
import Reglement from "./Pages/Reglement"
import Cgv from "./Pages/Cgv"


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
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
  },
  {
    path: "/admin",
    element: <AdminLogin />
  },
  {
    path: "/admin-dashboard",
    element: <AdminDashboard />
  },
  {
    path: "/reglement",
    element: <Reglement />
  },
  {
    path: "/cgv",
    element: <Cgv />
  }

]);

export default router
