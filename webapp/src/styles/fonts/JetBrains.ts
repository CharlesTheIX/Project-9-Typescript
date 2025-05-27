import localFont from "next/font/local";

const JetBrains = localFont({
  src: [
    {
      path: "./JetBrainsMono-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./JetBrainsMono-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./JetBrainsMono-Italic.ttf",
      weight: "400",
      style: "italic",
    },
  ],
  variable: "--font-JetBrains",
  display: "swap",
});

export default JetBrains;
