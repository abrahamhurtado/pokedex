import { IPokemon } from 'pokeapi-typescript'
import InfiniteLoader from "react-window-infinite-loader";
import { FixedSizeGrid as Grid } from "react-window";
import { PokemonCard, CARD_HEIGHT, CARD_WIDTH } from '../PokemonCard/PokemonCard';
import styled from 'styled-components';

interface PokedexProps {
  pokemonList: IPokemon[]
}

const PokedexWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 120px);
`

export function Pokedex (props: PokedexProps) {
  const isItemLoaded = (index: number) => {
    console.log({ index });
    return false;
    
  }
  const { pokemonList } = props;
  return (
    <PokedexWrapper>
      <InfiniteLoader
        isItemLoaded={isItemLoaded}
        loadMoreItems={(startIndex, stopIndex) => { console.log(startIndex, stopIndex) }}
        itemCount={pokemonList.length}
      >
        {({ onItemsRendered, ref }) => (
          <Grid
            height={ CARD_HEIGHT * 3 }
            width={ CARD_WIDTH * 5 }
            rowHeight={176}
            columnWidth={156}
            columnCount={5}
            rowCount={4}
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

              const pokemon = pokemonList.find(({id}) => id === pokemonIndex) as IPokemon;

              return <PokemonCard pokemon={pokemon} style={style} />
            }}
          </Grid>
        )}
      </InfiniteLoader>
    </PokedexWrapper>
  )
}

export default Pokedex;
