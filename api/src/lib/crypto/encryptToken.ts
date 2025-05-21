import crypto from "crypto";
import * as gbl from "../../globals";
import { cryptoVariables } from "../getVariables";

export default (token: string): ApiResponse => {
  try {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv("aes-256-ccm", Buffer.from(cryptoVariables()), iv);
    const encryptedToken = cipher.update(token, "utf8", "base64");
    return { ...gbl.response_OK, data: `${iv.toString("base64")}:${encryptedToken}${cipher.final("base64")}` };
  } catch (error: any) {
    console.error(error.message);
    return { ...gbl.response_SERVER_ERROR, message: error.message };
  }
};
