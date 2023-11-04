import { useEffect, useState } from 'react';
import Pokemon from './Pokemon.tsx';
interface OutputType {
  img: string;
  title: string;
}
interface PokemonListType {
  name: string;
  url: string;
}

const PokemonList = () => {
  const [output, setOutput] = useState<OutputType[]>([]);

  useEffect(() => {
    const fetchPokemonList = async () => {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=20&offset=0`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
      });

      const resultList = await response.json();

      const newOutput: OutputType[] = await Promise.all(
        resultList.results.map(async (item: PokemonListType) => {
          const response = await fetch(`${item.url}`, {
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
        }),
      );

      setOutput([...output, ...newOutput]);
    };
    fetchPokemonList();
  }, []);

  return (
    <div>
      {output.map((item: OutputType) => {
        return <Pokemon key={item.img} img={item.img} title={item.title} />;
      })}
    </div>
  );
};

export default PokemonList;
