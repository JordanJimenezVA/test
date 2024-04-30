import React, { createContext, useContext, useState } from 'react';

type UserType = 'Administrador' | 'Guardia' | 'Supervisor';

interface AuthContextType {
  userType: UserType | null;
  nombreUsuario: string | null;
  setUserType: (userType: UserType | null) => void;
  setNombreUsuario: (nombreUsuario: string | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userType, setUserType] = useState<UserType | null>(null);
  const [nombreUsuario, setNombreUsuario] = useState<string | null>(null);

  return (
    <AuthContext.Provider value={{ userType, nombreUsuario, setUserType, setNombreUsuario }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
