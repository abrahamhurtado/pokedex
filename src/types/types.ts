import { IPokemon } from "pokeapi-typescript";

export interface PokemonMap {
  [name: string]: IPokemon
};

export type PokemonTypes = 'fire' | 'water' | 'dark' | 'psychic' | 'grass' | 'poison' | 'fairy' | 'electric' | 'dragon' | 'fighting' | 'normal' | 'ghost' | 'steel' | 'flying' | 'rock' | 'ground' | 'ice' | 'bug'
