import { AbsoluteFill, CalculateMetadataFunction } from "remotion";
import { z } from "zod";

const apiResponse = z.object({
  id: z.number(),
  name: z.string(),
  username: z.string(),
  email: z.string(),
  address: z.object({
    street: z.string(),
    suite: z.string(),
    city: z.string(),
    zipcode: z.string(),
    geo: z.object({
      lat: z.string(),
      lng: z.string(),
    }),
  }),
  phone: z.string(),
  website: z.string(),
  company: z.object({
    name: z.string(),
    catchPhrase: z.string(),
    bs: z.string(),
  }),
});

export const userCompSchema = z.object({
  id: z.number(),
  data: z.nullable(apiResponse),
});

type Props = z.infer<typeof userCompSchema>;

export const calcUserCompMetadata: CalculateMetadataFunction<Props> = async ({
  props,
  abortSignal,
}) => {
  const data = await fetch(
    `https://jsonplaceholder.typicode.com/users/${props.id}`,
    {
      signal: abortSignal,
    },
  );
  const json = await data.json();

  return {
    props: {
      ...props,
      data: json,
    },
  };
};

const UserComp: React.FC<Props> = ({ data }) => {
  if (!data) {
    throw new Error("No user data found");
  }

  return (
    <AbsoluteFill className="flex items-center justify-center bg-blue-100 p-4 text-2xl">
      <h1>{data.name}</h1>
      <p>Username: {data.username}</p>
      <p>Email: {data.email}</p>
      <p>Phone: {data.phone}</p>
      <p>Website: {data.website}</p>
      <h2>Address</h2>
      <p>
        {data.address.street}, {data.address.suite}, {data.address.city},{" "}
        {data.address.zipcode}
      </p>
      <h2>Company</h2>
      <p>
        {data.company.name} - {data.company.catchPhrase}
      </p>
    </AbsoluteFill>
  );
};

export default UserComp;
