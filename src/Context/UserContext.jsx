import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export const UserContext = createContext();

export default function UserContextProvider({ children }) {
  
  
  const [userData, setUserData] = useState(() => {
    return localStorage.getItem("userData") || null;
  });
  const [userId, setUserId] = useState(() => {
    return localStorage.getItem("userId") || null;
  });
  const [userName, setuserName] = useState(() => {
    return localStorage.getItem("userName") || null;
  });

  useEffect(() => {
    if (userData) {
      const decodedToken = jwtDecode(userData);
      setUserId(decodedToken.id);
      localStorage.setItem("userId", decodedToken.id);
      localStorage.setItem("userName", decodedToken.name);
      setuserName( decodedToken.name) 
    }
  }, [userData]);


  return (
    <UserContext.Provider value={{ userData, setUserData, userName , userId  }}>
      {children}
    </UserContext.Provider>
  );
}
