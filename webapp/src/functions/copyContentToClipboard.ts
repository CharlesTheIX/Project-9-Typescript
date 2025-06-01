export type CopyToClipboardResponse = {
  error: boolean;
  message: string;
};

export default async (content: string): Promise<CopyToClipboardResponse> => {
  const response = {
    error: true,
    message: "Error copying content to clipboard.",
  };

  try {
    await navigator.clipboard.writeText(content);
    response.error = false;
    response.message = "Copied to clipboard.";
    return response;
  } catch (error: any) {
    return response;
  }
};
