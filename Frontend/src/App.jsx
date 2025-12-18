import React from "react";
import HomePage from "./pages/homepage/HomePage.jsx";
import CartPage from "./pages/CartPage.jsx";
import Admin from "./pages/adminpanel/Admin.jsx";
import Profile from "./pages/Profile.jsx";
import FavouritePage from "./pages/FavouritePage.jsx";
import ProductDetails from "./components/ProductDetails.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import OrderPage from "./pages/OrderPage.jsx";
import SignUp from "./pages/SignUp.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/cart",
    element: <CartPage />,
  },
  {
    path:"/order",
    element:<OrderPage/>
  },
  {
    path: "/favourite",
    element: <FavouritePage />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/product/:id",
    element: <ProductDetails />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/admin",
    element: <Admin />,
  },
]);
const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
