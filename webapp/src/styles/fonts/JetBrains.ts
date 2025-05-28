import localFont from "next/font/local";

const JetBrains = localFont({
  display: "swap",
  variable: "--font-JetBrains",
  src: [
    {
      weight: "400",
      style: "normal",
      path: "./JetBrainsMono-Regular.ttf",
    },
    {
      weight: "700",
      style: "normal",
      path: "./JetBrainsMono-Bold.ttf",
    },
    {
      weight: "400",
      style: "italic",
      path: "./JetBrainsMono-Italic.ttf",
    },
  ],
});

export default JetBrains;
