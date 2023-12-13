const calculateColor = (value) => {
  const red = Math.min(255, Math.round((1 - value / 100) * 255));
  //230 for green, otherwise too light green
  const green = Math.min(230, Math.round((value / 100) * 255));
  return `rgb(${red},   ${green}, 0)`;
};

export default calculateColor;
