import { normalizeName } from 'src/utils/normalizeName';
import { PokemonInformation, PokemonWrapper, Type, TypesList } from './PokemonDetail.styled';
import { EvolutionChain } from '../EvolutionChain/EvolutionChain';
import { IPokemon, IPokemonSpecies, IEvolutionChain } from 'pokeapi-typescript';
import { PokemonTypes } from '../../types/types'

type PokemonPageLoader = {
  pokemon: IPokemon,
  species: IPokemonSpecies,
  evolutionChain: IEvolutionChain
}

export const PokemonDetail = (props: PokemonPageLoader) => {
  const {
    pokemon,
    species,
    evolutionChain
  } = props;


  const {
    species: { name },
    types,
    id,
    sprites: {
      front_default
    }
  } = pokemon;

  const {
    form_descriptions,
    flavor_text_entries
  } = species;

  return (
    <PokemonWrapper>
      <PokemonInformation>
        <img src={front_default} alt={name}/>
        <h2>{normalizeName(name)}</h2>
        <TypesList>
          {types.map(({ type: { name }, slot }) => <Type key={slot} type={name as PokemonTypes}>{name}</Type>)}
        </TypesList>
        <EvolutionChain chain={evolutionChain.chain} />
      </PokemonInformation>
    </PokemonWrapper>
  )
}
