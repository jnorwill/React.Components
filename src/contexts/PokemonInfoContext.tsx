import { createContext } from 'react';

type pageInfType = {
  limit: string;
  offset: string;
};

const PokemonInfoContext = createContext<{
  pageInf: pageInfType | null;
  setPageInf: ((outputInf: pageInfType) => void) | null;
}>({
  pageInf: null,
  setPageInf: null,
});

export default PokemonInfoContext;
