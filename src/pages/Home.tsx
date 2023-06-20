import { getPokemonResourceList, getPokemonByIdOrName } from '../api/client'
import { INamedApiResourceList, IPokemon } from 'pokeapi-typescript'
import { useLoaderData } from 'react-router-dom';
import { Pokedex } from '../components/Pokedex/Pokedex'

export async function loader() {
  const { results } = await getPokemonResourceList() as INamedApiResourceList<IPokemon>;
  const requests = results.map(({name}) => getPokemonByIdOrName(name));
  const pokemon = await Promise.all(requests);

  return pokemon;
}

export function Home() {
  const pokemon = useLoaderData() as IPokemon[];

  return (
    <div>
      <Pokedex pokemonList={pokemon} />
    </div>
  )
}

export default Home;
