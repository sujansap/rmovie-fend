import React from "react";
import ReactDOM from "react-dom/client";

import { ChakraProvider } from "@chakra-ui/react";
//import './index.css'
import {
  Navigate,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import theme from "./components/Theme";

import { AuthProvider } from "./contexts/Auth.context.jsx";

import AddMovie from "./pages/movies/AddMovie.jsx";

import Layout from "./components/Layout.jsx";
import Movieinfo from "./pages/movies/Movieinfo.jsx";
import Reviewinfo from "./pages/movies/reviews/Reviewinfo.jsx";
import ReviewEdit from "./pages/movies/reviews/ReviewEdit.jsx";
import Login from "./pages/Login.jsx";

import PrivateRoute from "./components/PrivateRoute";
import Logout from "./pages/Logout.jsx";
import ReviewList from "./pages/movies/ReviewList";
import Register from "./pages/Register.jsx";
import NotFound from "./components/NotFound";
import MovieList from "./pages/movies/MovieList";
const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Navigate replace to="/movies" />,
      },
      {
        path: "/login",

        element: <Login />,
      },
      {
        path: "/logout",
        element: <Logout />,
      },
      {
        path: "/register",
        element: <Register />,
      },

      {
        path: "/movies",
        element: <PrivateRoute />,
        children: [
          {
            index: true,
            element: <MovieList />,
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
        <RouterProvider router={router} />
      </ChakraProvider>
    </AuthProvider>
  </React.StrictMode>
);
