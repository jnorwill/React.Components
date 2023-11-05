const Pokemon = ({ img, title }: { img: string; title: string }) => {
  return (
    <div className="pokemon">
      {img ? <img src={img} alt={title} /> : null}
      <h2 className="pokemon__name">{title}</h2>
    </div>
  );
};

export default Pokemon;
