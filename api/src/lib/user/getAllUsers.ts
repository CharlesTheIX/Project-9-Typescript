import * as gbl from "../../globals";
import Model from "../../models/user.model";

export default async (limit: number = 200): Promise<ApiResponse> => {
  try {
    const docs = await Model.find().limit(limit);

    if (!docs) return { ...gbl.response_BAD, message: "No users found." };

    if (docs.length === 0) return { ...gbl.response_NO_CONTENT, message: "No users found." };

    const docsArray: User[] = docs.map((doc: any) => {
      return {
        role: doc.role,
        email: doc.email,
        clerkId: doc.clerkId,
        username: doc.username,
        fullName: doc.fullName,
        _id: doc._id.toString(),
        createdAt: doc.createdAt,
        updatedAt: doc.updatedAt,
        profileImageURL: doc.profileImageURL,
      };
    });

    return { ...gbl.response_OK, data: docsArray };
  } catch (error: any) {
    console.error(`Get all users error: ${error.message}`);
    return { ...gbl.response_SERVER_ERROR, message: error.message };
  }
};
