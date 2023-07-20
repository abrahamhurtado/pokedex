import React from "react"
// import styled from "styled-components"
import { IPokemon } from "pokeapi-typescript"
import { Link } from "react-router-dom"
import { normalizeName } from "src/utils/normalizeName"
import { styled } from "@styled-system/jsx"
interface PokemonElementProps {
  pokemon: IPokemon,
  style: React.CSSProperties
}

export const CARD_WIDTH = 156;
export const CARD_HEIGHT = 176;

const PokemonCardContainer = styled('div', {
  base: {
    borderRadius: 4,
    boxShadow: '0 2px 4px rgba(0,0,0,.0625)',
    padding: '16px',
    width: '140px',
    height: '160px',
    cursor: 'pointer',
    backgroundColor: '#fff',
    _focus: {
      padding: '14px',
      border: '2px solid blue'
    },
    _hover: {
      padding: '14px',
      border: '2px solid blue'
    },
    _active: {
      padding: '14px',
      border: '2px solid blue'
    }
  }
});

const LinkWrapper = styled(Link, {
  base: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    textDecoration: 'none'
  }
});

const PokemonSprite = styled('img', {
  base: {
    alignSelf: 'center'
  }
});

const PokemonId = styled('small', {
  base: {
    color: '#999',
    marginBottom: '4px'
  }
})

const PokemonName = styled('h3', {
  base: {
    textTransform: 'capitalize',
    color: '#333'
  }
})

export const PokemonCard = (props: PokemonElementProps) => {
  const { id, species: { name }, sprites: { front_default: sprite } } = props.pokemon as IPokemon;
  
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
      <LinkWrapper to={`/pokemon/${name}`}>
        <PokemonSprite src={sprite} alt={name} />
        <PokemonId className="number">#{String(id).padStart(3, '0')}</PokemonId>
        <PokemonName className="name">{normalizeName(name)}</PokemonName>
      </LinkWrapper>
    </PokemonCardContainer>
  )
}

export default PokemonCard;
