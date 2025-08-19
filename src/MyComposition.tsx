import { AbsoluteFill, interpolate, Sequence, useCurrentFrame } from "remotion";

const Title: React.FC<{ title: string }> = ({ title }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <div style={{ opacity, textAlign: "center", fontSize: "7em" }}>{title}</div>
  );
};

export const MyVideo2 = () => {
  return (
    <AbsoluteFill>
      <Sequence durationInFrames={40} style={{ backgroundColor: "white" }}>
        <Title title="Hello" />
      </Sequence>
      <Sequence from={40} style={{ backgroundColor: "red" }}>
        <Title title="World" />
      </Sequence>
    </AbsoluteFill>
  );
};
