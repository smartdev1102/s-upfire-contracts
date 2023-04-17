const { ethers } = require('hardhat');
const fs = require('fs');

async function main() {
    const [deployer] = await ethers.getSigners();

    console.log('Deploying contracts with the account:', deployer.address);
    const MyContract = await ethers.getContractFactory('FarmGenerator');
    const chainId = await ethers.provider.getNetwork().then(network => network.chainId);
    console.log("Chain ID:", chainId);

    var feeAmount = "0.1";
    var fFactoryAddress;
    var swapFactory;

    if (chainId === 97) {
        fFactoryAddress = "0xBF74130A6a13fC59be3fE6C4b342bDE2836ce15B";
        swapFactory = "0xB7926C0430Afb07AA7DEfDE6DA862aE0Bde767bc";
    } else if (chainId === 43114) {
        feeAmount = "5";
        fFactoryAddress = "0x5997c902700D4a35456ee6BEC69699E2F57486F1";
        swapFactory = "0xefa94DE7a4656D787667C749f7E1223D71E9FD88";
    } else if (chainId === 56) {
        fFactoryAddress = "0xD2fc6F5cFAbd74E0db78BE3449C6cf1059f863DF";
        swapFactory = "0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73";
    }


    const feeAmountHex = ethers.utils.parseEther(feeAmount);
    const myContract = await MyContract.deploy(fFactoryAddress, swapFactory, "0x1F98431c8aD98523631AE4a59f267346ea31F984", "0x32b6B87B4d0dd25a8028E363fA99C1d39D228873", feeAmountHex);

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
