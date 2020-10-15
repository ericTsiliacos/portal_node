#!/usr/bin/env node

import program from "commander";
import git from "simple-git";
import { v4 as uuidv4 } from "uuid";
import process from "child_process";

program.command("push").action(() => {
  const branch = uuidv4();
  console.log("pushing to temporary branch");
  git()
    .checkoutLocalBranch(branch)
    .add("./*")
    .commit("WIP")
    .push(["origin", "head"], () => {
      copy(branch);
      console.log("done");
    })
    .checkout("-");
});

program.command("pull <branch>").action(branch => {
  console.log("pulling temporary branch");
  git()
    .checkout(branch)
    .reset(["HEAD^"])
    .checkout("-")
    .branch(["-d", branch])
    .push(["origin", "--delete", branch], () => console.log("done"));
});

program.parse(process.argv);

function copy(data) {
  var proc = process.spawn("pbcopy");
  proc.stdin.write(data);
  proc.stdin.end();
}
