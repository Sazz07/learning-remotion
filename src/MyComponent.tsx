import { z } from "zod";

export const myCompSchema = z.object({
  propOne: z.string(),
  propTwo: z.number(),
});

const MyComponent: React.FC<z.infer<typeof myCompSchema>> = ({
  propOne,
  propTwo,
}) => {
  return (
    <div>
      props: {propOne}, {propTwo}
    </div>
  );
};

export default MyComponent;
