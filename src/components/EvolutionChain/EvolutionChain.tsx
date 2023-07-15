import { IChainLink } from 'pokeapi-typescript';

type EvolutionChainProps = {
  chain: IChainLink
}

export const EvolutionChain = ({ chain }: EvolutionChainProps) => {
  const { evolves_to, species } = chain;
  if (!evolves_to.length) {
    return <span>{species.name}</span>
  } 
  return (
    <>
      <span>{species.name}</span> 
      {evolves_to.flatMap((chainLink) => <EvolutionChain key={chainLink.species.name} chain={chainLink} />)}
    </>
  )
}
