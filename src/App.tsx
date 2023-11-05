import { useCallback, useState } from 'react';
import { Routes, Route, useSearchParams } from 'react-router-dom';

import './App.css';

import PokemonList from './components/PokemonList.tsx';
import SearchForm from './components/SearchForm.tsx';
import Pokemon from './components/Pokemon.tsx';
import Pagination from './components/Pagination.tsx';

type OutputType = {
  img: string;
  title: string;
};
type pageInfType = {
  limit: string;
  offset: string;
};

const App = () => {
  const [pokemonInf, setPokemonInf] = useState<OutputType | null>(null);
  const createOutput = (pokemonInf: OutputType | null) => {
    setPokemonInf(pokemonInf);
  };
  const [pageParams] = useSearchParams();
  const offset = `${+(pageParams.get('page') || '') * 10 - 10}`;

  const [pageInf, setPageInf] = useState<pageInfType>({ limit: '10', offset });
  const changePage = useCallback((pageInf: pageInfType) => {
    setPageInf(pageInf);
  }, []);

  return (
    <>
      <div className="wrapper">
        <SearchForm create={createOutput} />
        <div className="output">
          <Pagination change={changePage} />
          <Routes>
            <Route
              path="/"
              element={
                pokemonInf ? (
                  <Pokemon img={pokemonInf.img} title={pokemonInf.title} />
                ) : (
                  <PokemonList limit={pageInf.limit} offset={pageInf.offset} />
                )
              }
            />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default App;
