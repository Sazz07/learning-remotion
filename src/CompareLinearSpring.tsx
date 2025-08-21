import React from "react";
import {
  AbsoluteFill,
  spring,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const CompareLinearSpring: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Linear animation: depends directly on frame
  const linearX = interpolate(frame, [0, 60], [0, 500], {
    extrapolateRight: "clamp",
  });

  // Spring animation: frame -> spring physics -> driver (0 to 1)
  const driver = spring({
    frame,
    fps,
    config: {
      damping: 10, // resistance to bounce
      stiffness: 100, // "tightness" of spring
      mass: 1, // heaviness
    },
  });

  // Map spring driver (0→1) to pixels (0→500)
  const springX = interpolate(driver, [0, 1], [0, 500]);

  return (
    <AbsoluteFill className="bg-gray-900 flex flex-col items-center justify-center gap-20">
      {/* Linear Box */}
      <div
        style={{
          width: 100,
          height: 100,
          backgroundColor: "deepskyblue",
          transform: `translateX(${linearX}px)`,
        }}
      />
      <p className="text-white text-lg">Linear (frame-based)</p>

      {/* Spring Box */}
      <div
        style={{
          width: 100,
          height: 100,
          backgroundColor: "tomato",
          transform: `translateX(${springX}px)`,
        }}
      />
      <p className="text-white text-lg">Spring (physics-based)</p>
    </AbsoluteFill>
  );
};

export default CompareLinearSpring;
