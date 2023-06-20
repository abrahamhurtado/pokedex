import React from "react"
import styled from "styled-components"
import { IPokemon } from "pokeapi-typescript"
import { Link } from "react-router-dom"

interface PokemonElementProps {
  pokemon: IPokemon,
  style: React.CSSProperties
}

export const CARD_WIDTH = 156;
export const CARD_HEIGHT = 176;

const PokemonCardContainer = styled.div`
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0,0,0,.0625);
  padding: 16px;
  width: 140px;
  height: 160px;
  cursor: pointer;
  background: #fff;

  &:focus, &:hover, &:active {
    padding: 14px;
    border: 2px solid blue;
  }

  a {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    text-decoration: none;
  }

  img {
    align-self: center;
  };

  p {
    text-decoration: none;
  }

  .number {
    color: #999;
    margin-bottom: 4px;
  }

  .name {
    text-transform: capitalize;
    color: #333;
  }
`;

export const PokemonCard = (props: PokemonElementProps) => {
  const { id, name, sprites: { front_default: sprite } } = props.pokemon as IPokemon;
  
  const GUTTER_SIZE = 16;

  const { top, left, height, width } = props.style;

  const style = {
    ...props.style,
    top: top as number + GUTTER_SIZE,
    left: left as number + GUTTER_SIZE,
    height: height as number - GUTTER_SIZE,
    width: width as number - GUTTER_SIZE
  };

  return (
    <PokemonCardContainer style={style}>
      <Link to={`/pokemon/${name}`}>
        <img src={sprite} alt={name} />
        <small className="number">#{String(id).padStart(3, '0')}</small>
        <h3 className="name">{name}</h3>
      </Link>
    </PokemonCardContainer>
  )
}

export default PokemonCard;
