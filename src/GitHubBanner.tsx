import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  Img,
  staticFile,
} from "remotion";

export const GitHubBanner: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const nameStart = 0;
  const stackStart = fps * 2;
  const taglineStart = fps * 5;

  const fadeIn = (start: number, duration: number = fps) =>
    interpolate(frame, [start, start + duration], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #0f172a, #1e293b)",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          fontSize: 60,
          fontWeight: "bold",
          opacity: fadeIn(nameStart),
        }}
      >
        MD. SAZZAD HOSSAIN
      </div>

      <div
        style={{
          fontSize: 28,
          marginTop: 10,
          color: "#93c5fd",
          opacity: fadeIn(nameStart + fps / 2),
        }}
      >
        Full Stack Developer
      </div>

      <div
        style={{
          display: "flex",
          gap: 40,
          marginTop: 50,
          opacity: fadeIn(stackStart),
        }}
      >
        <Img src={staticFile("assets/js.png")} style={{ height: 60 }} />
        <Img src={staticFile("assets/react.png")} style={{ height: 60 }} />
        <Img src={staticFile("assets/next.png")} style={{ height: 60 }} />
        <Img src={staticFile("assets/ts.svg")} style={{ height: 60 }} />
        <Img src={staticFile("assets/tailwind.svg")} style={{ height: 60 }} />
        <Img src={staticFile("assets/prisma.svg")} style={{ height: 60 }} />
        <Img src={staticFile("assets/postgres.svg")} style={{ height: 60 }} />
      </div>

      <div
        style={{
          marginTop: 60,
          fontSize: 24,
          opacity: fadeIn(taglineStart),
        }}
      >
        Building smart, scalable, and elegant web solutions
      </div>
    </AbsoluteFill>
  );
};
