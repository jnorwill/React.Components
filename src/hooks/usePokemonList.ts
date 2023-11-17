import { useEffect, useContext } from 'react';
import { useSelector } from 'react-redux';

import PokemonInfoContext from '../contexts/PokemonInfoContext'
import type { StoreType } from './../store'

interface OutputType {
  id: number;
  img: string;
  title: string;
}
type PokemonListType = {
  name: string;
  url: string;
};
type ResponseListType = {
  results: PokemonListType[];
};
type ResponseType = {
  id: number;
  sprites: { front_default: string };
  name: string;
};

const usePokemonList = () => {
  const pageInfContext = useContext(PokemonInfoContext);
  const { limit, offset } = pageInfContext.pageInf || {}
  const pokemonInfoContext = useContext(PokemonInfoContext);
  const searchValue = useSelector((state: StoreType) => state.search.value);

  useEffect(() => {
    const fetchPokemonList = async () => {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
      });

      const resultList: ResponseListType = await response.json();
      const newOutput: OutputType[] = await Promise.all(
        resultList.results.map(async (item: PokemonListType) => {
          const response = await fetch(`${item.url}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json;charset=utf-8',
            },
          });

          const result: ResponseType = await response.json();
          return {
            id: result.id,
            img: result.sprites.front_default,
            title: result.name,
          };
        }),
      );

      if (pokemonInfoContext.setPokemonList) pokemonInfoContext.setPokemonList([...newOutput])

    };

    if (!searchValue.trim()) fetchPokemonList();

  }, [limit, offset, searchValue]);

};

export default usePokemonList;
