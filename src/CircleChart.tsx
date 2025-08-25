import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { z } from "zod";

export const circlePercentageScheme = z.object({
  percentage: z.number().min(0).max(100),
});

const CircleChart: React.FC<z.infer<typeof circlePercentageScheme>> = ({
  percentage,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Fade-in
  const opacity = interpolate(frame, [0, 40], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Animate % from 0 → target
  const progress = interpolate(
    frame,
    [0, durationInFrames - 1],
    [0, percentage],
    { extrapolateRight: "clamp" },
  );

  // Convert percentage → degrees
  const angle = (progress / 100) * 360;

  const size = 300;
  const strokeWidth = 40;
  const redStrokeWidth = strokeWidth - 10; // thinner red ring

  return (
    <AbsoluteFill className="bg-gray-800 flex items-center justify-center">
      <div
        style={{
          position: "relative",
          width: size,
          height: size,
          borderRadius: "50%",
          opacity,
        }}
      >
        {/* Base ring (white background ring) */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            border: `${strokeWidth}px solid white`,
            boxSizing: "border-box",
          }}
        />

        {/* Progress ring (thinner red filling) */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            background: `conic-gradient(red ${angle}deg, transparent 0deg)`,
            mask: `radial-gradient(farthest-side, transparent calc(100% - ${redStrokeWidth}px), black 0)`,
            WebkitMask: `radial-gradient(farthest-side, transparent calc(100% - ${redStrokeWidth}px), black 0)`,
          }}
        />

        {/* Inner cutout to keep donut clean */}
        <div
          style={{
            position: "absolute",
            top: strokeWidth / 2,
            left: strokeWidth / 2,
            right: strokeWidth / 2,
            bottom: strokeWidth / 2,
            borderRadius: "50%",
            backgroundColor: "rgb(31 41 55)", // bg-gray-800
          }}
        />

        {/* Text in center */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontSize: 60,
            fontWeight: "bold",
            color: "white",
          }}
        >
          {Math.round(progress)}%
        </div>
      </div>
    </AbsoluteFill>
  );
};

export default CircleChart;
