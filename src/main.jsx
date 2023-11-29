import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ChakraProvider, Box } from "@chakra-ui/react";
//import './index.css'
import {
  Navigate,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import { AuthProvider } from "./contexts/Auth.context.jsx";

import MovieView from "./pages/movies/MovieView.jsx";
import AddOrEditMovie from "./pages/movies/AddMovie.jsx";
import AddMovie from "./pages/movies/AddMovie.jsx";
import { Review } from "./components/reviews/Review.jsx";

import Layout from "./components/Layout.jsx";
import Movieinfo from "./pages/movies/reviews/Movieinfo.jsx";
import Reviewinfo from "./pages/movies/reviews/Reviewinfo.jsx";
//maak zo dat movie alleen toegevoegd kan worden, maar niet aangepast
// een review kan toegevoegd en aangepast worden

//via post man
//bearer token
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
            element: <Reviewinfo />,
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
        children: [
          {
            index: true,
            element: <Review />,
          },
        ],
      },
      /*{
        path: "/places",
        children: [
          {
            index: true,
            element: <PlacesList />,
          },
        ],
      },
      {
        path: "*",
        element: <NotFound />,
      },*/
    ],
  },
]);
//
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <ChakraProvider>
        <RouterProvider router={router} />
      </ChakraProvider>
    </AuthProvider>
  </React.StrictMode>
);
