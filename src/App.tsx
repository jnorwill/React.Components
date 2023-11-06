import { useCallback, useState } from 'react';
import { Routes, Route, useSearchParams } from 'react-router-dom';

import './App.css';

import PokemonList from './components/PokemonList.tsx';
import SearchForm from './components/SearchForm.tsx';
import Pokemon from './components/Pokemon.tsx';
import Pagination from './components/Pagination.tsx';
import Sidebar from './components/Sidebar.tsx';

type OutputType = {
  id: number;
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

  const [searchParams, setSearchParams] = useSearchParams({});
  const offset = `${(+(searchParams.get('page') || '') * 10 || 10) - 10}`;

  const [pageInf, setPageInf] = useState<pageInfType>({ limit: '10', offset });
  const changePage = useCallback((pageInf: pageInfType) => {
    setPageInf(pageInf);
  }, []);

  const closeMore = () => {
    if (searchParams.get('details')) {
      setSearchParams({ page: searchParams.get('page') || '1' });
    }
  };

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
                <div className="main">
                  <div onClick={() => closeMore()}>
                    {pokemonInf ? (
                      <Pokemon id={pokemonInf.id} img={pokemonInf.img} title={pokemonInf.title} />
                    ) : (
                      <PokemonList limit={pageInf.limit} offset={pageInf.offset} />
                    )}
                  </div>
                  <Sidebar />
                </div>
              }
            />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default App;
