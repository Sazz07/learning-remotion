import {
  AbsoluteFill,
  spring,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
} from "remotion";
import { z } from "zod";

// ------------------ Schema ------------------
export const TemplateFourSchema = z.object({
  title: z.string().min(1, "Title is required"),
  items: z.array(z.string().min(1)).min(1, "At least one item is required"),
  colors: z.object({
    background: z.string().default("#000000"),
    text: z.string().default("#ffffff"),
    highlight: z.string().default("#ec4899"),
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

// ------------------ Component ------------------
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

  // Divider grow (left-to-right, like loading bar)
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
    to: 1,
    config: { mass: 1, damping: 200 },
    durationInFrames: 30,
  });

  return (
    <AbsoluteFill
      style={{ backgroundColor: colors.background }}
      className="flex flex-col items-center justify-center"
    >
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
          <div className="relative w-[20rem]">
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
              className="relative flex items-center text-2xl font-bold"
            >
              <div
                style={{
                  clipPath: `inset(0 0 0 ${highlightRemove}%)`,
                  backgroundColor: colors.highlight,
                }}
                className="absolute left-10 right-1 h-6 rounded-md z-10"
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
