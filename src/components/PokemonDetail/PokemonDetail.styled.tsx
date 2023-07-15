import { TYPES } from "src/utils/pokemonTypingColors";
import styled from "styled-components";

import { PokemonTypes } from '../../types/types'

export const PokemonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  padding: 16px;
`;

export const PokemonInformation = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  > *:not(:last-child) {
    margin-bottom: 8px;
  }
`;

export const Type = styled.li<{ type: PokemonTypes }>`
  background-color: ${props => TYPES[props.type]};
  padding: 2px 4px;
  border-radius: 4px;
  text-transform: capitalize;

  :not(:last-child) {
    margin-right: 4px;
  }
`

export const TypesList = styled.ul`
  display: flex;
  flex-direction: row;
  list-style: none;
`
