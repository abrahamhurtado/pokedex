import { FC, PropsWithChildren, useState } from 'react';
import { PokedexContext } from "./PokedexContext";

export const PokedexContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [pokemonMap, setPokedex] = useState({});

  return <PokedexContext.Provider value={{ pokemonMap, setPokedex }}>
    {children}
  </PokedexContext.Provider>
}
