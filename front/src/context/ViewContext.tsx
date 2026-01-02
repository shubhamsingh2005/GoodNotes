import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ViewContextType {
  view: 'grid' | 'list';
  toggleView: () => void;
}

const ViewContext = createContext<ViewContextType | undefined>(undefined);

export const ViewProvider = ({ children }: { children: ReactNode }) => {
  const [view, setView] = useState<'grid' | 'list'>('grid');

  const toggleView = () => {
    setView((prev) => (prev === 'grid' ? 'list' : 'grid'));
  };

  return (
    <ViewContext.Provider value={{ view, toggleView }}>
      {children}
    </ViewContext.Provider>
  );
};

export const useView = (): ViewContextType => {
  const context = useContext(ViewContext);
  if (!context) {
    throw new Error('useView must be used within a ViewProvider');
  }
  return context;
};
