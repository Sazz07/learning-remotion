import {
  AbsoluteFill,
  Img,
  staticFile,
  useCurrentFrame,
  interpolate,
  Easing,
} from "remotion";
import { z } from "zod";
import { loadFont as loadRoboto } from "@remotion/google-fonts/Roboto";
import { loadFont as loadMontserrat } from "@remotion/google-fonts/Montserrat";
import { loadFont as loadLobster } from "@remotion/google-fonts/Lobster";
import { loadFont as loadOswald } from "@remotion/google-fonts/Oswald";

// Load fonts
const { fontFamily: roboto } = loadRoboto();
const { fontFamily: montserrat } = loadMontserrat();
const { fontFamily: lobster } = loadLobster();
const { fontFamily: oswald } = loadOswald();

export const template2Schema = z.object({
  text: z
    .string()
    .max(200, "Max 200 characters allowed")
    .default("Default Text"),
  theme: z.enum(["theme1", "theme2", "theme3", "theme4"]).default("theme1"),
});

export type Template2Props = z.infer<typeof template2Schema>;

// Solid visible themes
const themes = {
  theme1: {
    bg: "black",
    textColor: "white",
    font: roboto,
    borderColor: "#FFFFFF",
  },
  theme2: {
    bg: "white",
    textColor: "black",
    font: montserrat,
    borderColor: "#000000",
  },
  theme3: {
    bg: "linear-gradient(135deg, #1e3a8a, #4f46e5, #9333ea)",
    textColor: "#FFD700",
    font: lobster,
    borderColor: "#FFD700",
  },
  theme4: {
    bg: "#f3f4f6",
    textColor: "#DC2626",
    font: oswald,
    borderColor: "#FF0000",
  },
};

const Template2: React.FC<Template2Props> = ({ text, theme }) => {
  const frame = useCurrentFrame();

  // Animations
  const startOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const progress = interpolate(frame, [20, 240], [0, 4], {
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

  const currentTheme = themes[theme];

  return (
    <AbsoluteFill
      style={{
        background: currentTheme.bg,
      }}
      className="flex items-center justify-center"
    >
      <div
        className="relative size-1/2 flex flex-col items-center -translate-y-10"
        style={{ opacity: startOpacity }}
      >
        <Img
          src={staticFile("assets/template1.jpeg")}
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0">
          {/* Top */}
          <div
            className="absolute top-0 left-0 h-2"
            style={{
              background: currentTheme.borderColor,
              width: `calc(${Math.min(progress, 1) * 100}% - 2px)`,
            }}
          />
          {/* Right */}
          <div
            className="absolute top-0 right-0 w-2"
            style={{
              background: currentTheme.borderColor,
              height: `calc(${Math.max(0, Math.min(progress - 1, 1)) * 100}% - 2px)`,
            }}
          />
          {/* Bottom */}
          <div
            className="absolute bottom-0 right-0 h-2"
            style={{
              background: currentTheme.borderColor,
              width: `calc(${Math.max(0, Math.min(progress - 2, 1)) * 100}% - 2px)`,
            }}
          />
          {/* Left */}
          <div
            className="absolute bottom-0 left-0 w-2"
            style={{
              background: currentTheme.borderColor,
              height: `calc(${Math.max(0, Math.min(progress - 3, 1)) * 100}% - 2px)`,
            }}
          />
        </div>

        <h1
          className="text-center text-4xl pt-6"
          style={{
            opacity: textOpacity,
            color: currentTheme.textColor,
            fontFamily: currentTheme.font,
            wordBreak: "break-word",
          }}
        >
          {safeText}
        </h1>
      </div>
    </AbsoluteFill>
  );
};

export default Template2;
