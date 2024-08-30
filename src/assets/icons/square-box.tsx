export const SquareBox = (props) => {
  const { height, width, color } = props;
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} alignmentBaseline={'central'}>
      <rect width={width} height={height} rx="15" fill={color} />
    </svg>
  );
};
