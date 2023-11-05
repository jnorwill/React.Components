const Pokemon = ({ ...props }) => {
  return (
    <div className="pokemon">
      {props.img ? <img src={props.img} alt={props.title} /> : null}
      <h2 className="pokemon__name">{props.title}</h2>
    </div>
  );
};

export default Pokemon;
