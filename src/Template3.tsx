import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { z } from "zod";

export const templateSchema = z.object({
  paragraphs: z.array(z.string().min(1, "Paragraph cannot be empty")),
  highlights: z.array(z.string()),
  highlightColor: z
    .string()
    .default("#fde047")
    .refine(
      (val) =>
        /^#([0-9A-F]{3}){1,2}$/i.test(val) ||
        val.startsWith("rgb") ||
        val.startsWith("hsl") ||
        val.startsWith("--"),
      {
        message: "Must be a valid CSS color",
      },
    ),
});

type TemplateProps = z.infer<typeof templateSchema>;

export const Template3: React.FC<TemplateProps> = ({
  paragraphs,
  highlights,
  highlightColor,
}) => {
  const frame = useCurrentFrame();

  // Zoom-in animation
  const zoomIn = interpolate(frame, [0, 30], [0.8, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Animated vignette (GPU-safe)
  const shadowControl = interpolate(frame, [0, 30], [60, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  if (!paragraphs || paragraphs.length === 0) {
    return (
      <AbsoluteFill className="flex items-center justify-center bg-white">
        <p
          style={{
            fontSize: 28,
            fontFamily: "Arial, sans-serif",
            color: "black",
          }}
        >
          No content available
        </p>
      </AbsoluteFill>
    );
  }

  return (
    <AbsoluteFill style={{ backgroundColor: "white", position: "relative" }}>
      {/* vignette effect */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(circle, rgba(0,0,0,0) ${shadowControl}%, rgba(0,0,0,0.5) 100%)`,
          pointerEvents: "none",
        }}
      />

      <div
        style={{ transform: `scale(${zoomIn})` }}
        className="flex flex-col justify-center h-full p-20"
      >
        {paragraphs.map((para, i) => {
          const highlight = highlights[i] || "";

          const startFrame = 0 + i * 30;
          const endFrame = startFrame + 30;

          const progress = interpolate(frame, [startFrame, endFrame], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });

          if (!highlight || !para.includes(highlight)) {
            return (
              <p
                key={i}
                style={{
                  fontSize: 24,
                  color: "black",
                  margin: "20px 0",
                  fontFamily: "Arial, sans-serif",
                }}
              >
                {para}
              </p>
            );
          }

          const [before, after] = para.split(highlight);

          return (
            <p
              key={i}
              style={{
                fontSize: 24,
                color: "black",
                margin: "20px 0",
                fontFamily: "Arial, sans-serif",
              }}
            >
              {before}
              <span
                style={{
                  position: "relative",
                  display: "inline-block",
                  padding: "0 4px",
                  borderRadius: 4,
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    inset: 0,
                    backgroundColor: highlightColor || "#fde047",
                    transformOrigin: "left",
                    transform: `scaleX(${progress})`,
                    borderRadius: 4,
                    zIndex: 0,
                  }}
                />

                <strong
                  style={{ position: "relative", zIndex: 1, fontWeight: 600 }}
                >
                  {highlight}
                </strong>
              </span>
              {after}
            </p>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
