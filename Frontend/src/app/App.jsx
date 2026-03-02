import HomePage from "../pages/HomePage.jsx";
import CartPage from "../pages/CartPage.jsx";
import Admin from "../pages/Admin.jsx";
import Profile from "../pages/Profile.jsx";
import FavouritePage from "../pages/FavouritePage.jsx";
import ProductDetails from "../components/common/ProductDetails.jsx";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import OrderPage from "../pages/OrderPage.jsx";
import SignUp from "../pages/SignUp.jsx";
import { AuthProvider } from "../context/AuthContext.jsx";
import ProtectedRoute from "../components/common/ProtectedRoute.jsx";

// Root layout that provides AuthContext to all routes
const RootLayout = () => {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
};

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/cart",
        element: (
          <ProtectedRoute>
            <CartPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/order",
        element: (
          <ProtectedRoute>
            <OrderPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/favourite",
        element: (
          <ProtectedRoute>
            <FavouritePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
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
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
