import {
  AbsoluteFill,
  Img,
  staticFile,
  useCurrentFrame,
  interpolate,
  Easing,
} from "remotion";
import { z } from "zod";

// Props schema for safe input
export const template2Schema = z.object({
  text: z
    .string()
    .max(200, "Max 200 characters allowed")
    .default("Default Text"),
});

export type Template2Props = z.infer<typeof template2Schema>;

const Template2: React.FC<Template2Props> = ({ text }) => {
  const frame = useCurrentFrame();

  // Border animation (clockwise)
  const topWidth = interpolate(frame, [0, 45], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.ease,
  });
  const rightHeight = interpolate(frame, [45, 90], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.ease,
  });
  const bottomWidth = interpolate(frame, [90, 135], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.ease,
  });
  const leftHeight = interpolate(frame, [135, 180], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.ease,
  });

  // Text fade in after border is complete
  const textOpacity = interpolate(frame, [200, 230], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Truncate long text
  const safeText =
    text.length > 200 ? text.substring(0, 197).trim() + "..." : text;

  return (
    <AbsoluteFill className="bg-black flex items-center justify-center">
      <div className="relative size-1/2 flex flex-col items-center -translate-y-10">
        {/* Image */}
        <Img
          src={staticFile("assets/template1.jpeg")}
          className="w-full h-full object-cover"
        />

        {/* Borders */}
        {/* Top */}
        <div
          className="absolute top-0 left-0 h-2 bg-white/80"
          style={{ width: `${topWidth}%` }}
        />
        {/* Right */}
        <div
          className="absolute top-0 right-0 w-2 bg-white/80"
          style={{ height: `${rightHeight}%` }}
        />
        {/* Bottom */}
        <div
          className="absolute bottom-0 right-0 h-2 bg-white/80"
          style={{ width: `${bottomWidth}%` }}
        />
        {/* Left */}
        <div
          className="absolute bottom-0 left-0 w-2 bg-white/80"
          style={{ height: `${leftHeight}%` }}
        />

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
