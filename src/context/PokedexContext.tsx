import { createContext, useContext } from "react";
import { PokemonMap } from "src/types/types";

interface PokedexContextModel {
  pokemonMap: PokemonMap,
  setPokedex: (pokemonMap: any) => void
}

export const PokedexContext = createContext<PokedexContextModel | null>(null);

export default function usePokedex() {
  const pokedexContext = useContext(PokedexContext);
  if (!pokedexContext) {
    throw new Error("usePokedex must be within a PokedexContextProvider")
  };
  return pokedexContext;
}
