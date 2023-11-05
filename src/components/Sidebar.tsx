import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

type OutputType = {
  title: string;
  habitat: string;
  happiness: number;
  capture: number;
  color: string;
  text: string;
};
type ResponseType = {
  sprites: { front_default: string };
  name: string;
  id: number;
  base_happiness: number;
  capture_rate: number;
  habitat: { name: string };
  color: { name: string };
  flavor_text_entries: { flavor_text: string }[];
};

const Sidebar = () => {
  const [searchParams, setSearchParams] = useSearchParams({});

  const [pokemonInf, setPokemonInf] = useState<OutputType | null>(null);
  const id = +(searchParams.get('details') || 0);
  useEffect(() => {
    const searchResponse: (id: number) => void = async (id: number) => {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
      });
      const result: ResponseType = await response.json();
      const inf: OutputType = {
        title: result.name,
        habitat: result.habitat.name,
        happiness: result.base_happiness,
        capture: result.capture_rate,
        color: result.color.name,
        text: result.flavor_text_entries[0].flavor_text,
      };
      setPokemonInf(inf);
    };
    if (id) {
      searchResponse(id);
    }
  }, [id]);

  if (!id) return null;
  const closeMore = () => {
    setSearchParams({ page: searchParams.get('page') || '' });
  };
  return (
    <>
      {pokemonInf ? (
        <div className="sidebar">
          <h2 className="sidebar__title">{pokemonInf.title}</h2>
          <p>{pokemonInf.text}</p>
          <p>Color: {pokemonInf.color}</p>
          <p>Base happiness: {pokemonInf.happiness}</p>
          <p>Capture rate: {pokemonInf.capture}</p>
          <p>Habitat: {pokemonInf.habitat}</p>
          <button className="sidebar__button" onClick={() => closeMore()}>
            Close
          </button>
        </div>
      ) : null}
    </>
  );
};

export default Sidebar;
