import InfiniteLoader from "react-window-infinite-loader";
import { FixedSizeGrid as Grid } from "react-window";
import { PokemonCard, CARD_HEIGHT, CARD_WIDTH } from '../PokemonCard/PokemonCard';
import styled from 'styled-components';
import { PokemonMap } from 'src/types/types';
import usePokedex from 'src/context/PokedexContext';
import { getPokemon } from "src/api/client";
import { produce } from "immer";
import { FC } from 'react'

interface PokedexProps {
  pokemonMap: PokemonMap
}

const VISIBLE_COLUMNS = 5;
const VISIBLE_ROWS = 3;
const GUTTER_SIZE = 16;
const TOTAL_NUMBER_OF_POKEMON = 1010;

const PokedexWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 120px);
`

export const Pokedex: FC<PokedexProps> = (props) => {
  const { setPokedex } = usePokedex();
  const { pokemonMap } = props;
  const isItemLoaded = (index: number) => {
    if (!pokemonMap[index]) {
      return false
    }
    return true;
  }
  return (
    <PokedexWrapper>
      <InfiniteLoader
        isItemLoaded={isItemLoaded}
        loadMoreItems={(startIndex, stopIndex) => { 
          const pagination = { limit: stopIndex - (startIndex - 1), offset: startIndex - 1 };

          const newPokemonMap: PokemonMap = {};

          getPokemon(pagination)
            .then((pokemonList) => {
              pokemonList.forEach((pokemon) => {
                const { id } = pokemon;
                newPokemonMap[id] = pokemon
              });
            })
            .finally(() => {
              setPokedex(produce(draft => Object.assign(draft, newPokemonMap)))
            })
        }}
        itemCount={1281}
      >
        {({ onItemsRendered, ref }) => (
          <Grid
            height={ (CARD_HEIGHT * VISIBLE_ROWS) + GUTTER_SIZE }
            width={ (CARD_WIDTH * VISIBLE_COLUMNS) + GUTTER_SIZE }
            rowHeight={176}
            columnWidth={156}
            columnCount={VISIBLE_COLUMNS}
            rowCount={TOTAL_NUMBER_OF_POKEMON / VISIBLE_COLUMNS}
            ref={ref}
            onItemsRendered={gridProps => {
              onItemsRendered({
                overscanStartIndex:
                  gridProps.overscanRowStartIndex * 5,
                overscanStopIndex: gridProps.overscanRowStopIndex * 5,
                visibleStartIndex: gridProps.visibleRowStartIndex * 5,
                visibleStopIndex: gridProps.visibleRowStopIndex * 5
              });
            }}
          >
            {({ columnIndex, rowIndex, style }) => {
              const pokemonIndex = (rowIndex * 5) + columnIndex + 1;

              const pokemon = pokemonMap[pokemonIndex];

              if (!pokemon) {
                return <div>Cargando</div>
              }

              return <PokemonCard pokemon={pokemon} style={style} />
            }}
          </Grid>
        )}
      </InfiniteLoader>
    </PokedexWrapper>
  )
}

export default Pokedex;
