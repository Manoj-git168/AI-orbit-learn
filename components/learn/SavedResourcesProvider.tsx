"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface SavedResourcesContextValue {
  savedIds: string[];
  isSaved: (id: string) => boolean;
  toggleSaved: (id: string) => void;
}

const SavedResourcesContext =
  createContext<SavedResourcesContextValue | null>(null);

const STORAGE_KEY = "ai-orbit-saved-resources";

export function SavedResourcesProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);

      if (stored) {
        setSavedIds(JSON.parse(stored));
      }
    } catch {
      setSavedIds([]);
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(savedIds)
    );
  }, [savedIds, hydrated]);

  const isSaved = (id: string) => {
    return savedIds.includes(id);
  };

  const toggleSaved = (id: string) => {
    setSavedIds((current) => {
      if (current.includes(id)) {
        return current.filter((savedId) => savedId !== id);
      }

      return [...current, id];
    });
  };

  return (
    <SavedResourcesContext.Provider
      value={{
        savedIds,
        isSaved,
        toggleSaved,
      }}
    >
      {children}
    </SavedResourcesContext.Provider>
  );
}

export function useSavedResources() {
  const context = useContext(SavedResourcesContext);

  if (!context) {
    throw new Error(
      "useSavedResources must be used inside SavedResourcesProvider"
    );
  }

  return context;
}