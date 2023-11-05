import { useEffect, useState } from 'react';
type OutputType = {
  img: string;
  title: string;
};
type ResponseType = {
  sprites: { front_default: string };
  name: string;
};
type SearchProps = {
  create: (outputInf: OutputType | null) => void;
};

const SearchForm: React.FC<SearchProps> = ({ create }) => {
  const [searchValue, setSearchValue] = useState('');

  const searchResponse: (value: string) => Promise<OutputType> = async (value: string) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${value}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
    });
    const result: ResponseType = await response.json();
    return {
      img: result.sprites.front_default,
      title: result.name,
    };
  };

  const search = async (searchValue: string) => {
    let pokemonInf;
    if (searchValue) {
      pokemonInf = await searchResponse(searchValue);
    } else pokemonInf = null;
    create(pokemonInf);
  };

  useEffect(() => {
    search(searchValue);
  }, []);

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await search(searchValue);
  };

  return (
    <div className="search">
      <form className="form" onSubmit={submit}>
        <input
          className="search__input"
          type="text"
          placeholder="find the pokemon"
          onChange={(event) => {
            let value = event?.target?.value || '';
            value = value.toLocaleLowerCase();
            setSearchValue(value);
          }}
        />
        <input className="search__submit" type="submit" value="Search" />
      </form>
    </div>
  );
};
export default SearchForm;
