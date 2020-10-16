#!/usr/bin/env node

import program from "commander";
import git from "simple-git";

program.command("push").action(async () => {
  console.log("🌀 Coming your way...");
  try {
    const branch = await fetchBranch();

    git()
      .checkoutLocalBranch(branch)
      .add("./*")
      .commit("WIP")
      .push(["origin", "head"], () => {
        console.log("✨ Sent!");
      })
      .checkout("-")
      .branch(["-D", branch]);
  } catch (e) {
    console.log(e);
  }
});

program.command("pull").action(async () => {
  console.log("🌀 I see you...");
  try {
    const branch = await fetchBranch();
    git()
      .checkout(branch)
      .reset(["HEAD^"])
      .checkout("-")
      .branch(["-D", branch])
      .push(["origin", "--delete", branch], () => console.log("✨ Got it!"));
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
