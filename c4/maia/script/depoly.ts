import { ethers } from 'hardhat';

const main = async () => {
    const [, ...accounts] = await ethers.getSigners();

    
    const vMaia= await ethers.getContractFactory("vMaia");
  
    const [deployer] = await ethers.getSigners();
  };
  
  //localhost addresses
  
  main()
    .then(() => process.exit(0))
    .catch((error) => console.log(error));