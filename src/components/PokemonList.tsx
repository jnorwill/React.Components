import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { StoreType } from './../store';

import Pokemon from './Pokemon.tsx';

import usePokemonList from '../hooks/usePokemonList';

interface OutputType {
  id: number;
  img: string;
  title: string;
}

const PokemonList = () => {
  const pakemonList = useSelector((state: StoreType) => state.pokemonList);
  usePokemonList();

  const [searchParams, setSearchParams] = useSearchParams({});
  const closeMore = () => {
    if (searchParams.get('details')) {
      setSearchParams({ page: searchParams.get('page') || '1' });
    }
  };

  return (
    <div className="pokemon__list" onClick={() => closeMore()}>
      {pakemonList.value.map((item: OutputType) => {
        return <Pokemon key={item.id} id={item.id} img={item.img} title={item.title} />;
      })}
    </div>
  );
};

export default PokemonList;
