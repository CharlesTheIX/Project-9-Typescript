import * as gbl from "../../globals";
import Model from "../../models/user.model";

type Props = {
  users: User[];
};

export default async (props: Props): Promise<ApiResponse> => {
  const { users } = props;
  const result: ApiManyResponseData = {
    errors: [],
    created: [],
    skipped: [],
  };

  try {
    for (const user of users) {
      const { role, email, clerkId, username, profileType, profileImageUrl } = user;

      try {
        const newDoc = new Model({
          role,
          email,
          clerkId,
          username,
          profileType: profileType || "user",
          profileImageUrl: profileImageUrl || "",
        });

        if (!newDoc) {
          result.errors.push({ id: email, message: "User not created" });
          continue;
        }

        const createdDoc = await newDoc.save();
        if (!createdDoc) {
          result.errors.push({ id: email, message: "User not created" });
          continue;
        }

        result.created.push(email);
      } catch (error: any) {
        result.errors.push({ id: user.email, message: error.message });
      }
    }

    return { ...gbl.response_DB_UPDATED, data: result };
  } catch (error: any) {
    console.error(`Create many users error: ${error.message}`);
    return { ...gbl.response_SERVER_ERROR, message: error.message };
  }
};
