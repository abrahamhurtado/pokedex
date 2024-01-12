import { IChainLink, INamedApiResource, IPokemonSpecies } from 'pokeapi-typescript';
import { getArrayDepth } from './getArrayDepth';

type EvolutionChain = INamedApiResource<IPokemonSpecies>;

export const getEvolutionChain = (chain: IChainLink): EvolutionChain[] | EvolutionChain[][] | EvolutionChain[][][] => {
  const { species, evolves_to } = chain;

  if (!evolves_to.length) {
    return [species];
  }

  const _evolutionChain = evolves_to.map(newChain => {
    const evolutionChain = getEvolutionChain(newChain);

    if (Array.isArray(evolutionChain[0])) {
      return (evolutionChain).map((temporalEvolutionChain) => Array.isArray(temporalEvolutionChain) ? temporalEvolutionChain.concat(species): temporalEvolutionChain)
    } else {
      return (evolutionChain).concat(species)
    }
  });

  if (getArrayDepth(_evolutionChain) > 2) {
    return _evolutionChain.flat() as EvolutionChain[][];
  }

  return _evolutionChain as EvolutionChain[][];
}
