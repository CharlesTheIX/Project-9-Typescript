import * as gbl from "@/globals";

type Props = {
  _id: string;
  update: Partial<User>;
};

export default async (props: Props): Promise<ApiResponse> => {
  const { _id, update } = props;

  try {
    const response: ApiResponse = await fetch(`${process.env.LOCAL_URI}/api/users/by-id`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        AUTHORIZATION: `Bearer ${process.env.LOCAL_API_AUTH_TOKEN},`,
      },
      body: JSON.stringify({ _id, update }),
    }).then((res: any) => res.json());

    return response;
  } catch (error: any) {
    return gbl.response_SERVER_ERROR;
  }
};
