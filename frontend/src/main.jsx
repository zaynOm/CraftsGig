import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./index.css";
import Layout from "@/pages/Layout";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Gig from "./pages/Gig";
import { AuthProvider } from "@/context/AuthContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/gigs/:Id",
        element: <Gig />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>,
);
