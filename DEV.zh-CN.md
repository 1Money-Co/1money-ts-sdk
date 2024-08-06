# 开发

### 安装依赖
```shell
pnpm install
```

### 启动项目
```shell
pnpm dev
```

### 新建模块
```shell
pnpm new
```

### 构建
```shell
pnpm build
```

*构建项目时绕过所有检查👇*
```shell
pnpm build -- -n
```

### 发布
```shell
pnpm release
```

*发布项目时忽略版本迭代👇*
```shell
pnpm release -- -i
```

*发布项目时指定迭代的版本为 0.3.25 👇*
```shell
pnpm release -- -m 0.3.25
```

*发布项目时绕过所有检查👇*
```shell
pnpm release -- -n
```

**更多配置项请在 [omni.config.js](https://github.com/omni-door/cli/blob/master/docs/OMNI.zh-CN.md) 中编辑**
