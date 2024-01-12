import { INamedApiResource, IPokemonSpecies, IChainLink } from 'pokeapi-typescript';
import { getEvolutionChain } from 'src/utils/getEvolutionChain';
import { normalizeName } from 'src/utils/normalizeName';

type EvolutionChainProps = {
  chain: IChainLink
}

type EvolutionChain = INamedApiResource<IPokemonSpecies>;


export const EvolutionChain = ({ chain }: EvolutionChainProps) => {
  const evolutionChain = (getEvolutionChain(chain)) as EvolutionChain[][];
  console.log(evolutionChain)
  return <ul>
    {evolutionChain.map((_evolutionChain) => <li key={Math.random()}>
      <ul>
        {_evolutionChain.map(({ name, url }) => <li key={url}>
          {normalizeName(name)}
        </li>)}
      </ul>
    </li>)}
  </ul>
}
