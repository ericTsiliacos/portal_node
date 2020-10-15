#!/usr/bin/env node

import program from "commander";

program.command("push").action(function () {
  console.log("pushing to temporary branch");
});

program.parse(process.argv);
