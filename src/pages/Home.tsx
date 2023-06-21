import { useEffect } from 'react';
import usePokedex from 'src/context/PokedexContext';
import { getPokemon } from '../api/client';
import { Pokedex } from '../components/Pokedex/Pokedex';
import { PokemonMap } from '../types/types';

export function Home() {
  const { pokemonMap, setPokedex } = usePokedex();

  useEffect(() => {
    const pokemonMap: PokemonMap = {};

    getPokemon()
      .then((pokemonList) => {
        pokemonList.forEach((pokemon) => {
          const { id } = pokemon;
          pokemonMap[id] = pokemon
        });
      })
      .finally(() => {
        setPokedex(pokemonMap)
      })
  }, [])

  return (
    <div>
      { (Object.keys(pokemonMap).length) ? (
        <Pokedex pokemonMap={pokemonMap} />
      ) : (
        <div>Loading...</div>
      )}

    </div>
  )
}

export default Home;
