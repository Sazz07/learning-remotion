import "./index.css";
import { Composition } from "remotion";
import { MyComposition } from "./Composition";
import MyVideo from "./MyVideo";
import { MyVideo2 } from "./MyComposition";
import { AnimatedResume } from "./AnimatedResumeComposition";
import BasicTransition from "./BasicTransition";
import MyComponent, { myCompSchema } from "./MyComponent";
import UserComp, { calcUserCompMetadata, userCompSchema } from "./UserComp";

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
        durationInFrames={30 * 56} // ~56 seconds; actual computed inside can exceed; adjust as needed
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
    </>
  );
};
