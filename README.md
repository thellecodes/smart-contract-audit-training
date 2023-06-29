# Smart Contract Audits

### Gas Optimizations

1. https://consensys.github.io/smart-contract-best-practices/attacks/
2. https://trustchain.medium.com/all-solidity-extreme-gas-optimization-methods-x30-64a3ea113cca

### Storage management

1. https://docs.soliditylang.org/en/v0.8.13/internals/layout_in_storage.html

### Changing transaction order

- https://trustchain.medium.com/reversing-and-debugging-evm-smart-contracts-392fdadef32d

### Vulnerabilities

- https://medium.com/coinmonks/most-common-smart-contracts-vulnerabilities-306c1c27eea2

### tidBits

- Use the View or Pure modifier on External Functions

  - ```javascript
        function getBalance() external view {
          return balance;
        }
    ```

- Use underscore naming convention

  - ```javascript
    optimized(); - costs more gase
    not_optimized(); - saves you gas
    ```

- 32 byte slots come first

  - uint256 b; //Slot 0 (32 bytes)
  - uint128 a; //Slot 1 (16 bytes)
  - uint128 c; //Slot 1 (16 bytes)

- Use the optimizer when using remix

  - saves you at least 200 gas

- use mapping instead of array(not iterable)

  - ```javascript
      uint[] key
      key[1] = value
    ```

- Use require instead of assert
- Make fewer external calls
- Look for dead code (saves a variable amount of gas on deployment)

  - ```javascript
    require(a == 0);

    if (a == 0) {
      return true;
    } else {
      return false;
    }
    ```

- Use immutable for storage variables
  uint256 public immutable a
- Store data in events
- Use static size types (like bool, uint256, bytes5)
- Don't reassign a storage variable twice
- Use calldata instead of memory in function parameters
- Use Indexed events
- Do not use view on functions that modifies the state. They're pure functions
- Use i++ instead of i = i+1
- Use uint256 instead of uintXX on storage
- Create a custom error

  - ```javascript
        errorr e(string test)

        revert e('error')
    ```

- Exchanging 2 variables by using a tuple (a, b) = (b, a) (saves 5 gas on every call)
- Use left shift instead of multiplication >> (150 saved gas)

- Using unchecked (gas saved: 150/operation)
- Use external instead of public

## Look out for an audit

- https://www.pinksale.finance/
