'use client'

import { create } from 'zustand';
import { Character } from "../api";
import { persist, createJSONStorage, StateStorage } from 'zustand/middleware';

interface WalletStore {
  favorites: Character[];
  addCharacter: (character: Character) => void;
  deleteCharacter: (character: Character) => void;
  removeCharacterByIndex: (index: number) => void;
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
      // Alternative: Remove by index
      removeCharacterByIndex: (index: Number) => {
        set((state) => ({
          favorites: state.favorites.filter((_, i) => i !== index)
        }));
      }
    }),
    {
      name: 'favorite-character',
      storage: createJSONStorage(() => localStorage),
    }
  )
);