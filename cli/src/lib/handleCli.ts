import chalk from "chalk";
import inquirer from "inquirer";

export const error = (message: string, exit?: boolean, ...args: any[]): void => {
  output(`${message}`, { color: "#ff0000" }, ...args);
  if (exit) process.exit(1);
};

export const getInput = async (name: string, message: string, defaultValue: string = "Anonymous"): Promise<string> => {
  try {
    const data = await inquirer.prompt({
      type: "input",
      name,
      message,
      default() {
        return defaultValue;
      },
    });
    return data[name];
  } catch (error: any) {
    error(error.message, true, error);
    return "";
  }
};

export const getOption = async (name: string, message: string, choices: string[]): Promise<string> => {
  try {
    const data = await inquirer.prompt({
      type: "list",
      name,
      message,
      choices,
    });
    return data[name];
  } catch (error: any) {
    error(error.message, true, error);
    return "";
  }
};

export const success = (message: string, exit?: boolean, ...args: any[]): void => {
  output(`${message}`, { color: "#00ff00" }, ...args);

  if (exit) process.exit(0);
};

export const output = (message: string, config: any, ...args: any[]): void => {
  const { color, background, bold, underline, italic } = config;

  if (color) {
    if (bold && underline && italic && background) {
      console.log(chalk.bold.underline.italic.hex(color || "").bgHex(background || "")(message), ...args);
    } else if (bold && underline && italic) {
      console.log(chalk.bold.underline.italic.hex(color || "")(message), ...args);
    } else if (bold && underline && background) {
      console.log(chalk.bold.underline.hex(color || "").bgHex(background || "")(message), ...args);
    } else if (bold && underline) {
      console.log(chalk.bold.underline.hex(color || "")(message), ...args);
    } else if (bold && italic && background) {
      console.log(chalk.bold.italic.hex(color || "")(message), ...args);
    } else if (bold && italic) {
      console.log(chalk.bold.italic.hex(color || "").bgHex(background || "")(message), ...args);
    } else if (underline && italic && background) {
      console.log(chalk.underline.italic.hex(color || "")(message), ...args);
    } else if (underline && italic) {
      console.log(chalk.underline.italic.hex(color || "").bgHex(background || "")(message), ...args);
    } else if (bold && background) {
      console.log(chalk.bold.hex(color || "").bgHex(background || "")(message), ...args);
    } else if (bold) {
      console.log(chalk.bold.hex(color || "")(message), ...args);
    } else if (underline && background) {
      console.log(chalk.underline.hex(color || "").bgHex(background || "")(message), ...args);
    } else if (underline) {
      console.log(chalk.underline.hex(color || "")(message), ...args);
    } else if (italic && background) {
      console.log(chalk.italic.hex(color || "").bgHex(background || "")(message), ...args);
    } else if (italic) {
      console.log(chalk.italic.hex(color || "")(message), ...args);
    } else if (background) {
      console.log(chalk.hex(color || "").bgHex(background || "")(message), ...args);
    } else {
      console.log(chalk.hex(color || "")(message), ...args);
    }
  } else {
    console.log(message, ...args);
  }
};
