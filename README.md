# 🌀 Portal

## A project for switching between machines when driving remote pairing.

Usage:
Assumsing both pairs have done `git duet <person1> <person2>`

- `portal push`: pushes local changes to a remote branch based on your git-duet pairing (ex. portal-pa-lt)

- `portal pull`: pulls the changes at the git-duet based branch name and deletes the remote branch
  
### Assumes
- You have git installed
- Your projcet is using git duet: https://github.com/git-duet/git-duet
- Node.js
  
### Installation
`git clone https://github.com/ericTsiliacos/portal.git && cd portal && npm install -g ./ && cd -`
