import {
  AbsoluteFill,
  Img,
  staticFile,
  useCurrentFrame,
  interpolate,
  Easing,
} from "remotion";
import { z } from "zod";

export const template2Schema = z.object({
  text: z
    .string()
    .max(200, "Max 200 characters allowed")
    .default("Default Text"),
});

export type Template2Props = z.infer<typeof template2Schema>;

const Template2: React.FC<Template2Props> = ({ text }) => {
  const frame = useCurrentFrame();

  const progress = interpolate(frame, [0, 240], [0, 4], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.linear,
  });
  const textOpacity = interpolate(frame, [250, 280], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const safeText =
    text.length > 200 ? text.substring(0, 197).trim() + "..." : text;

  return (
    <AbsoluteFill className="bg-black flex items-center justify-center">
      <div className="relative size-1/2 flex flex-col items-center -translate-y-10">
        {/* Background image */}
        <Img
          src={staticFile("assets/template1.jpeg")}
          className="w-full h-full object-cover"
        />

        {/* Animated border */}
        <div className="absolute inset-0">
          {/* Top side */}
          <div
            className="absolute -top-1 left-0 h-2 bg-white/80 overflow-hidden"
            style={{
              width: `${Math.min(progress, 1) * 100}%`,
            }}
          />
          {/* Right side */}
          <div
            className="absolute top-0 right-0 w-2 bg-white/80 overflow-hidden"
            style={{
              height: `${Math.max(0, Math.min(progress - 1, 1)) * 100}%`,
            }}
          />
          {/* Bottom side */}
          <div
            className="absolute -bottom-1 right-0 h-2 bg-white/80 overflow-hidden"
            style={{
              width: `${Math.max(0, Math.min(progress - 2, 1)) * 100}%`,
            }}
          />
          {/* Left side */}
          <div
            className="absolute bottom-0 left-0 w-2 bg-white/80 overflow-hidden"
            style={{
              height: `${Math.max(0, Math.min(progress - 3, 1)) * 100}%`,
            }}
          />
        </div>

        {/* Text */}
        <h1
          className="text-white text-center text-4xl pt-6"
          style={{ opacity: textOpacity }}
        >
          {safeText}
        </h1>
      </div>
    </AbsoluteFill>
  );
};

export default Template2;
