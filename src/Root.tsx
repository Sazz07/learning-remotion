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
          text: "John F Kennedy - 1984",
          theme: "theme1",
        }}
      />

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
