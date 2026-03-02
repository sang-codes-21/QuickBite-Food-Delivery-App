import { useAuth } from "../../context/AuthContext.jsx";
import TopPart from "../layout/TopPart.jsx";
import LoginPage from "../../pages/LoginPage.jsx";

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return (
      <>
        <TopPart />
        <main className="px-4 py-6 max-w-4xl mx-auto">
          {/* Blurred placeholder behind login */}
          <div className="relative">
            <div className="pointer-events-none select-none opacity-50">
              <div className="bg-white border rounded-lg p-6 sm:p-8 text-center">
                <h2 className="text-base sm:text-lg font-semibold mb-2">
                  Please log in to access this page
                </h2>
                <p className="text-sm sm:text-base text-gray-600">
                  You need an account to view your cart, favourites, and orders.
                </p>
              </div>
            </div>
          </div>
        </main>
        {/* Full-screen login overlay */}
        <LoginPage onClose={null} />
      </>
    );
  }

  return children;
};

export default ProtectedRoute;
