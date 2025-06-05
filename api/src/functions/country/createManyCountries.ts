import * as gbl from "../../globals";
import Model from "../../models/country.model";

type Props = {
  countries: Country[];
};

export default async (props: Props): Promise<ApiResponse> => {
  const { countries } = props;
  const result: CreateManyResponse = {
    errors: [],
    created: [],
    skipped: []
  };

  try {
    for (const country of countries) {
      const {
        names,
        imageUrl,
        continent,
        languages,
        population,
        description,
        displayName,
        capitalCity,
        mapRectangle,
        flagRectangle
      } = country;

      try {
        const newDoc = new Model({
          names,
          continent,
          displayName,
          mapRectangle,
          flagRectangle,
          imageUrl: imageUrl || "",
          languages: languages || [],
          population: population || 0,
          description: description || "",
          capitalCity: capitalCity || ""
        });

        if (!newDoc) {
          result.errors.push({ displayName, message: "Country not created" });
          continue;
        }

        const createdDoc = await newDoc.save();
        if (!createdDoc) {
          result.errors.push({ displayName, message: "Country not created" });
          continue;
        }

        result.created.push(displayName);
      } catch (error: any) {
        result.errors.push({ displayName: country.displayName, message: error.mresssge });
      }
    }

    return { ...gbl.response_DB_UPDATED, data: result };
  } catch (error: any) {
    console.error(`Create many countries error: ${error.message}`);
    return { ...gbl.response_SERVER_ERROR, message: error.message };
  }
};
