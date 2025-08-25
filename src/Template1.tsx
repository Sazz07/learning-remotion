import { AbsoluteFill, Img, staticFile } from "remotion";

const Template1 = () => {
  return (
    <AbsoluteFill className="bg-gray-800 flex items-center justify-center">
      <div className="bg-white size-80 -rotate-2">
        <Img
          src={staticFile("assets/template1.jpeg")}
          className="w-full p-3 pb-0 h-3/4 object-cover"
        />
      </div>
    </AbsoluteFill>
  );
};

export default Template1;
