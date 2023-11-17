import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { saveSearchValue } from './../store/searchSlice';
import { savePokemonList } from './../store/pokemonListSlice';
import type { StoreType } from './../store';

type ResponseType = {
  id: number;
  sprites: { front_default: string };
  name: string;
};

const SearchForm = () => {
  const searchValue = useSelector((state: StoreType) => state.search.value);
  const dispatch = useDispatch();

  async function searchResponse(value: string) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${value}`, {
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
  }

  const search = async (searchValue: string) => {
    let pokemonInf;
    if (searchValue) {
      pokemonInf = await searchResponse(searchValue);
    } else pokemonInf = null;

    dispatch(saveSearchValue(searchValue));
    if (pokemonInf) dispatch(savePokemonList([pokemonInf]));
  };
  useEffect(() => {
    search(searchValue);
  }, []);

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await search(searchValue);
  };
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event?.target?.value || '';
    value = value.toLocaleLowerCase();
    localStorage.setItem('searchValue', value);
    dispatch(saveSearchValue(value));
  };

  return (
    <div className="search">
      <form className="form" onSubmit={submit}>
        <input
          value={searchValue}
          className="search__input"
          type="text"
          placeholder="find the pokemon"
          onChange={(e) => onChange(e)}
        />
        <input className="search__submit" type="submit" value="Search" />
      </form>
    </div>
  );
};
export default SearchForm;
