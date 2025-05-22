import * as gbl from "@/globals";

type Props = {
  limit?: number;
  continent: Continent;
};

export default async (props: Props): Promise<ApiResponse> => {
  const { continent, limit = 200 } = props;

  try {
    const response: ApiResponse = await fetch(`/api/countries/by-continent`, {
      method: "POST",
      headers: gbl.defaultInternalHeader,
      body: JSON.stringify({ continent, limit }),
    }).then((res: any) => res.json());

    return response;
  } catch (error: any) {
    return gbl.response_SERVER_ERROR;
  }
};
