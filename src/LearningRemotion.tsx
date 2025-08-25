import {
  AbsoluteFill,
  Series,
  spring,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Easing,
  random,
  interpolateColors,
} from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { slide } from "@remotion/transitions/slide";
import { fade } from "@remotion/transitions/fade";

// ============================================
//  Basic Component
// ============================================
const BasicText: React.FC<{ text: string }> = ({ text }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Spring animation - smoothly animate a value
  const scale = spring({
    frame,
    fps,
    config: {
      damping: 10, // how fast oscillation reduces
      mass: 0.5, // heaviness of animation
      stiffness: 100, // কত টাইট/শক্ত - spring stiffness
    },
  });

  // Interpolation - smooth transition between values
  const opacity = interpolate(
    frame,
    [0, 30], //input range
    [0, 1], // output range
    {
      easing: Easing.bezier(0.25, 0.1, 0.25, 1), // বেজিয়ার কার্ভ
      extrapolateRight: "clamp", // শেষের ভ্যালু ধরে রাখা
    },
  );

  // Color interpolation
  const color = interpolateColors(
    frame % 90, // মডুলাস ব্যবহার করে লুপ করা
    [0, 45, 90],
    ["#ff0000", "#00ff00", "#ff0000"],
  );

  return (
    <div
      style={{
        fontSize: 100,
        fontWeight: "bold",
        transform: `scale(${scale})`,
        opacity,
        color,
      }}
    >
      {text}
    </div>
  );
};

// ============================================
// Animated Card
// ============================================
const AnimatedCard: React.FC<{
  title: string;
  delay?: number;
}> = ({ title, delay = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Animation in Y axis
  const y = interpolate(frame - delay, [0, 30], [50, 0], {
    extrapolateRight: "clamp",
  });

  // Rotation animation
  const rotation = spring({
    frame: frame - delay,
    fps,
    config: { damping: 15 },
  });

  return (
    <div
      style={{
        background: "white",
        padding: 20,
        borderRadius: 10,
        boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
        transform: `translateY(${y}px) rotate(${rotation * 360}deg)`,
        opacity: interpolate(frame - delay, [0, 15], [0, 1]),
      }}
    >
      <h2>{title}</h2>
    </div>
  );
};

// ============================================
// Particle System
// ============================================
const Particle: React.FC<{
  index: number;
  total: number;
}> = ({ index, total }) => {
  const frame = useCurrentFrame();

  //  Random position
  const randomX = random(index * 1000) * 1000 - 500;
  const randomY = random(index * 2000) * 1000 - 500;

  // Particle movement
  const progress = ((frame + index * 10) % 60) / 60;
  const scale = interpolate(progress, [0, 1], [0, 1], {
    easing: Easing.cubic,
  });

  return (
    <div
      style={{
        width: 10,
        height: 10,
        borderRadius: "50%",
        background: `hsl(${(index / total) * 360}, 70%, 60%)`,
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: `translate(
          ${randomX * progress}px,
          ${randomY * progress}px
        ) scale(${scale})`,
      }}
    />
  );
};

const ParticleSystem: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      {new Array(50).fill(0).map((_, i) => (
        <Particle key={i} index={i} total={50} />
      ))}
    </AbsoluteFill>
  );
};

// ============================================
// Master Composition
// ============================================
export const LearningRemotionBangla: React.FC = () => {
  const { fps } = useVideoConfig();

  //  Time calculation
  const toFrames = (seconds: number) => seconds * fps;

  return (
    <AbsoluteFill style={{ background: "#1a1a1a" }}>
      <Series>
        {/* First Scene */}
        <Series.Sequence durationInFrames={toFrames(3)}>
          <AbsoluteFill
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <BasicText text="রিমোশন শেখা" />
          </AbsoluteFill>
        </Series.Sequence>

        {/* - Second Scene */}
        <Series.Sequence durationInFrames={toFrames(5)}>
          <AbsoluteFill
            style={{
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              gap: 20,
            }}
          >
            <AnimatedCard title="কার্ড ১" delay={0} />
            <AnimatedCard title="কার্ড ২" delay={15} />
            <AnimatedCard title="কার্ড ৩" delay={30} />
          </AbsoluteFill>
        </Series.Sequence>

        {/*  Third Scene */}
        <Series.Sequence durationInFrames={toFrames(4)}>
          <ParticleSystem />
        </Series.Sequence>
      </Series>

      {/* Transition Series */}
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={toFrames(3)}>
          <AbsoluteFill
            style={{
              background: "#ff6b6b",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h1 style={{ color: "white", fontSize: 80 }}>ট্রানজিশন ১</h1>
          </AbsoluteFill>
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={slide()}
          timing={linearTiming({ durationInFrames: 30 })}
        />

        <TransitionSeries.Sequence durationInFrames={toFrames(3)}>
          <AbsoluteFill
            style={{
              background: "#4ecdc4",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h1 style={{ color: "white", fontSize: 80 }}>ট্রানজিশন ২</h1>
          </AbsoluteFill>
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: 30 })}
        />

        <TransitionSeries.Sequence durationInFrames={toFrames(3)}>
          <AbsoluteFill
            style={{
              background: "#45b7d1",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h1 style={{ color: "white", fontSize: 80 }}>ট্রানজিশন ৩</h1>
          </AbsoluteFill>
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
