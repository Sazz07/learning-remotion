import "./index.css";
import { Composition, Folder } from "remotion";
import { MyComposition } from "./Composition";
import MyVideo from "./MyVideo";
import { MyVideo2 } from "./MyComposition";
import { AnimatedResume } from "./AnimatedResumeComposition";
import BasicTransition from "./BasicTransition";
import MyComponent, { myCompSchema } from "./MyComponent";
import UserComp, { calcUserCompMetadata, userCompSchema } from "./UserComp";
import CircleChart, { circlePercentageScheme } from "./CircleChart";
import ColorBox from "./ColorBox";
import InterpolateText from "./InterpolateText";
import SpringText from "./SpringText";
import { SpringBox } from "./SpringBox";
import CompareLinearSpring from "./CompareLinearSpring";
import { GitHubBanner } from "./GitHubBanner";
import Template1 from "./Template1";
import Template2, { template2Schema } from "./Template2";
import { Template3, templateSchema } from "./Template3";
import Template4 from "./Template4";
import TemplateFour, { TemplateFourSchema } from "./TemplateFour";

const paragraphs = [
  "This animation highlights specific text within paragraphs. You can use it to draw attention to important phrases or concepts.",
  "The animation moves sequentially through all paragraphs, highlighting each marked phrase. You can customize text styling and effects via themes.",
  "For best results, keep highlight phrases relatively short and ensure they exactly match text within the paragraph.",
];

const highlights = [
  "highlights specific text within paragraphs.",
  "sequentially through all paragraphs,",
  "exactly match text",
];

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="MyComp"
        component={MyComposition}
        durationInFrames={60}
        fps={30}
        width={1280}
        height={720}
      />
      <Composition
        id="MyVideo"
        component={MyVideo}
        durationInFrames={120}
        fps={30}
        width={1280}
        height={720}
      />
      <Composition
        id="MyVideo2"
        component={MyVideo2}
        durationInFrames={120}
        fps={30}
        width={1280}
        height={720}
      />
      <Composition
        id="AnimatedResume"
        component={AnimatedResume}
        width={1920}
        height={1080}
        fps={30}
        durationInFrames={30 * 56}
        defaultProps={{}}
      />
      <Composition
        id="BasicTransition"
        component={BasicTransition}
        durationInFrames={120}
        fps={30}
        width={1280}
        height={720}
      />
      <Composition
        id="MyComponent"
        component={MyComponent}
        durationInFrames={60}
        fps={30}
        width={1280}
        height={720}
        schema={myCompSchema}
        defaultProps={{ propOne: "Jhob", propTwo: 12 }}
      />
      <Composition
        id="UserComp"
        component={UserComp}
        durationInFrames={60}
        fps={30}
        width={1280}
        height={720}
        defaultProps={{ id: 3, data: null }}
        schema={userCompSchema}
        calculateMetadata={calcUserCompMetadata}
      />

      <Composition
        id="CircleChart"
        component={CircleChart}
        durationInFrames={300}
        fps={30}
        width={1280}
        height={720}
        defaultProps={{ percentage: 75 }}
        schema={circlePercentageScheme}
      />

      <Folder name="Templates">
        <Composition
          id="Template1"
          component={Template1}
          durationInFrames={300}
          fps={30}
          width={1280}
          height={720}
        />

        <Composition
          id="Template2"
          component={Template2}
          durationInFrames={300}
          fps={30}
          width={1280}
          height={720}
          schema={template2Schema}
          defaultProps={{
            text: "John F Kennedy - 1984.",
            theme: "theme1",
          }}
        />

        <Composition
          id="Template3"
          component={Template3}
          durationInFrames={300}
          fps={30}
          width={1280}
          height={720}
          defaultProps={{
            paragraphs,
            highlights,
            highlightColor: "#fde047",
          }}
          schema={templateSchema}
        />

        <Composition
          id="Template4"
          component={Template4}
          durationInFrames={180}
          fps={30}
          width={1280}
          height={720}
        />

        <Composition
          id="TemplateFour"
          component={TemplateFour}
          durationInFrames={220}
          fps={30}
          width={1280}
          height={720}
          schema={TemplateFourSchema}
          defaultProps={{
            title: "TOP TECH TRENDS 2024",
            items: [
              "ARTIFICIAL INTELLIGENCE",
              "QUANTUM COMPUTING",
              "SUSTAINABLE TECH",
              "CYBER SECURITY",
              "MIXED REALITY",
            ],
            colors: {
              background: "#000000",
              text: "#ffffff",
              highlight: "#ec4899",
              divider: "#ffffff",
            },
            timings: {
              titleDelay: 0,
              dividerDelay: 10,
              zoomDelay: 30,
              itemRevealDelay: 60,
              itemStagger: 15,
              highlightStart: 120,
              highlightDuration: 20,
            },
          }}
        />
      </Folder>

      <Composition
        id="ColorBox"
        component={ColorBox}
        durationInFrames={150}
        fps={30}
        width={1280}
        height={720}
      />

      <Composition
        id="InterpolateText"
        component={InterpolateText}
        durationInFrames={150}
        fps={30}
        width={1280}
        height={720}
      />

      <Composition
        id="SpringTextComp"
        component={SpringText}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
      />

      <Folder name="SpringAnimations">
        <Composition
          id="SpringBoxComp"
          component={SpringBox}
          durationInFrames={120}
          fps={30}
          width={1920}
          height={1080}
        />

        <Composition
          id="CompareLinearSpringComp"
          component={CompareLinearSpring}
          durationInFrames={150}
          fps={30}
          width={1280}
          height={720}
        />
      </Folder>

      <Composition
        id="GitHubBanner"
        component={GitHubBanner}
        durationInFrames={300} // 10s at 30fps
        fps={30}
        width={1280}
        height={400}
      />
    </>
  );
};
