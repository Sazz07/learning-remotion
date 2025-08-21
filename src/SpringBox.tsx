// File: SpringBox.tsx
import React from "react";
import {
  AbsoluteFill,
  spring,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export const SpringBox: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  /**
   * 1. Create a spring() driver
   * - By default spring() animates smoothly from 0 → 1
   * - frame & fps control the timing
   */
  const driver = spring({
    frame,
    fps,
    config: {
      damping: 200, // higher = less bounce
      stiffness: 100, // higher = faster spring
      mass: 1, // affects heaviness
    },
  });

  /**
   * 2. Interpolate spring output
   * - driver goes 0 → 1
   * - we map it to 0px → 200px for movement
   */
  const marginLeft = interpolate(driver, [0, 1], [0, 500]);

  return (
    <AbsoluteFill className="bg-gray-900 flex items-center justify-center">
      <div
        style={{
          width: 150,
          height: 150,
          backgroundColor: "tomato",
          marginLeft,
        }}
      />
    </AbsoluteFill>
  );
};
