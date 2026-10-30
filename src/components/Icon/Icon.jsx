import sprite from "../../assets/sprite.svg";

const Icon = ({ name, width = 24, height = 24, className }) => {
  return (
    <svg width={width} height={height} className={className} aria-hidden="true" focusable="false">
      <use href={`${sprite}#icon-${name}`} />
    </svg>
  );
};

export default Icon;
