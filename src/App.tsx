import { Routes, Route } from 'react-router-dom';

import './App.css';

import PokemonList from './components/PokemonList.tsx';
import SearchForm from './components/SearchForm.tsx';
import Pagination from './components/Pagination.tsx';
import Sidebar from './components/Sidebar.tsx';
import PokemonInfoProvider from './contexts/PokemonInfoProvider.tsx';

const App = () => {
  return (
    <>
      <PokemonInfoProvider>
        <div className="wrapper">
          <SearchForm />
          <div className="output">
            <Pagination />
            <Routes>
              <Route
                path="/"
                element={
                  <div className="main">
                    <PokemonList />
                    <Sidebar />
                  </div>
                }
              />
            </Routes>
          </div>
        </div>
      </PokemonInfoProvider>
    </>
  );
};

export default App;
