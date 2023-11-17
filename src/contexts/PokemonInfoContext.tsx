import { createContext } from 'react';

type OutputType = {
  id: number;
  img: string;
  title: string;
};
type pageInfType = {
  limit: string;
  offset: string;
};

const PokemonInfoContext = createContext<{
  pokemonList: OutputType[] | null;
  setPokemonList: ((outputInf: OutputType[]) => void) | null;
  pageInf: pageInfType | null;
  setPageInf: ((outputInf: pageInfType) => void) | null;
}>({
  pokemonList: null,
  setPokemonList: null,
  pageInf: null,
  setPageInf: null,
});

export default PokemonInfoContext;
