import { IEvolutionChain, IPokemon, IPokemonSpecies } from "pokeapi-typescript";
import { useLoaderData, LoaderFunctionArgs } from "react-router-dom";
import { getPokemonByIdOrName, getPokemonSpecies, getEvolutionChain } from "src/api/client";
import { PokemonDetail } from "src/components/PokemonDetail/PokemonDetail";

type PokemonPageLoader = {
  pokemon: IPokemon,
  species: IPokemonSpecies,
  evolutionChain: IEvolutionChain
}

const extractEvolutionChainId = (evolutionChainUrl: string): string => {
  const splitValues = evolutionChainUrl
    .split("/")
    .filter(x => x);

  return splitValues[splitValues.length - 1]
}

export async function loader({ params }: LoaderFunctionArgs): Promise<PokemonPageLoader> {
  const pokemon = await getPokemonByIdOrName(`${params.id}`);
  const species = await getPokemonSpecies(`${params.id}`);

  const { evolution_chain } = species;
  const evolutionChainId = extractEvolutionChainId(evolution_chain.url);

  const evolutionChain = await getEvolutionChain(evolutionChainId);


  return {
    pokemon, species, evolutionChain
  }
}

export function Pokemon() {
  return <PokemonDetail {...useLoaderData() as PokemonPageLoader} />
}
