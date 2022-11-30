import { createContext, useEffect, useState } from "react";

// Firebase
import { onAuthStateChanged } from "firebase/auth";

import {auth} from "../../../../Config/firebase2"
import Loading from "../Loading";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
  }, []);

  if(loading){
    return <Loading />
  }

  return <AuthContext.Provider value={{user}}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
