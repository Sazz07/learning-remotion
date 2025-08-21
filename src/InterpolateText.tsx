import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const InterpolateText = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  //   Fade-in effect
  const opacity = interpolate(frame, [0, durationInFrames - 30], [0, 1]);

  //   Fade in and out

  //   const opacity1 = interpolate(
  //     frame,
  //     [0, 30, durationInFrames - 30, durationInFrames],
  //     [0, 1, 1, 0],
  //   );

  return (
    <AbsoluteFill className="bg-gray-800 flex items-center justify-center">
      {/* <h1 style={{ opacity: opacity }} className={`text-white text-4xl`}>
        Md. Sazzad Hossain
      </h1> */}
      <h1 style={{ opacity: opacity }} className={`text-white text-4xl`}>
        Md. Sazzad Hossain
      </h1>
    </AbsoluteFill>
  );
};

export default InterpolateText;
