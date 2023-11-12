import React, { useContext } from 'react';
import { useSearchParams } from 'react-router-dom';

import Pokemon from './Pokemon.tsx';

import PokemonInfoContext from '../contexts/PokemonInfoContext';
import usePokemonList from '../hooks/usePokemonList';

interface OutputType {
  id: number;
  img: string;
  title: string;
}

const PokemonList = () => {
  const pageInfContext = useContext(PokemonInfoContext);
  usePokemonList();

  const [searchParams, setSearchParams] = useSearchParams({});
  const closeMore = () => {
    if (searchParams.get('details')) {
      setSearchParams({ page: searchParams.get('page') || '1' });
    }
  };

  return (
    <div className="pokemon__list" onClick={() => closeMore()}>
      {pageInfContext.pokemonList?.map((item: OutputType) => {
        return <Pokemon key={item.id} id={item.id} img={item.img} title={item.title} />;
      })}
    </div>
  );
};

export default PokemonList;
