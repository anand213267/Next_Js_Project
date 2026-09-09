"use client";

const { createContext, useState } = require("react");

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
    const [isLogin, setIsLogin] = useState(null);
    const [userData, setUserData] = useState({});

    return (
        <AuthContext.Provider value={{
            isLogin,
            setIsLogin,
            userData,
            setUserData
        }}>
            {children}
        </AuthContext.Provider>
    )
}