import localFont from "next/font/local";

const JetBrains = localFont({
  display: "swap",
  variable: "--font-JetBrains",
 src: [
    // Regular - weight 400, normal
    {
      weight: "400",
      style: "normal",
      path: "./JetBrainsMono-Regular.woff2",
    },
    {
      weight: "400",
      style: "normal",
      path: "./JetBrainsMono-Regular.woff",
    },
    {
      weight: "400",
      style: "normal",
      path: "./JetBrainsMono-Regular.ttf",
    },
    // Bold - weight 700, normal
    {
      weight: "700",
      style: "normal",
      path: "./JetBrainsMono-Bold.woff2",
    },
    {
      weight: "700",
      style: "normal",
      path: "./JetBrainsMono-Bold.woff",
    },
    {
      weight: "700",
      style: "normal",
      path: "./JetBrainsMono-Bold.ttf",
    },
    // Italic - weight 400, italic
    {
      weight: "400",
      style: "italic",
      path: "./JetBrainsMono-Italic.woff2",
    },
    {
      weight: "400",
      style: "italic",
      path: "./JetBrainsMono-Italic.woff",
    },
    {
      weight: "400",
      style: "italic",
      path: "./JetBrainsMono-Italic.ttf",
    },
  ],
});

export default JetBrains;
