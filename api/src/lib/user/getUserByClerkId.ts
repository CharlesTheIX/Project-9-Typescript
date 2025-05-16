import * as gbl from '../../globals';
import Model from '../../models/user.model';

export default async (clerkId: string): Promise<ApiResponse> => {
  try {
    const doc = await Model.findOne({ clerkId: clerkId });

    if (!doc) return { ...gbl.response_BAD, message: `No user found with clerkId: ${clerkId}.` };

    return { ...gbl.response_OK, data: doc };
  } catch (error: any) {
    console.error(`Get user by clerkId error: ${error.message}`);
    return { ...gbl.response_SERVER_ERROR, message: error.message };
  }
};
