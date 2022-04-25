import React, { Dispatch, SetStateAction, useState } from 'react';

interface AuthContextType {
  logged: boolean;
  setLogged?: Dispatch<SetStateAction<boolean>>;
  user: null,
}

export const AuthContext = React.createContext<AuthContextType>({
  logged: false,
  user: null,
});

export default function AuthProvider({
  children,
}: {
  children: React.ReactElement;
}) {

  const [logged, setLogged] = useState(false);

  return (
    <AuthContext.Provider
      value={{
        logged: logged,
        setLogged,
        user: null,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
