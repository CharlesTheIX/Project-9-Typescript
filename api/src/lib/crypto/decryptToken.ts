import crypto from "crypto";
import * as gbl from "../../globals";
import { cryptoVariables } from "../getVariables";

export default (token: string): ApiResponse => {
  try {
    const [ivBase64, encryptedData] = token.split(":");
    const iv = Buffer.from(ivBase64, "base64");
    const decipher = crypto.createDecipheriv("aes-256-ccm", Buffer.from(cryptoVariables()), iv);
    var decryptedToken = decipher.update(encryptedData, "base64", "utf8");
    return { ...gbl.response_OK, data: `${decryptedToken}${decipher.final("utf8")}` };
  } catch (error: any) {
    console.error(error.message);
    return { ...gbl.response_SERVER_ERROR, message: error.message };
  }
};
