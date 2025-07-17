import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./pages/Layout";
import Hero from "./components/Hero";
import Reg from "./pages/Reg";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Product from "./pages/Product";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Hero />,
      },
      {
        path: "/register",
        element: <Reg />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/products",
        element: <Product />,
      },
      {
        path: "/addProduct",
        element: <AddProduct />,
      },
      {
        path: "/editProduct/:id",
        element: <EditProduct />,
      },
    ],
  },
]);

const App = () => {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
