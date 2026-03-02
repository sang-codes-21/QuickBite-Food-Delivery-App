import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  // Load user from localStorage on mount
  useEffect(() => {
    const raw = localStorage.getItem("quickbite_user");
    if (raw) {
      try {
        setUser(JSON.parse(raw));
      } catch {
        setUser(null);
      }
    }
  }, []);

  // Listen for storage changes (e.g. after login from LoginPage)
  useEffect(() => {
    const handleStorage = () => {
      const raw = localStorage.getItem("quickbite_user");
      if (raw) {
        try {
          setUser(JSON.parse(raw));
        } catch {
          setUser(null);
        }
      } else {
        setUser(null);
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const login = useCallback((userData) => {
    localStorage.setItem("quickbite_user", JSON.stringify(userData));
    setUser(userData);
    setIsLoginOpen(false);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("quickbite_user");
    setUser(null);
  }, []);

  const openLogin = useCallback(() => {
    setIsLoginOpen(true);
  }, []);

  const closeLogin = useCallback(() => {
    setIsLoginOpen(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        login,
        logout,
        isLoginOpen,
        openLogin,
        closeLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthContext;
