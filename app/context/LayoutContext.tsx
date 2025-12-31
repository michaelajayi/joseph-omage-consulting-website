'use client';

import { createContext, useContext, ReactNode, useState, useCallback } from "react";

interface SectionHeights {
  [key: string]: number;
}

interface LayoutContextType {
  sectionHeights: SectionHeights;
  setSectionHeight: (key: string, height: number) => void;
  getOverlap: (key: string, fraction?: number) => number;
}

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

export const LayoutProvider = ({ children }: { children: ReactNode }) => {
  const [sectionHeights, setSectionHeights] = useState<SectionHeights>({});

  const setSectionHeight = useCallback((key: string, height: number) => {
    setSectionHeights(prev => ({ ...prev, [key]: height }));
  }, []);

  const getOverlap = useCallback((key: string, fraction: number = 0.5) => {
    return (sectionHeights[key] || 0) * fraction;
  }, [sectionHeights]);

  return (
    <LayoutContext.Provider value={{ sectionHeights, setSectionHeight, getOverlap }}>{children}</LayoutContext.Provider>
  )
}

export const useLayout = () => {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error('useLayout must be used within LayoutProvider');
  }
  return context;
}
