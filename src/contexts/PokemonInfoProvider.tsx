import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import PokemonInfoContext from '../contexts/PokemonInfoContext';

type pageInfType = {
  limit: string;
  offset: string;
};

const PokemonInfoProvider = ({ children }: { children: React.ReactNode }) => {
  const [searchParams] = useSearchParams({});
  const offset = `${(+(searchParams.get('page') || '') * 10 || 10) - 10}`;
  const [pageInf, setPageInf] = useState<pageInfType>({ limit: '10', offset });

  return (
    <PokemonInfoContext.Provider
      value={{
        pageInf,
        setPageInf,
      }}
    >
      {children}
    </PokemonInfoContext.Provider>
  );
};

export default PokemonInfoProvider;
