import * as gbl from "../../globals";
import Model from "../../models/country.model";

export default async (props: Country): Promise<ApiResponse> => {
  const {
    names,
    imageUrl,
    continent,
    languages,
    population,
    displayName,
    description,
    capitalCity,
    mapRectangle,
    flagRectangle,
  } = props;

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
      capitalCity: capitalCity || "",
    });
    if (!newDoc) return { ...gbl.response_BAD, message: "Country not created." };

    const createdDoc = await newDoc.save();
    if (!createdDoc) return { ...gbl.response_BAD, message: "Country not created." };

    return { ...gbl.response_DB_UPDATED };
  } catch (error: any) {
    console.error(`Create country error: ${error.message}`);
    return { ...gbl.response_SERVER_ERROR, message: error.message };
  }
};
