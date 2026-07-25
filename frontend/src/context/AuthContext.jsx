import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false); 


    const checkAuth = async () => {
    try {
      const response = await api.get("/auth/profile");
      setUser(response.data.user);
      setIsAuthenticated(true); 

    } catch (error) {
       setUser(null);
       setIsAuthenticated(false);
    } finally {
       setLoading(false);
    }
};

useEffect(() => {
    checkAuth();
}, []);

return (
    <AuthContext.Provider
        value={{
            user,
            loading,
            isAuthenticated,
            checkAuth,
            setUser,
            setIsAuthenticated,
        }}
    >
        {children}
    </AuthContext.Provider>
);

};

export const useAuth = () => {
  return useContext(AuthContext);
};

