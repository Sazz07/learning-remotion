import {
  AbsoluteFill,
  spring,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
} from "remotion";
import { z } from "zod";
import { BrushStroke } from "./components/BrushStroke";

export const TemplateFourSchema = z.object({
  title: z.string().min(1, "Title is required"),
  items: z.array(z.string().min(1)).min(1, "At least one item is required"),
  colors: z.object({
    background: z.string().default("#0C0C0C"),
    text: z.string().default("#ffffff"),
    highlight: z.string().default("#FA0053"),
    divider: z.string().default("#ffffff"),
  }),
  timings: z.object({
    titleDelay: z.number().default(0),
    dividerDelay: z.number().default(10),
    zoomDelay: z.number().default(30),
    itemRevealDelay: z.number().default(60),
    itemStagger: z.number().default(15),
    highlightStart: z.number().default(120),
    highlightDuration: z.number().default(20),
  }),
});

export type TemplateFourProps = z.infer<typeof TemplateFourSchema>;

const TemplateFour: React.FC<TemplateFourProps> = (props) => {
  const { title, items, colors, timings } = TemplateFourSchema.parse(props);

  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title slide-in
  const titleY = spring({
    frame: frame - timings.titleDelay,
    fps,
    from: -100,
    to: 0,
    config: { mass: 1, damping: 200 },
    durationInFrames: 30,
  });

  // Divider grow
  const lineProgress = spring({
    frame: frame - timings.dividerDelay,
    fps,
    from: 0,
    to: 1,
    config: { mass: 1, damping: 200 },
    durationInFrames: 30,
  });

  // Zoom-in
  const zoomIn = spring({
    frame: frame - timings.zoomDelay,
    fps,
    from: 0.8,
    to: 1.2,
    config: { mass: 1, damping: 200 },
    durationInFrames: 30,
  });

  return (
    <AbsoluteFill
      style={{ backgroundColor: colors.background }}
      className="flex flex-col items-center justify-center"
    >
      {/* vignette effects */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(circle at center, rgba(0,0,0,0) 55%, rgba(0,0,0,0.2) 75%, rgba(0,0,0,0.4) 100%)`,
          pointerEvents: "none",
          zIndex: 10,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(45deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0) 20%, rgba(0,0,0,0) 80%, rgba(0,0,0,0.2) 100%)`,
          pointerEvents: "none",
          zIndex: 10,
        }}
      />
      {/* Title + Divider */}
      <div
        style={{ transform: `scale(${zoomIn})` }}
        className="flex flex-col items-center"
      >
        <h1
          style={{
            transform: `translateY(${titleY}px)`,
            color: colors.text,
          }}
          className="text-5xl font-extrabold mb-6"
        >
          {title}
        </h1>

        {/* Divider animation */}
        <div className="mb-8 flex justify-center w-full">
          <div className="relative w-[25rem]">
            <div
              style={{
                width: `${lineProgress * 100}%`,
                backgroundColor: colors.divider,
                height: "4px",
              }}
            />
          </div>
        </div>
      </div>

      {/* Animated List */}
      <div className="w-1/3 flex flex-col justify-center gap-6">
        {items.map((item, i) => {
          // Reveal animation
          const reveal = spring({
            frame: frame - timings.itemRevealDelay - i * timings.itemStagger,
            fps,
            from: 0,
            to: 1,
            config: { mass: 1, damping: 200 },
            durationInFrames: 20,
          });

          // Highlight wipe
          const highlightRemove = interpolate(
            frame,
            [
              timings.highlightStart + i * timings.highlightDuration,
              timings.highlightStart + (i + 1) * timings.highlightDuration,
            ],
            [0, 100],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
          );

          return (
            <div
              key={i}
              style={{
                opacity: reveal,
                color: colors.text,
              }}
              className="relative flex items-center text-3xl"
            >
              <BrushStroke
                color={colors.highlight}
                widthPercent={100 - highlightRemove}
                id={`brush-${i}`}
                style={{
                  left: "10px",
                  width: "calc(100% - 10px)",
                  top: "0px",
                  height: "40px",
                }}
              />

              {/* Text */}
              <span className="mr-2">{i + 1}.</span>
              <span>{item}</span>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

export default TemplateFour;
