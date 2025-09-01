import {
  AbsoluteFill,
  Img,
  staticFile,
  useCurrentFrame,
  interpolate,
  Easing,
} from "remotion";
import { z } from "zod";

// Schema for props
export const practice3Schema = z.object({
  leftImage: z.string().default("assets/practice1.jpeg"),
  rightImage: z.string().default("assets/practice1.jpeg"),
  text: z.string().default("Split Screen Practice"),
});

export type Practice3Props = z.infer<typeof practice3Schema>;

const Practice3: React.FC<Practice3Props> = ({
  leftImage,
  rightImage,
  text,
}) => {
  const frame = useCurrentFrame();

  // Animations
  const leftX = interpolate(frame, [0, 30], [-500, 0], {
    extrapolateRight: "clamp",
    easing: Easing.ease,
  });

  const rightX = interpolate(frame, [0, 30], [500, 0], {
    extrapolateRight: "clamp",
    easing: Easing.ease,
  });

  const textOpacity = interpolate(frame, [40, 70], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill className="flex">
      {/* Left Image */}
      <div
        className="w-1/2 h-full overflow-hidden"
        style={{ transform: `translateX(${leftX}px)` }}
      >
        <Img
          src={staticFile(leftImage)}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Image */}
      <div
        className="w-1/2 h-full overflow-hidden"
        style={{ transform: `translateX(${rightX}px)` }}
      >
        <Img
          src={staticFile(rightImage)}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Center Text Overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <h1
          className="text-5xl font-bold px-6 py-4 rounded-xl"
          style={{
            background: "rgba(0,0,0,0.6)",
            color: "white",
            opacity: textOpacity,
          }}
        >
          {text}
        </h1>
      </div>
    </AbsoluteFill>
  );
};

export default Practice3;
