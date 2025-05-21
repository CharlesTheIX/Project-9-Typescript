import * as gbl from "../../globals";
import Model from "../../models/user.model";

export default async (props: User): Promise<ApiResponse> => {
  const { email, role, clerkId, username, fullName, profileImageURL } = props;

  try {
    const newDoc = new Model({
      role,
      email,
      clerkId,
      username,
      fullName,
      profileImageURL: profileImageURL || "",
    });

    if (!newDoc) return { ...gbl.response_BAD, message: "User not created." };

    const createdDoc = await newDoc.save();

    if (!createdDoc) return { ...gbl.response_BAD, message: "User not created." };

    return { ...gbl.response_DB_UPDATED };
  } catch (error: any) {
    console.error(`Create user error: ${error.message}`);
    return { ...gbl.response_SERVER_ERROR, message: error.message };
  }
};
