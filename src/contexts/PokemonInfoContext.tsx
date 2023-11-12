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
  search: boolean;
  setSearch: ((search: boolean) => void) | null;
  pokemonList: OutputType[] | null;
  setPokemonList: ((outputInf: OutputType[]) => void) | null;
  pageInf: pageInfType | null;
  setPageInf: ((outputInf: pageInfType) => void) | null;
}>({
  setSearch: null,
  search: false,
  pokemonList: null,
  setPokemonList: null,
  pageInf: null,
  setPageInf: null,
});

export default PokemonInfoContext;
