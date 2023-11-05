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

const PokemonList = ({ ...props }) => {
  const [output, setOutput] = useState<OutputType[]>([]);

  useEffect(() => {
    const fetchPokemonList = async () => {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${props.limit}&offset=${props.offset}`, {
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

      setOutput([...newOutput]);
    };
    fetchPokemonList();
  }, [props.limit, props.offset]);

  return (
    <div>
      {output.map((item: OutputType) => {
        return <Pokemon key={item.title} img={item.img} title={item.title} />;
      })}
    </div>
  );
};

export default PokemonList;
