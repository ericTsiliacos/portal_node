#!/usr/bin/env node

import program from "commander";
import git from "simple-git";
import ora from "ora";

program.command("push").action(async () => {
  try {
    const throbber = ora("Coming your way...").start();

    const branch = await fetchBranch();

    git()
      .checkoutLocalBranch(branch)
      .add("./*")
      .commit("WIP")
      .push(["origin", "head"])
      .checkout("-")
      .branch(["-D", branch], () => {
        throbber.stop();
        console.log("✨ Sent!");
      });
  } catch (e) {
    console.log(e);
  }
});

program.command("pull").action(async () => {
  try {
    const throbber = ora("Coming your way...").start();
    const branch = await fetchBranch();
    git()
      .checkout(branch)
      .reset(["HEAD^"])
      .checkout("-")
      .branch(["-D", branch])
      .push(["origin", "--delete", branch], () => {
        throbber.stop();
        console.log("✨ Got it!");
      });
  } catch (e) {
    console.log(e);
  }
});

program.parse(process.argv);

async function fetchBranch() {
  const authors = await Promise.all([
    rawGit(["config", "--get", "duet.env.git-author-initials"]),
    rawGit(["config", "--get", "duet.env.git-committer-initials"]),
  ]);

  return authors
    .map(author => author.replace(/\n/g, ""))
    .sort((a, b) => a.localeCompare(b))
    .join("-")
    .replace(/^/, "portal-");
}

function rawGit(command) {
  return new Promise((resolve, reject) => {
    git().raw(command, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}
