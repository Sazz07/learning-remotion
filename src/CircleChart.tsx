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
  const { width, height, durationInFrames } = useVideoConfig();

  const opacity = interpolate(frame, [0, 40], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const progress = interpolate(
    frame,
    [0, durationInFrames - 1],
    [0, percentage],
    {
      extrapolateRight: "clamp",
    },
  );

  const radius = 150;
  const strokeWidth = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <AbsoluteFill className="bg-gray-800 flex items-center justify-center">
      <svg width={width} height={height - 300} viewBox="0 0 400 400">
        <g opacity={opacity} transform="translate(20, 20)">
          <circle
            cx="200"
            cy="200"
            r={radius}
            stroke="white"
            strokeWidth={strokeWidth}
            fill="none"
          />

          <circle
            cx="200"
            cy="200"
            r={radius}
            stroke="red"
            strokeWidth={strokeWidth - 10}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            transform="rotate(-90 200 200)"
          />

          <text
            x="210"
            y="220"
            textAnchor="middle"
            fontSize="60"
            fontWeight="bold"
            fill="white"
          >
            {Math.round(progress)}%
          </text>
        </g>
      </svg>
    </AbsoluteFill>
  );
};

export default CircleChart;
