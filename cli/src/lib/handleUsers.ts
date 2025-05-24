import dotenv from "dotenv";
import config from "../config.js";
import { Command } from "commander";
import * as utils from "./utils.js";
import { createSpinner } from "nanospinner";
import * as handleCli from "./handleCli.js";

dotenv.config({ path: "./.env.local" });

type Tool = "create" | "delete" | "get" | "update";

export const add = (cli: Command): void => {
  cli
    .command("users")
    .description(`The user command allows you to interact with the users endpoint of different projects.\n`)
    .usage("<tool>")
    .argument("<tool>", `Tools: get | create | update | delete`)
    .option("-t")
    .action(async (tool: Tool, options: any) => {
      await utils.sleep();
      await handleUsers(tool);
    });
};

export const create = async (option: string): Promise<string> => {
  var body: User;
  var username: string = "";
  var endpoint: string = `${process.env.API_URL}${process.env.API_VERSION}/users/create`;
  const spinner = createSpinner(`Handling create users: ${option}...\n`);

  switch (option) {
    case "custom":
      const email = await handleCli.getInput("email", "Enter the user email:\n");
      username = await handleCli.getInput("username", "Enter the user username:\n");
      const firstName = await handleCli.getInput("firstName", "Enter the user first name:\n");
      const surname = await handleCli.getInput("surname", "Enter the user surname:\n");
      const clerkId = await handleCli.getInput("clerkId", "Enter the user clerkId:\n");
      const role = (await handleCli.getInput("role", "Enter the user role:\n")) as UserRole;
      body = { firstName, surname, email, clerkId, role, username };
      break;
    case "test":
      const randomNumber = utils.getRandomNumber();
      username = `test-user-${randomNumber}`;
      body = {
        username,
        role: "test",
        clerkId: username,
        firstName: `test`,
        surname: `${randomNumber}`,
        email: `${username}@test.com`,
      };
      break;
    default:
      spinner.error({ text: `${option} is not a valid option!\n` });
      process.exit(1);
  }

  spinner.start();
  await utils.sleep(2000);
  const response: ApiResponse = await fetch(endpoint, {
    method: "POSt",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.API_AUTH_TOKEN}`,
    },
    body: JSON.stringify(body),
  }).then((res: any) => res.json());

  const data = JSON.stringify(response.data, null, 2);
  spinner.stop();
  return data;
};

export const get = async (option: string): Promise<string> => {
  var body: any = {};
  var endpoint: string = `${process.env.API_URL}${process.env.API_VERSION}/users`;
  const spinner = createSpinner(`Handling get users: ${option}...\n`);

  switch (option) {
    case "all":
      endpoint += "all";
      break;
    case "by id":
      endpoint += `/by-id`;
      const _id = await handleCli.getInput("id", "Enter the user _id:", "");
      if (!_id) {
        spinner.error({ text: `You must provide a user _id!\n` });
        process.exit(1);
      }
      body._id = _id;
      break;
    case "by email":
      endpoint += `/by-email`;
      const email = await handleCli.getInput("email", "Enter the user email:", "");
      if (!email) {
        spinner.error({ text: `You must provide a user email!\n` });
        process.exit(1);
      }
      body.email = email;
      break;
    case "by clerk id":
      endpoint += `/by-clerk-id`;
      const clerkId = await handleCli.getInput("clerkId", "Enter the user clerkId:", "");
      if (!clerkId) {
        spinner.error({ text: `You must provide a user clerkId!\n` });
        process.exit(1);
      }
      body.clerkId = clerkId;
      break;
    default:
      spinner.error({ text: `${option} is not a valid option!\n` });
      process.exit(1);
  }

  spinner.start();
  await utils.sleep(2000);
  const response: ApiResponse = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.API_AUTH_TOKEN}`,
    },
    body: JSON.stringify(body),
  }).then((res: any) => res.json());
  const data = JSON.stringify(response.data, null, 2);
  spinner.stop();
  return data;
};

export const handleUsers = async (tool: Tool): Promise<void> => {
  var option: string;
  var result: string = "This is not a valid tool!";

  switch (tool) {
    case "get":
      option = await handleCli.getOption("option", "Get Users - Select an option:\n", config.commands.users.options.get);
      result = await get(option);
      break;
    case "create":
      option = await handleCli.getOption("option", "Create User - Select an option:\n", config.commands.users.options.create);
      result = await create(option);
      break;
    case "update":
      // result = await update();
      break;
    case "delete":
      // result = await remove(temp);
      break;
  }

  handleCli.output(result, { color: "#00ffff", italic: true });

  // await utils.sleep(1000);
  // const save = await handleCli.getOption("save", "Would you like to save the result to a JSON file?", ["yes", "no"]);

  // if (save === "yes") {
  //   await utilities.sleep(1000);
  //   const name = await handleCli.getInput("name", "Enter a name for the file:", "result");
  //   await utilities.sleep(1000);
  //   const fileExists = await handleFiles.isValidFilePath(`./output/${name}.json`);

  //   if (fileExists) {
  //     await utilities.sleep(1000);
  //     const overwrite = await handleCli.getOption("overwrite", `The file ${name}.json already exists. Would you like to overwrite it?`, ["yes", "no"]);

  //     if (overwrite === "no") {
  //       handleCli.success("Mongo-users command complete - Goodbye.");
  //     }
  //   }
  //
  // await utilities.sleep(1000);
  // await handleFiles.saveJsonToFile(name, result, true);
  // }

  handleCli.success("users command complete - Goodbye.\n\n");
};

// export const remove = async (template: any): Promise<CliResponse> => {
//   var endpoint: string = template.endpoint;
//   const spinner = createSpinner(`Handling DELETE user...\n`);
//   const id = await handleCli.getInput("id", "Enter the user id:");

//   if (!id) {
//     spinner.error({ text: `You must provide a user id!\n` });
//     process.exit(1);
//   }

//   endpoint += `/${id}`;
//   spinner.start();
//   await utilities.sleep();
//   const { data } = await axios.delete(endpoint);
//   spinner.stop();
//   return data;
// };

// export const update = async (template: any): Promise<CliResponse> => {
//   var endpoint: string = template.endpoint;
//   const spinner = createSpinner(`Handling UPDATE user...\n`);
//   const id = await handleCli.getInput("id", "Enter the user id:", "");
//   const update = await handleCli.getInput("update", "Enter the user update as a stringified JSON object:");

//   if (!id || !utilities.isValidJson(update)) {
//     spinner.error({ text: `You must provide a user id & update as a stringified JSON object!\n` });
//     process.exit(1);
//   }

//   endpoint += `/${id}`;
//   spinner.start();
//   await utilities.sleep();
//   const { data } = await axios.patch(endpoint, JSON.parse(update));
//   spinner.stop();
//   return data;
// };
