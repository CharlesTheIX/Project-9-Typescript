#!/usr/bin/env node

import config from "./config.js";
import { Command } from "commander";
import * as users from "./lib/handleUsers.js";
import * as handleCli from "./lib/handleCli.js";

const cli = new Command();
cli
  .description(`${config.description}`)
  .version(`${config.version}`)
  .usage(`${config.usage}`)
  .action(async () => {
    handleCli.output(config.description, { color: "#00ffff", italic: true });
    process.exit(0);
  });

users.add(cli);

cli.parse(process.argv);
