// File: SpringText.tsx
import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

const SpringText: React.FC = () => {
  const frame = useCurrentFrame();

  /**
   * Explanation:
   * We want a spring/bounce effect for scale.
   * 1. The "input range" is frames [0, 15, 30, 45, 60].
   * 2. The "output range" is the scale value [0, 1.2, 0.9, 1.05, 1].
   * 3. The element scales up and down quickly, simulating a spring.
   */
  const scale = interpolate(
    frame,
    [0, 15, 30, 45, 60],
    [0, 1.2, 0.9, 1.05, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  // Optional: also fade in while springing
  const opacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
  });

  return (
    <AbsoluteFill className="bg-gray-900 flex items-center justify-center">
      <h1
        style={{
          opacity,
          transform: `scale(${scale})`,
        }}
        className="text-white text-5xl font-bold"
      >
        Md. Sazzad Hossain
      </h1>
    </AbsoluteFill>
  );
};

export default SpringText;
