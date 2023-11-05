import { useEffect, useState } from 'react';
import Pokemon from './Pokemon.tsx';
interface OutputType {
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
  sprites: { front_default: string };
  name: string;
};

const PokemonList = ({ limit, offset }: { limit: string; offset: string }) => {
  const [output, setOutput] = useState<OutputType[]>([]);

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
            img: result.sprites.front_default,
            title: result.name,
          };
        }),
      );

      setOutput([...newOutput]);
    };
    fetchPokemonList();
  }, [limit, offset]);

  return (
    <div>
      {output.map((item: OutputType) => {
        return <Pokemon key={item.title} img={item.img} title={item.title} />;
      })}
    </div>
  );
};

export default PokemonList;
