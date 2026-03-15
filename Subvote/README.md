# Subvote

当前仓库已被收缩成一个空白基线，用来从 UI 设计开始重新搭建。

## 当前状态

- 前端只保留空白首页与最小布局
- 运行中的 tRPC / Prisma 业务实现已移出
- 项目仍然可以正常 `dev` / `build`
- 已预配置 `wagmi + viem`，链为 `Polkadot Hub TestNet`

## Workspace

当前仓库已切到 `pnpm workspace` 模式：

- `apps/web` 是前端应用
- `contracts/` 是独立 workspace package，当前先作为源码容器
- `apps/subgraph` 是独立 workspace package
- 后续补上 Foundry / Hardhat 后，再把合约编译、测试、部署脚本接进 workspace

## 本地启动

```bash
pnpm install
pnpm dev
```

## 钱包配置

- 当前 `wagmi` 已挂到根布局 provider
- 目标链已配置为 `Polkadot Hub TestNet`
- 当前已启用注入式钱包连接器，并可通过 `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` 启用 WalletConnect
- 本地开发默认 `NEXT_PUBLIC_APP_URL=http://localhost:3000`

## Subgraph 骨架

仓库中的 `apps/subgraph` 已作为 workspace package 接入，用来本地跑 `Graph Node` 和构建 `subgraph`。

常用命令：

```bash
pnpm install
pnpm subgraph:docker:up
pnpm subgraph:codegen
pnpm subgraph:build
pnpm subgraph:deploy-local
```

更具体的配置说明见 `apps/subgraph/README.md`。

等你下一步给出 UI 指令后，再从页面结构、视觉系统和组件开始逐步往上搭。
