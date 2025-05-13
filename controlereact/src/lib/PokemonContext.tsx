'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Pokemon } from './api';

interface PokemonContextType {
  caughtPokemon: number[];
  catchPokemon: (id: number) => void;
  releasePokemon: (id: number) => void;
  isCaught: (id: number) => boolean;
}

const PokemonContext = createContext<PokemonContextType | undefined>(undefined);

export function PokemonProvider({ children }: { children: ReactNode }) {
  const [caughtPokemon, setCaughtPokemon] = useState<number[]>([]);

  // Load caught Pokemon from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('caughtPokemon');
    if (saved) {
      try {
        setCaughtPokemon(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse caught Pokemon from localStorage', e);
      }
    }
  }, []);

  // Save caught Pokemon to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('caughtPokemon', JSON.stringify(caughtPokemon));
  }, [caughtPokemon]);

  const catchPokemon = (id: number) => {
    if (!caughtPokemon.includes(id)) {
      setCaughtPokemon(prev => [...prev, id]);
    }
  };

  const releasePokemon = (id: number) => {
    setCaughtPokemon(prev => prev.filter(pokemonId => pokemonId !== id));
  };

  const isCaught = (id: number) => {
    return caughtPokemon.includes(id);
  };

  return (
    <PokemonContext.Provider value={{ caughtPokemon, catchPokemon, releasePokemon, isCaught }}>
      {children}
    </PokemonContext.Provider>
  );
}

export function usePokemon() {
  const context = useContext(PokemonContext);
  if (context === undefined) {
    throw new Error('usePokemon must be used within a PokemonProvider');
  }
  return context;
}
