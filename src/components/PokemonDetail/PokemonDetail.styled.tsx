import { styled } from "@styled-system/jsx";
import { FC, PropsWithChildren } from "react";
import { PokemonTypes } from '../../types/types';
import { token } from "@styled-system/tokens";

export const PokemonWrapper = styled('div',{
  base: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    padding: '16px'
  }
});

export const PokemonInformation = styled('div', {
  base: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    "&>*:not(:last-child)": {
      marginBottom: '8px'
    }
  }
})

export const Type: FC<PropsWithChildren<{ type: PokemonTypes }>> = ({ type, children }) => {
  return (
    <styled.li 
      style={{
        backgroundColor: token(`colors.${type}`)
      }}
      padding={'2px 4px'}
      borderRadius={'4px'}
      textTransform='capitalize'
      css={{
        '&:not(:last-child)': {
          marginRight: '4px'
        }
      }}
    >
      {children}
    </styled.li>
  )
}

export const TypesList = styled('ul', {
  base: {
    display: 'flex',
    flexDirection: 'row',
    listStyle: 'none'
  }
});
