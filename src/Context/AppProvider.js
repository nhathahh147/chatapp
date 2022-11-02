import React from 'react';
import { AuthContext } from './AuthProvider';
import useFirestore from '../hooks/useFirestore';

export const AppContext = React.createContext();

export default function AppProvider({ children }) {
    
    const { 
        user: { uid }
    } = React.useContext(AuthContext);

    const roomsCondition = React.useMemo(() => {
        return {
            fieldName: 'members',
            operator: 'array-contains',
            comparaValue: uid
        }
    }, [uid])

    const rooms = useFirestore('rooms', roomsCondition);

  return (
    <AppContext.Provider value={{rooms}}>
        {children}
    </AppContext.Provider>
  );
}
