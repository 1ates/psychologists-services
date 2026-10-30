const Icon = ({ name, width = 24, height = 24, className }) => {
  return (
    <svg width={width} height={height} className={className} aria-hidden="true" focusable="false">
      <use href={`${import.meta.env.BASE_URL}sprite.svg#icon-${name}`} />
    </svg>
  );
};

export default Icon;
