import { createContext } from 'react';


interface ContextProps {
isMenuOpen: boolean;

// method
toggleSideMenu: () => void;
 
}

export const UIContext = createContext({} as ContextProps );