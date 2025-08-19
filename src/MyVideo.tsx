import { spring, useCurrentFrame, useVideoConfig } from "remotion";

const MyVideo = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({
    frame,
    fps,
    // config: {
    //   damping: 200,
    //   stiffness: 1000,
    // },
  });

  return (
    <div
      style={{
        flex: 1,
        textAlign: "center",
        fontSize: "7em",
        backgroundColor: "white",
      }}
    >
      <div style={{ transform: `scale(${scale})` }}>Hello World!</div>
    </div>
  );
};

export default MyVideo;
