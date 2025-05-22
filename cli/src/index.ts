#!/usr/bin/env node

import { Command } from "commander";
import dotenv from "dotenv";

dotenv.config({ path: "./.env.local" });

const cli = new Command();

cli
.name("name")
.version("0.0.1")
.description("description");

cli.parse(process.argv);
