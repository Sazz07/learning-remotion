import {
  AbsoluteFill,
  Composition,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Sequence,
  Easing,
} from "remotion";
import { z } from "zod";
import React from "react";

const colors = {
  bgFrom: "#0B1220",
  bgTo: "#091B2A",
  accent: "#27E1C1",
  accentSoft: "rgba(39, 225, 193, 0.2)",
  text: "#E8F0FF",
  subtext: "#A9B3C8",
  card: "rgba(255, 255, 255, 0.06)",
  border: "rgba(255, 255, 255, 0.12)",
};

const fonts = {
  title: "Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto",
  body: "Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto",
  mono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono"',
};

// Props Schema
export const simpleResumeSchema = z.object({
  name: z.string(),
  title: z.string(),
  summary: z.string(),
  skills: z.array(
    z.object({
      label: z.string(),
      items: z.array(z.string()),
    }),
  ),
  projects: z.array(
    z.object({
      title: z.string(),
      tech: z.array(z.string()),
      description: z.string(),
    }),
  ),
});

type SimpleResumeProps = z.infer<typeof simpleResumeSchema>;

const FadeIn: React.FC<{
  delay?: number;
  duration?: number;
  children: React.ReactNode;
}> = ({ delay = 0, duration = 20, children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const start = delay * fps;
  const end = start + duration;

  const opacity = interpolate(frame, [start, end], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.ease),
  });

  const y = interpolate(frame, [start, end], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div style={{ opacity, transform: `translateY(${y}px)` }}>{children}</div>
  );
};

const GlassCard: React.FC<{
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ children, style }) => (
  <div
    style={{
      background: colors.card,
      border: `1px solid ${colors.border}`,
      borderRadius: 20,
      padding: 24,
      boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
      backdropFilter: "blur(6px)",
      ...style,
    }}
  >
    {children}
  </div>
);

const Background: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const progress = frame / durationInFrames;
  const angle = interpolate(progress, [0, 1], [20, 380]);

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(${angle}deg, ${colors.bgFrom}, ${colors.bgTo})`,
      }}
    />
  );
};

const Intro: React.FC<{ name: string; title: string }> = ({ name, title }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const scale = spring({ frame, fps, config: { damping: 200 } });

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <FadeIn duration={28}>
        <div
          style={{
            textAlign: "center",
            transform: `scale(${0.9 + scale * 0.1})`,
          }}
        >
          <div
            style={{
              fontFamily: fonts.title,
              fontWeight: 800,
              fontSize: 80,
              color: colors.text,
              marginBottom: 16,
            }}
          >
            {name}
          </div>
          <div
            style={{
              fontFamily: fonts.body,
              fontSize: 32,
              color: colors.accent,
            }}
          >
            {title}
          </div>
        </div>
      </FadeIn>
    </AbsoluteFill>
  );
};

const Skills: React.FC<{ skills: SimpleResumeProps["skills"] }> = ({
  skills,
}) => (
  <AbsoluteFill style={{ padding: 80 }}>
    <GlassCard>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 20,
        }}
      >
        {skills.map((group, idx) => (
          <FadeIn key={idx} delay={idx * 0.1}>
            <div
              style={{
                border: `1px dashed ${colors.border}`,
                borderRadius: 14,
                padding: 16,
              }}
            >
              <div
                style={{ color: colors.accent, marginBottom: 8, fontSize: 20 }}
              >
                {group.label}
              </div>
              <div style={{ color: colors.text, fontSize: 18 }}>
                {group.items.join(" · ")}
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </GlassCard>
  </AbsoluteFill>
);

const Projects: React.FC<{ projects: SimpleResumeProps["projects"] }> = ({
  projects,
}) => (
  <AbsoluteFill style={{ padding: 80 }}>
    <GlassCard>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        {projects.map((project, idx) => (
          <FadeIn key={idx} delay={idx * 0.12}>
            <div
              style={{
                border: `1px dashed ${colors.border}`,
                borderRadius: 14,
                padding: 16,
              }}
            >
              <div
                style={{ color: colors.text, fontSize: 24, fontWeight: 700 }}
              >
                {project.title}
              </div>
              <div style={{ color: colors.accent, marginTop: 8, fontSize: 16 }}>
                {project.tech.join(" · ")}
              </div>
              <div
                style={{ color: colors.subtext, marginTop: 8, fontSize: 18 }}
              >
                {project.description}
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </GlassCard>
  </AbsoluteFill>
);

// Main Component
const SimpleResume: React.FC<SimpleResumeProps> = (props) => {
  const { fps } = useVideoConfig();
  const sec = (s: number) => Math.round(s * fps);

  const intro = sec(4.0);
  const skills = sec(5.0);
  const projects = sec(6.0);

  return (
    <AbsoluteFill>
      <Background />

      <Sequence durationInFrames={intro}>
        <Intro name={props.name} title={props.title} />
      </Sequence>

      <Sequence from={intro} durationInFrames={skills}>
        <Skills skills={props.skills} />
      </Sequence>

      <Sequence from={intro + skills} durationInFrames={projects}>
        <Projects projects={props.projects} />
      </Sequence>
    </AbsoluteFill>
  );
};

// Example default props
const defaultProps: SimpleResumeProps = {
  name: "John Doe",
  title: "Full Stack Developer",
  summary:
    "Experienced developer with a passion for creating scalable web applications.",
  skills: [
    {
      label: "Frontend",
      items: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
    },
    {
      label: "Backend",
      items: ["Node.js", "Express", "PostgreSQL", "MongoDB"],
    },
  ],
  projects: [
    {
      title: "E-Commerce Platform",
      tech: ["Next.js", "TypeScript", "Stripe"],
      description:
        "Built a full-featured e-commerce platform with payment integration",
    },
    {
      title: "Task Management App",
      tech: ["React", "Node.js", "MongoDB"],
      description:
        "Developed a real-time collaborative task management application",
    },
  ],
};

export const SimpleResumeComposition: React.FC = () => {
  return (
    <Composition
      id="SimpleResume"
      component={SimpleResume}
      width={1920}
      height={1080}
      fps={30}
      durationInFrames={30 * 15} // 15 seconds total
      schema={simpleResumeSchema}
      defaultProps={defaultProps}
    />
  );
};
