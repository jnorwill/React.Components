import { useEffect, useState } from 'react';
type OutputType = {
  img: string;
  title: string;
};

type SearchProps = {
  create: (outputInf: OutputType | null) => void;
};

const SearchForm: React.FC<SearchProps> = ({ create }) => {
  const [searchValue, setSearchValue] = useState(localStorage.getItem('searchValue') || '');

  const searchResponse = async (value: string) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${value}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
    });

    const result = await response.json();

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
          className="input"
          type="text"
          value={searchValue}
          onChange={(event) => {
            const value = event?.target?.value || '';
            localStorage.setItem('searchValue', value);
            setSearchValue(value);
          }}
        />
        <input type="submit" />
      </form>
    </div>
  );
};
export default SearchForm;
