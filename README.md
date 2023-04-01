# Smart Contract Audit Guide

## Depoloy contracts
```javascript
npx hardhat run scripts/deploy.ts --network localhost
```

## Test commands
```javascript
- npx hardhat test test\BankSavings.ts
- npx hardhat test test\ReentrancyAttackOnBankSavings.ts
```

### Articles

1. https://consensys.github.io/smart-contract-best-practices/attacks/
