import { useState } from 'react';

import './App.css';

import PokemonList from './components/PokemonList.tsx';
import SearchForm from './components/SearchForm.tsx';
import Pokemon from './components/Pokemon.tsx';
type OutputType = {
  img: string;
  title: string;
};

const App = () => {
  const [pokemonInf, setPokemonInf] = useState<OutputType | null>(null);
  const createOutput = (pokemonInf: OutputType | null) => {
    setPokemonInf(pokemonInf);
  };

  return (
    <div className="wrapper">
      <SearchForm create={createOutput} />
      <div className="output">
        {pokemonInf ? <Pokemon img={pokemonInf.img} title={pokemonInf.title} /> : <PokemonList />}
      </div>
    </div>
  );
};

export default App;
