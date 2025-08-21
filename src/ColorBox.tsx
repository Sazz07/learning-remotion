import { AbsoluteFill, interpolateColors, useCurrentFrame } from "remotion";

const ColorBox = () => {
  const frame = useCurrentFrame();

  //   const color = interpolateColors(frame, [0, 20], ["red", "yellow"]);

  const rgbColor1 = interpolateColors(
    frame,
    [0, 20],
    ["rgb(255, 0, 0)", "rgb(255, 255, 0)"],
  );

  //   const rgbColor2 = interpolateColors(
  //     frame,
  //     [0, 20],
  //     ["rgba(255, 0, 0, 1)", "rgba(255, 255, 0, 0)"],
  //   ); // rgba(255, 128, 0, 0.5)
  return <AbsoluteFill style={{ backgroundColor: rgbColor1 }} />;
};

export default ColorBox;
