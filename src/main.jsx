import React from "react";
import ReactDOM from "react-dom/client";

import { ChakraProvider, Box } from "@chakra-ui/react";
//import './index.css'
import {
  Navigate,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { ColorModeScript } from "@chakra-ui/react";
import theme from "./components/Theme";

import { AuthProvider } from "./contexts/Auth.context.jsx";

import MovieView from "./pages/movies/MovieView.jsx";

import AddMovie from "./pages/movies/AddMovie.jsx";

import Layout from "./components/Layout.jsx";
import Movieinfo from "./pages/movies/Movieinfo.jsx";
import Reviewinfo from "./pages/movies/reviews/Reviewinfo.jsx";
import ReviewEdit from "./pages/movies/reviews/ReviewEdit.jsx";
import Login from "./pages/Login.jsx";

import PrivateRoute from "./components/PrivateRoute";
import Logout from "./pages/Logout.jsx";
import ReviewList from "./components/reviews/ReviewList.jsx";
import Register from "./pages/Register.jsx";
import NotFound from "./components/NotFound";
const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Navigate replace to="/movies" />,
      },
      {
        path: "/movies",
        element: <PrivateRoute />,
        children: [
          {
            index: true,
            element: <MovieView />,
          },
          {
            path: ":id",
            element: <Movieinfo />,
          },
          {
            path: ":id/review",
            element: <Reviewinfo />,
          },
          {
            path: ":id/review/edit",
            element: <ReviewEdit />,
          },
          {
            path: "add",
            element: <AddMovie />,
          },

          {
            path: "edit/:id",
            element: <AddMovie />,
          },
        ],
      },
      {
        path: "/reviews",
        element: <PrivateRoute />,
        children: [
          {
            index: true,
            element: <ReviewList />,
          },
        ],
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
        path: "/logout",
        element: <Logout />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);
//
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />

        <RouterProvider router={router} />
      </ChakraProvider>
    </AuthProvider>
  </React.StrictMode>
);
