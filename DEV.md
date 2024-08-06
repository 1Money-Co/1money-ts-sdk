# Dev

### Install dependencies
```shell
pnpm install
```

### Run project
```shell
pnpm dev
```

### Create a Module
```shell
pnpm new
```

### Build
```shell
pnpm build
```

*Bypass all pre-check before building👇*
```shell
pnpm build -- -n
```

### Release
```shell
pnpm release
```

*Ignoring version of iteration👇*
```shell
pnpm release -- -i
```

*Manual specify version of iteration to 0.3.25👇*
```shell
pnpm release -- -m 0.3.25
```

*Bypass all pre-check before release👇*
```shell
pnpm release -- -n
```

**More powerful customizations is in [omni.config.js](https://github.com/omni-door/cli/blob/master/docs/OMNI.md)**
