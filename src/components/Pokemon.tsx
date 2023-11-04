const Pokemon = ({ ...props }) => {
  return (
    <div className="element">
      <img src={props.img} alt={props.title} />
      <h2>{props.title}</h2>
    </div>
  );
};

export default Pokemon;
