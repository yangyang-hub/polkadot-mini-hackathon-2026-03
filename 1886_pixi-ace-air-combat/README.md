# ✈️ Pixi Ace Air Combat

> **Polkadot Mini Hackathon 2026-03 参赛项目**

一款基于区块链的像素风 2D 飞行射击（STG）游戏 DApp，玩家可在链上注册、升级战机属性、提交游戏分数，并将积分兑换为 PAS 代币奖励。智能合约部署于 Polkadot EVM 兼容测试网，前端通过 MetaMask 与合约交互。

---

## 📖 项目概述与目标

### 项目简介

**Pixi Ace Air Combat** 是一个 Web3 飞行射击游戏，将传统街机飞行游戏与区块链激励机制相结合。玩家通过游戏积累分数，并可在链上兑换代币奖励，战机属性也可通过消耗 ETH/PAS 进行升级强化。

### 核心目标

- 🎮 **链上游戏激励**：游戏分数上链存储，得分高的玩家可将积分兑换为 PAS 代币
- 🛩️ **NFT 属性成长**：玩家可消耗代币升级战机的移速（moveSpeed）、攻速（attackSpeed）、火力（firepower）三项属性
- 🏆 **奖池机制**：合约内置奖池，战机升级费用自动注入奖池，积分兑换从奖池中扣除
- 🔗 **Polkadot 生态集成**：部署于 Polkadot EVM 兼容测试网，探索 Polkadot 生态的 DApp 可能性

### 合约核心逻辑

| 功能 | 说明 |
|------|------|
| `registerPlayer()` | 注册玩家，初始战机属性均为 1 |
| `submitScore(uint256)` | 提交分数（仅保留历史最高分） |
| `redeemScore(uint256)` | 消耗积分（每 10,000 分）兑换 0.001 ETH |
| `upgradePlane(moveSpeed, attackSpeed, firepower)` | 付费升级战机属性，每点花费 0.001 ETH |
| `initializePrizePool()` | 合约所有者初始化奖池（仅调用一次） |

**已部署合约地址（Sepolia）：**  
`AceAirCombatModule#AceAirCombat` → `0x569F1E0e555095F9cAbce74eE085A65F14ABDFfb`

---

## 🗂️ 项目结构

```
1886_pixi-ace-air-combat/
├── contract/               # 智能合约（Hardhat 3 + Solidity）
│   ├── contracts/
│   │   └── AceAirCombat.sol    # 核心游戏合约
│   ├── ignition/
│   │   ├── modules/            # Hardhat Ignition 部署模块
│   │   └── deployments/        # 部署产物
│   ├── test/                   # 合约测试（Solidity + Node.js）
│   ├── scripts/                # 辅助脚本
│   ├── hardhat.config.ts       # Hardhat 配置
│   └── package.json
└── dapp/                   # 前端应用（React + Vite）
    ├── src/                    # 应用源码
    ├── abis/                   # 合约 ABI 文件
    ├── public/                 # 静态资源
    ├── index.html
    ├── vite.config.ts
    └── package.json
```

---

## ⚙️ 环境配置与使用指南

### 前置要求

- [Node.js](https://nodejs.org/) >= 20
- [pnpm](https://pnpm.io/) >= 10.30.3
- [MetaMask](https://metamask.io/) 浏览器插件
- 测试网账户及对应 PAS/ETH 测试代币

---

### 一、合约开发（`contract/`）

#### 1. 安装依赖

```bash
cd contract
pnpm install
```

#### 2. 运行测试

```bash
# 运行全部测试
npx hardhat test

# 仅运行 Solidity 测试（Foundry 兼容）
npx hardhat test solidity

# 仅运行 Node.js 集成测试
npx hardhat test nodejs
```

#### 3. 本地部署

```bash
npx hardhat ignition deploy ignition/modules/AceAirCombat.ts
```

#### 4. 部署到 Polkadot 测试网

配置环境变量（推荐使用 `hardhat-keystore`）：

```bash
# 配置私钥
npx hardhat keystore set POLKADOT_TESTNET_PRIVATE_KEY

# 配置 RPC URL（也可以通过环境变量设置）
# POLKADOT_TESTNET_RPC_URL=
