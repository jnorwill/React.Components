import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import PokemonInfoContext from '../contexts/PokemonInfoContext';

type OutputType = {
  id: number;
  img: string;
  title: string;
};
type pageInfType = {
  limit: string;
  offset: string;
};

const PokemonInfoProvider = ({ children }: { children: React.ReactNode }) => {
  const [search, setSearch] = useState<boolean>(false);
  const [pokemonList, setPokemonList] = useState<OutputType[] | null>(null);

  const [searchParams] = useSearchParams({});
  const offset = `${(+(searchParams.get('page') || '') * 10 || 10) - 10}`;
  const [pageInf, setPageInf] = useState<pageInfType>({ limit: '10', offset });

  return (
    <PokemonInfoContext.Provider
      value={{
        search,
        setSearch,
        pokemonList,
        setPokemonList,
        pageInf,
        setPageInf,
      }}
    >
      {children}
    </PokemonInfoContext.Provider>
  );
};

export default PokemonInfoProvider;
