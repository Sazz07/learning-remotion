import {
  AbsoluteFill,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";

const Template1 = () => {
  const frame = useCurrentFrame();

  const box1X = interpolate(frame, [0, 30], [0, -350], {
    extrapolateRight: "clamp",
  });

  const boxWidth = 320;

  const lineWidth = interpolate(frame, [30, 60], [0, 350], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const box2Y = interpolate(frame, [60, 90], [550, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const box2Opacity = interpolate(frame, [60, 90], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const zoomIn = interpolate(frame, [100, 250], [1, 1.1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill className="bg-gray-800 flex items-center justify-center relative">
      <div
        className="flex items-center justify-center relative"
        style={{
          transform: `scale(${zoomIn})`,
        }}
      >
        {/* Box - 1 */}
        <div
          className="bg-white size-80 -rotate-2"
          style={{ transform: `translateX(${box1X}px)` }}
        >
          <Img
            src={staticFile("assets/template1.jpeg")}
            className="w-full p-3 pb-0 h-3/4 object-cover"
          />
        </div>

        {/* Dotted line */}
        <div
          className="border-t-4 border-dotted border-white absolute"
          style={{
            top: "50%",
            left: `calc(50% + ${box1X + boxWidth / 2}px)`,
            width: `${lineWidth}px`,
            transform: "translateY(-50%)",
          }}
        />

        {/* Box - 2 */}
        <div
          className="bg-white size-80 rotate-2 absolute"
          style={{
            transform: `translateX(${box1X + boxWidth / 2 + lineWidth + boxWidth / 2}px) translateY(${box2Y}px)`,
            opacity: box2Opacity,
          }}
        >
          <Img
            src={staticFile("assets/template1.jpeg")}
            className="w-full p-3 pb-0 h-3/4 object-cover"
          />
        </div>
      </div>
    </AbsoluteFill>
  );
};

export default Template1;
