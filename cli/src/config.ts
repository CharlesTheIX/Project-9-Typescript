export default {
  version: "0.0.1",
  description:
    "\nWelcome to the countries CLI tool!\nThis tool has a set of commands & each command has a set of options.\nThese options can be seen by typing the command followed by --help.\n\nHere are the available commands:\n\nusers - Interact with the user endpoints",
  usage: "<command> <tool> [options]",
  commands: {
    users: {
      tools: ["get", "create", "update", "delete"],
      options: {
        get: ["all", "by id", "by email", "by clerk id"],
        create: ["custom", "test"],
      },
    },
  },
};
