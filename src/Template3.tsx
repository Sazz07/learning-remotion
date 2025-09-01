import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

// const paragraphs = [
//   "This animation highlights specific text within paragraphs. You can use it to draw attention to important phrases or concepts.",
//   "The animation moves sequentially through all paragraphs, highlighting each marked phrase. You can customize text styling and effects via themes.",
//   "For best results, keep highlight phrases relatively short and ensure they exactly match text within the paragraph.",
// ];

const Template3 = () => {
  const frame = useCurrentFrame();

  const zoomIn = interpolate(frame, [0, 30], [0.8, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "white",
      }}
    >
      <div
        style={{ transform: `scale(${zoomIn})` }}
        className="flex flex-col  justify-center h-full p-20"
      >
        <p
          style={{
            fontSize: 28,
            color: "black",
            margin: "20px 0",
            fontFamily: "Arial, sans-serif",
          }}
        >
          This animation{" "}
          <span className="font-bold bg-yellow-300">
            highlights specific text within paragraphs.
          </span>{" "}
          You can use it to draw attention to important phrases or concepts.
        </p>

        <p
          style={{
            fontSize: 28,
            color: "black",
            margin: "20px 0",
            fontFamily: "Arial, sans-serif",
          }}
        >
          The animation moves{" "}
          <span className="font-bold bg-yellow-300">
            sequentially through all paragraphs,
          </span>{" "}
          highlighting each marked phrase. You can customize text styling and
          effects via themes.
        </p>

        <p
          style={{
            fontSize: 28,
            color: "black",
            margin: "20px 0",
            fontFamily: "Arial, sans-serif",
          }}
        >
          For best results, keep highlight phrases relatively short and ensure
          they{" "}
          <span className="font-bold bg-yellow-300">exactly match text</span>{" "}
          within the paragraph.
        </p>

        <p
          style={{
            fontSize: 28,
            color: "black",
            margin: "20px 0",
            fontFamily: "Arial, sans-serif",
          }}
        >
          Hello <span className="font-bold bg-yellow-300">world</span>{" "}
        </p>
      </div>
    </AbsoluteFill>
  );
};

export default Template3;
