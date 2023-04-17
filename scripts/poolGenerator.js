const { ethers } = require('hardhat');
const fs = require('fs');

async function main() {
    const [deployer] = await ethers.getSigners();

    console.log('Deploying contracts with the account:', deployer.address);
    const MyContract = await ethers.getContractFactory('PoolGenerator');
    const chainId = await ethers.provider.getNetwork().then(network => network.chainId);
    console.log("Chain ID:", chainId);

    var feeAmount = "0.1";
    var pFactoryAddress;

    if (chainId === 97) {
        pFactoryAddress = "0xCBC8fEb8aD4aa4D1caaDDE45CBA24FB70fb219a9";
    } else if (chainId === 43114) {
        feeAmount = "5";
        pFactoryAddress = "0x5997c902700D4a35456ee6BEC69699E2F57486F1";
    } else if (chainId === 56) {
        pFactoryAddress = "0xD2fc6F5cFAbd74E0db78BE3449C6cf1059f863DF";
    }

    const feeAmountHex = ethers.utils.parseEther(feeAmount);
    const myContract = await MyContract.deploy(pFactoryAddress, "0x32b6B87B4d0dd25a8028E363fA99C1d39D228873", feeAmountHex);

    console.log('MyContract deployed to:', myContract.address);

    const data = {
        address: myContract.address
    };

    fs.writeFileSync('contract-address.json', JSON.stringify(data));
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
