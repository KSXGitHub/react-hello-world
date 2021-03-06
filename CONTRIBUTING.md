# Contributing

## Our Standard

### Style Guide

[![JavaScript Style Guide](https://cdn.rawgit.com/standard/standard/master/badge.svg)](https://github.com/standard/standard)

Our JavaScript code follows [StandardJS](https://standardjs.com/)

### Git Commit Message

* Use the present tense ("Add feature" not "Added feature")
* Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
* Limit the first line to 72 characters or less
* Reference issues and pull requests liberally
* When only changing documentation, include `[ci skip]` in the commit description

## Development

### Prerequisites

* [Git](https://git-scm.com/) ≥ 2.0.0

* POSIX Tools (bash, sh, cat, ls, etc)
  * Already avaible in POSIX OSes (Linux, macOS, etc)
  * Windows: [Git Bash](https://git-scm.com/), MinGW, [msys2](http://www.msys2.org/), [Cygwin](http://cygwin.com), etc.

* [Node.js](https://nodejs.org/) ≥ 8.0.0
  * Recommends [nvm](https://github.com/creationix/nvm) for POSIX (Linux, macOS, etc)
  * Windows users can use [nvm-windows](https://github.com/coreybutler/nvm-windows) or [chocolatey](https://chocolatey.org/packages/nodejs) as alternative

* A node package manager: NPM or YARN
  * NPM: Already installed along with Node.js
  * YARN: https://yarnpkg.com/

**NOTE:** The command-lines below are BASH syntax, therefore should be executed in a BASH-like shell environment (e.g. `bash`, `zsh`), not in `CMD.exe`. If you're in Windows and want to use Command Prompt, you either need to make your own valid CMD syntax or run `bash.exe` within Command Prompt.

### Setup environment

#### Step 1: Get the code

Use Git to clone this project. Open Terminal or Command Prompt and enter the following commands:

```sh
mkdir react-hello-world && cd react-hello-world
git clone https://github.com/KSXGitHub/react-hello-world.git .
```

#### Step 2: Install necessary dependencies

If you're using NPM

```sh
npm install
```

If you're using YARN

```sh
yarn install
```

### Run, Test, Build, Deploy

**NOTE:** The following commands invoke bash scripts, make sure that you have POSIX tools installed.

**NOTE:** In Windows 10, there might be some errors regarding `bash` and character `\r`. Problably because you are running WSL bash in non-WSL posix environment. When it happens, read [Troubleshooting Guide](#windows-wsl-conflict) to fix it.

#### Build

```sh
npm run build # OR: yarn run build
```

#### Start live server

```sh
npm start # OR: yarn start
```

#### Run overall test

```sh
npm test # OR: yarn test
```

**NOTE:** When an attempt to modify React DOM tree is made, the test should fail because of [snapshots' changes](./test/src/components/__snapshots__). This happens to prevent developers from accidentally modifying DOM structure without explicit intention. To resolve this, you must either [*assert the changes*](#assert-the-changes) by committing snapshots or [*undo the changes*](#undo-the-changes).

#### Run unit tests

```sh
npm run unit-test # OR: yarn run unit-test
```

#### Run and Watch unit tests

```sh
npm run unit-test-watch # OR: yarn run unit-test-watch
```

#### Snapshot testing

When an attempt to modify React DOM tree is made, the test should fail because of [snapshots' changes](./test/src/components/__snapshots__). This happens to prevent developers from accidentally modifying DOM structure without explicit intention. To resolve this, you must either [*assert the changes*](#assert-the-changes) by committing snapshots or [*undo the changes*](#undo-the-changes).

##### Assert the changes

When you explicitly intend to modify React DOM structure and the changes of snapshots are as expected, you must assert the changes:

```sh
# Step 1: Double check snapshots without modifying snapshot files
npm run jest # OR: yarn run jest

# Step 2: Update snapshot files
npm run jest -- --updateSnapshot # OR: yarn run jest -- --updateSnapshot

# Step 3: Commit snapshots' changes
git add <Snapshot Files>
git commit -m '<Commit Message>'
```

##### Undo the changes

When you do not want to modify React DOM structure but test fails due to snapshots' changes, that means DOM tree is accidentally modified, you must undo it. You can either undo the changes manually or discard all changes using `git clean`.

**Undo the changes manually:** You made many important changes that has yet to commit, you want to undo the unwanted snapshots' changes without discard the whole hard work. The only way to do it is to modify your code until the test no longer fail.

**Discard all changes using `git clean`:** This is the quickiest way to undo unwanted changes. Run `git help clean` to know how. Be careful to not losing your important but yet-to-commit hard work.
  * `git clean --dry-run` is absolutely safe, use it double-check the decision about to be made
  * `git clean --interactive` to make decision for every file individually
  * `git clean --force`: You must be absolutely certain that you won't regret after this
  * [VS Code](https://code.visualstudio.com/) has a feature called 'Discard All Changes'

## Project structure

```
→ /src: contains content of website
  → /src/components: contains custom ReactJS components
  → /src/client: contains client-side code
  → /src/server: contains server-side code

→ /test: contains unit-test modules
  → /test/{lib,sh,src}: contains unit-test for each lib, sh, src respectively
  → /test/**/__lib__: contains helper lib for unit-test
  → /test/**/__data__: contains preset data for unit-test
  → /test/**/__snapshots__: contains generated snapshot files

→ /sh: contains script files to be called by npm/yarn
→ /jest: contains Jest's configuration files
→ /webpack: contains Webpack's configuration files
```

## Tips and Tricks

### Use hot-loading servers without Internet connection

For some reasons, `webpack-dev-server` requires Internet connection in order to work (even though the users do not wish to broadcast their website during development), which makes no sense.

For this reason, I find a way around this: Let's just use [`live-server`](https://www.npmjs.com/package/live-server) — a server runner that watches files' changes and reload the website automatically!

**INSTALLATION:** `live-server` should've been installed as an optional dependency, if it's not then install it:

```sh
npm install --save-optional live-server # OR: yarn add --optional live-server
```

**USE CASE 1:** *Use `live-server` to serve webpack build results (`dist` folder)*

You need to open at least two terminal sessions: One for `live-server`, one for `webpack`

* In `live-server`'s terminal, run `npm run serve-dist` (or `yarn run serve-dist`)

* In `webpack`'s terminal, run `npm run webpack-watch` (or `yarn run webpack-watch`)

**USE CASE 2:** *Use `live-server` to display coverage reports (`coverage/lcov-report` folder)*

You need to open at least two terminal sessions: One for `live-server`, one for `jest`

* In `live-server`'s terminal, run `npm run serve-coverage` (or `yarn run serve-coverage`)

* In `jest`'s terminal, `npm run unit-test-watch` (or `yarn run unit-test-watch`)

**NOTE:** Aside from `live-server`, you can also use [`live-server`](https://atom.io/packages/atom-live-server) or [`live-server`](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer), they're all awesome!

## Troubleshooting

### Windows: WSL conflict

If you're using both non-WSL posix tools and WSL in Windows 10, you may encounter some troubles of executing bash in non-WSL posix environment. There're two different ways to fix this.

#### Clone, edit, build project within WSL environment

Just like you do it in a genuine UNIX/Linux environment. There should be no troubles regarding bash.

#### Modify `PATH` environment variable

Place directory `bin` of your POSIX tool before that of WSL.

Open your **non-WSL** bash and enter the following:

```sh
export PATH="$(dirname "$0"):$PATH"
```

It is recommended to put the code above into your `.bashrc` file.

### Error: addMembership ENODEV

When you're trying to run `npm start`/`yarn start`/`webpack-dev-server` without Internet connection, you're most likely encounter this error. See [this workaround](#use-hot-loading-servers-without-internet-connection) to overcome this.
