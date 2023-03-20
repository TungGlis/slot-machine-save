# vbWebEngine-project

This boilerplate should help get you started developing with vbWebEngine and Vue 3 in Vite.

### Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.VSCode-typescript-vue-plugin).

### Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

### Git Setup

To clone the repo make sure to include submodule by adding flag `--recursive` 

```sh
git init -b main
# the branch we are currently using is "v7_wip"
git submodule add -b v7_wip https://github.com/GlisGames/vbWebEngine.git src/vbWebEngine
```

### Project Setup

If this is **not the first time** you setup project and you already have `node.js`, `pnpm`, you can simply run command:

```sh
pnpm install
```

Then everything should work.

If this is the **first time**, install `pnpm.`

```
npm install -g pnpm
```

### Utilities for Development

VSCode launch configuration:

- `Development`: Launch Vite DevServer and open the browser for debugging.
- `Python: prod-preview`: Host the `/dist` folder at port `4173` after you build the project, using simple python HTTP server. Then you can open it on your browser to test.

Node.js commands:

- `pnpm run build`: Build the project to `/dist` folder.
- `pnpm run type-check`: When you launch VSCode `Development`, it does type check too.
- `pnpm run lint`: Show linting issues but don't fix them.
- `pnpm run lint-fix`: Auto fix some linting issues (primarily about imports) then show the rest.

Dev tools:

- `gen-assets-list.py`: Generate `assets/game-dev/assets-list.json`
- `pnpm [exec] dpdm [-T] xxx.ts`: Analyze circular dependency.