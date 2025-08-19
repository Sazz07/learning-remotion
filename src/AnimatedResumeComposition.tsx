import React from "react";
import {
  AbsoluteFill,
  Audio,
  Composition,
  Easing,
  Img,
  interpolate,
  Sequence,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

// ------------------------------
// THEME
// ------------------------------
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
  mono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
};

// ------------------------------
// DATA (Populate from your resume)
// ------------------------------
const data = {
  name: "MD. SAZZAD HOSSAIN",
  title: "Full Stack Developer",
  location: "Faridabad, Dhaka-1204",
  phone: "+8801706419870",
  email: "sazzad.hossain882@gmail.com",
  links: {
    portfolio: "https://sazzad.vercel.app",
    github: "https://github.com/Sazz07",
    linkedin: "https://www.linkedin.com/in/md-sazzad-hossain-996b84347",
  },
  summary:
    "Full-stack developer with 2.5+ years building scalable, user-focused web apps. Proficient in React.js, Next.js, Node.js. Focused on performance, clean code, and collaborative delivery.",
  skills: [
    {
      label: "Frontend",
      items: [
        "HTML5",
        "CSS3",
        "JavaScript",
        "TypeScript",
        "React.js",
        "Next.js",
        "Angular",
        "Tailwind CSS",
      ],
    },
    {
      label: "Backend",
      items: ["Node.js", "Express.js", "MongoDB", "PostgreSQL", "Prisma"],
    },
    {
      label: "State & Data",
      items: ["Redux Toolkit", "RTK Query", "TanStack Query", "Context API"],
    },
    {
      label: "Tools",
      items: ["Git", "GitHub", "VS Code", "Figma", "Postman", "Vercel"],
    },
    {
      label: "Soft Skills",
      items: ["Communication", "Problem Solving", "Teamwork", "Adaptability"],
    },
  ],
  experience: [
    {
      company: "Tutors Finland Oy",
      role: "Software Developer",
      location: "Helsinki, Finland (Remote)",
      period: "Mar 2024 – Present",
      points: [
        "Collaborated with a globally distributed team on Nedu AI’s UI, implementing scalable component architecture and responsive design.",
        "Integrated RESTful APIs and optimized performance, reducing load times by 40%.",
        "Improved accessibility and SEO for higher discoverability and user retention.",
      ],
      logo: null, // put a logo path if available
    },
    {
      company: "Repliq Limited",
      role: "Frontend Developer",
      location: "Dhaka, Bangladesh",
      period: "Apr 2023 – Mar 2024",
      points: [
        "Designed and developed responsive UI components for multiple client projects.",
        "Enhanced front-end performance and ensured cross-browser compatibility.",
        "Contributed to building user-friendly, visually appealing web applications.",
      ],
      logo: null,
    },
  ],
  projects: [
    {
      title: "Nedu AI – AI Career Planning Platform",
      live: "https://sp.nedu.solutions",
      tech: ["React.js", "Next.js", "Tailwind CSS"],
      points: [
        "Built mobile-first platform and reusable components.",
        "Optimized site speed via server-side rendering & image optimization.",
      ],
      mock: null, // put image path if available, e.g., require("./assets/nedu.png")
    },
    {
      title: "Pro HR – Applicant Tracking System",
      live: "https://staging.prohr.io",
      tech: ["React", "TypeScript", "Material UI"],
      points: [
        "Engineered responsive dashboard with secure authentication.",
        "Real-time applicant tracking improved CV processing efficiency by ~60%.",
      ],
      mock: null,
    },
  ],
  education: {
    school: "Northern University of Bangladesh",
    degree: "B.Sc. in Computer Science & Engineering",
    period: "2017 – 2022",
  },
  languages: [
    { name: "Bangla", level: "Native" },
    { name: "English", level: "Comfortable" },
    { name: "Hindi", level: "Comfortable" },
  ],
  // Optional background music – drop your file under public/ or import from assets
  music: null, // e.g., require('./assets/clean-beat.mp3')
};

// ------------------------------
// UTILITIES
// ------------------------------
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

const Stagger: React.FC<{
  items: React.ReactNode[];
  every?: number;
  baseDelay?: number;
}> = ({ items, every = 8, baseDelay = 0 }) => {
  return (
    <>
      {items.map((node, i) => (
        <FadeIn key={i} delay={baseDelay + i * (every / 30)}>
          <div style={{ marginBottom: 8 }}>{node}</div>
        </FadeIn>
      ))}
    </>
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

const SectionTitle: React.FC<{ label: string; right?: React.ReactNode }> = ({
  label,
  right,
}) => (
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 12,
    }}
  >
    <div
      style={{ fontFamily: fonts.mono, letterSpacing: 1, color: colors.accent }}
    >
      {label.toUpperCase()}
    </div>
    <div>{right}</div>
  </div>
);

const AccentUnderline: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <span
    style={{
      background: `linear-gradient(180deg, transparent 60%, ${colors.accentSoft} 0)`,
    }}
  >
    {children}
  </span>
);

// ------------------------------
// BACKGROUND
// ------------------------------
const GradientBackground: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const progress = frame / durationInFrames;

  const angle = interpolate(progress, [0, 1], [20, 380]);

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(${angle}deg, ${colors.bgFrom}, ${colors.bgTo})`,
      }}
    >
      {/* subtle moving glow */}
      <div
        style={{
          position: "absolute",
          top: "-20%",
          left: "-10%",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: colors.accentSoft,
          filter: "blur(80px)",
          transform: `translate(${Math.sin(progress * Math.PI * 2) * 40}px, ${Math.cos(progress * Math.PI * 2) * 20}px)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-25%",
          right: "-10%",
          width: 700,
          height: 700,
          borderRadius: "50%",
          background: "rgba(120, 190, 255, 0.12)",
          filter: "blur(110px)",
        }}
      />
    </AbsoluteFill>
  );
};

// ------------------------------
// SECTIONS
// ------------------------------
const Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const scale = spring({ frame, fps, config: { damping: 200, mass: 1.2 } });

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
              fontFamily: fonts.mono,
              fontSize: 22,
              color: colors.accent,
              letterSpacing: 3,
              marginBottom: 14,
            }}
          >
            HELLO, I’M
          </div>
          <div
            style={{
              fontFamily: fonts.title,
              fontWeight: 800,
              fontSize: 80,
              color: colors.text,
              letterSpacing: -1,
              marginBottom: 8,
            }}
          >
            {data.name}
          </div>
          <div
            style={{
              fontFamily: fonts.body,
              fontSize: 28,
              color: colors.subtext,
            }}
          >
            <AccentUnderline>{data.title}</AccentUnderline>
          </div>
        </div>
      </FadeIn>
    </AbsoluteFill>
  );
};

const Contacts: React.FC = () => {
  const row = (label: string, value: string) => (
    <div style={{ display: "flex", gap: 10, alignItems: "baseline" }}>
      <div
        style={{
          fontFamily: fonts.mono,
          color: colors.accent,
          fontSize: 16,
          width: 120,
        }}
      >
        {label}
      </div>
      <div style={{ color: colors.text, fontSize: 22 }}>{value}</div>
    </div>
  );

  return (
    <AbsoluteFill style={{ padding: 80 }}>
      <GlassCard>
        <SectionTitle label="Contact & Links" />
        <Stagger
          every={6}
          items={[
            row("Phone", data.phone),
            row("Email", data.email),
            row("Portfolio", data.links.portfolio),
            row("GitHub", data.links.github),
            row("LinkedIn", data.links.linkedin),
          ]}
        />
      </GlassCard>
    </AbsoluteFill>
  );
};

const Summary: React.FC = () => (
  <AbsoluteFill style={{ padding: 80 }}>
    <GlassCard>
      <SectionTitle label="Summary" />
      <FadeIn>
        <div
          style={{
            fontSize: 26,
            lineHeight: 1.5,
            color: colors.text,
          }}
        >
          {data.summary}
        </div>
      </FadeIn>
    </GlassCard>
  </AbsoluteFill>
);

const Skills: React.FC = () => {
  return (
    <AbsoluteFill style={{ padding: 80 }}>
      <GlassCard>
        <SectionTitle label="Skills" />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
            gap: 18,
          }}
        >
          {data.skills.map((group, idx) => (
            <FadeIn key={idx} delay={idx * 0.08}>
              <div
                style={{
                  border: `1px dashed ${colors.border}`,
                  borderRadius: 14,
                  padding: 16,
                }}
              >
                <div
                  style={{
                    fontFamily: fonts.mono,
                    color: colors.accent,
                    marginBottom: 6,
                  }}
                >
                  {group.label}
                </div>
                <div
                  style={{ color: colors.text, opacity: 0.95, fontSize: 20 }}
                >
                  {group.items.join(" · ")}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </GlassCard>
    </AbsoluteFill>
  );
};

const Experience: React.FC = () => (
  <AbsoluteFill style={{ padding: 80 }}>
    <GlassCard>
      <SectionTitle label="Experience" />
      <div style={{ display: "grid", gap: 16 }}>
        {data.experience.map((exp, i) => (
          <FadeIn key={i} delay={i * 0.12}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "140px 1fr",
                gap: 18,
                alignItems: "start",
              }}
            >
              <div
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: `1px solid ${colors.border}`,
                  borderRadius: 14,
                  height: 140,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: colors.subtext,
                  fontFamily: fonts.mono,
                  fontSize: 12,
                }}
              >
                {exp.logo ? <Img src={exp.logo} /> : "LOGO"}
              </div>
              <div>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 10,
                    alignItems: "baseline",
                  }}
                >
                  <div
                    style={{
                      color: colors.text,
                      fontSize: 26,
                      fontWeight: 700,
                    }}
                  >
                    {exp.role}
                  </div>
                  <div style={{ color: colors.subtext }}>@ {exp.company}</div>
                </div>
                <div style={{ color: colors.subtext, marginTop: 2 }}>
                  {exp.location} • {exp.period}
                </div>
                <ul
                  style={{
                    marginTop: 10,
                    color: colors.text,
                    fontSize: 20,
                    lineHeight: 1.5,
                  }}
                >
                  {exp.points.map((p, idx) => (
                    <li key={idx} style={{ marginBottom: 6 }}>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </GlassCard>
  </AbsoluteFill>
);

const Projects: React.FC = () => (
  <AbsoluteFill style={{ padding: 80 }}>
    <GlassCard>
      <SectionTitle label="Projects" />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
        {data.projects.map((p, i) => (
          <FadeIn key={i} delay={i * 0.12}>
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
                {p.title}
              </div>
              <div style={{ color: colors.subtext, marginTop: 4 }}>
                Live: {p.live}
              </div>
              <div style={{ color: colors.subtext, marginTop: 4 }}>
                Tech: {p.tech.join(" · ")}
              </div>
              <ul
                style={{
                  marginTop: 10,
                  color: colors.text,
                  fontSize: 20,
                  lineHeight: 1.5,
                }}
              >
                {p.points.map((pt, idx) => (
                  <li key={idx} style={{ marginBottom: 6 }}>
                    {pt}
                  </li>
                ))}
              </ul>
              <div
                style={{
                  marginTop: 8,
                  height: 160,
                  borderRadius: 12,
                  background: "rgba(255,255,255,0.04)",
                  border: `1px solid ${colors.border}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: colors.subtext,
                }}
              >
                {p.mock ? <Img src={p.mock} /> : "Project Screenshot"}
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </GlassCard>
  </AbsoluteFill>
);

const EducationLang: React.FC = () => (
  <AbsoluteFill style={{ padding: 80 }}>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
      <GlassCard>
        <SectionTitle label="Education" />
        <div style={{ color: colors.text, fontSize: 24, fontWeight: 700 }}>
          {data.education.school}
        </div>
        <div style={{ color: colors.subtext, marginTop: 4 }}>
          {data.education.degree}
        </div>
        <div style={{ color: colors.subtext, marginTop: 4 }}>
          {data.education.period}
        </div>
      </GlassCard>
      <GlassCard>
        <SectionTitle label="Languages" />
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          {data.languages.map((l, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div
                style={{
                  border: `1px dashed ${colors.border}`,
                  borderRadius: 14,
                  padding: "10px 14px",
                  color: colors.text,
                }}
              >
                {l.name} —{" "}
                <span style={{ color: colors.subtext }}>{l.level}</span>
              </div>
            </FadeIn>
          ))}
        </div>
      </GlassCard>
    </div>
  </AbsoluteFill>
);

const Outro: React.FC = () => (
  <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
    <FadeIn>
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            fontFamily: fonts.title,
            fontWeight: 800,
            fontSize: 54,
            color: colors.text,
            letterSpacing: -0.5,
          }}
        >
          Let’s Build Something Great Together 🚀
        </div>
        <div style={{ color: colors.subtext, fontSize: 22, marginTop: 10 }}>
          {data.links.portfolio}
        </div>
        <div style={{ color: colors.subtext, fontSize: 20, marginTop: 4 }}>
          {data.email}
        </div>
      </div>
    </FadeIn>
  </AbsoluteFill>
);

// ------------------------------
// MASTER TIMELINE
// ------------------------------
export const AnimatedResume: React.FC = () => {
  const { fps } = useVideoConfig();

  // Section durations (seconds) -> frames
  const sec = (s: number) => Math.round(s * fps);
  const intro = sec(4.0);
  const contacts = sec(4.5);
  const summary = sec(6.0);
  const skills = sec(7.0);
  const experience = sec(13.0);
  const projects = sec(10.0);
  const eduLang = sec(5.5);
  const outro = sec(5.5);
  const total =
    intro +
    contacts +
    summary +
    skills +
    experience +
    projects +
    eduLang +
    outro;

  return (
    <AbsoluteFill>
      <GradientBackground />

      {data.music && (
        // Optional background music. Keep volume subtle.
        <Audio src={data.music} volume={0.18} />
      )}

      <Sequence durationInFrames={intro}>
        <Intro />
      </Sequence>

      <Sequence from={intro} durationInFrames={contacts}>
        <Contacts />
      </Sequence>

      <Sequence from={intro + contacts} durationInFrames={summary}>
        <Summary />
      </Sequence>

      <Sequence from={intro + contacts + summary} durationInFrames={skills}>
        <Skills />
      </Sequence>

      <Sequence
        from={intro + contacts + summary + skills}
        durationInFrames={experience}
      >
        <Experience />
      </Sequence>

      <Sequence
        from={intro + contacts + summary + skills + experience}
        durationInFrames={projects}
      >
        <Projects />
      </Sequence>

      <Sequence
        from={intro + contacts + summary + skills + experience + projects}
        durationInFrames={eduLang}
      >
        <EducationLang />
      </Sequence>

      <Sequence from={total - outro} durationInFrames={outro}>
        <Outro />
      </Sequence>
    </AbsoluteFill>
  );
};

// ------------------------------
// COMPOSITION REGISTRATION
// ------------------------------
export const AnimatedResumeComposition: React.FC = () => {
  return (
    <>
      <Composition
        id="AnimatedResume"
        component={AnimatedResume}
        width={1920}
        height={1080}
        fps={30}
        durationInFrames={30 * 56} // ~56 seconds; actual computed inside can exceed; adjust as needed
        defaultProps={{}}
      />
    </>
  );
};
