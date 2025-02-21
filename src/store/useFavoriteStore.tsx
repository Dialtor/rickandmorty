'use client'

import { create } from 'zustand';
import { Character } from '../components/Sidebar/components';
import { persist, createJSONStorage } from 'zustand/middleware';

interface WalletStore {
  favorites: Character[];
  addCharacter: (character: Character) => void;
  deleteCharacter: (character: Character) => void;
}

export const useFavoriteStore = create <WalletStore>()(
  persist(
    (set) => ({
      favorites: [],
      addCharacter: (character: Character) => {
        set((state) => ({
          favorites: [...state.favorites, character]
        }));
      },
      deleteCharacter: (character: Character) => {
        set((state) => ({
          favorites: state.favorites.filter((item) => item.id !== character.id)
        }));
      },
    }),
    {
      name: 'favorite-character',
      storage: createJSONStorage(() => localStorage),
    }
  )
);