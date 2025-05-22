#!/usr/bin/env node

import dotenv from "dotenv";
import inquirer from "inquirer";
import exitCli from "./lib/exitCli";
import showHelp from "./lib/showHelp";

dotenv.config({ path: "./.env.local" });

type CommandHandler = () => Promise<void>;

const commands: Record<string, CommandHandler> = {
  help: showHelp,
  exit: exitCli,
};

const startCli = async (): Promise<void> => {
  console.log(`Greeting...\n`);

  while (true) {
    const { command } = await inquirer.prompt([
      {
        type: 'list',
        name: 'command',
        message: 'Choose a command',
        choices: Object.keys(commands)
      }
    ]);

    await commands[command]();
  }
};

startCli();