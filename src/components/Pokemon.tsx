import React from 'react';
import { useSearchParams } from 'react-router-dom';

const Pokemon = ({ id, img, title }: { id: number; img: string; title: string }) => {
  const [searchParams, setSearchParams] = useSearchParams({});
  const openMore = () => {
    setSearchParams({ page: searchParams.get('page') || '1', details: `${id}` });
  };
  return (
    <div className="pokemon" data-testid="pokemon-card">
      {img ? <img src={img} alt={title} /> : null}
      <h2 className="pokemon__name">{title}</h2>
      <button className="pokemon__button" onClick={() => openMore()}>
        Open More
      </button>
    </div>
  );
};

export default Pokemon;
