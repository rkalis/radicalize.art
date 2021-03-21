/* eslint no-use-before-define: "warn" */
const fs = require("fs");
const chalk = require("chalk");
const { config, ethers } = require("hardhat");
const { utils } = require("ethers");
const R = require("ramda");
const ipfsAPI = require('ipfs-http-client');
const ipfs = ipfsAPI({host: 'ipfs.infura.io', port: '5001', protocol: 'https' })

const delayMS = 10 //sometimes xDAI needs a 6000ms break lol 😅

const main = async () => {

  // ADDRESS TO MINT TO:
  const toAddress = "0xD75b0609ed51307E13bae0F9394b5f63A7f8b6A1"

  console.log("\n\n 🎫 Minting to "+toAddress+"...\n");

  const radicalManager = await ethers.getContractAt('RadicalManager', fs.readFileSync("./artifacts/RadicalManager.address").toString())


  const item1 = {
    "name": "The Glassmakers Muse",
    "description": "The Glassmakers Muse (always for sale, 5% patronage)",
    "external_url": "https://moncur.ch/",
    "image": "https://images.squarespace-cdn.com/content/v1/575fa285e321408871d8ed19/1566204913834-DK30Q6JN7EOZ16W4XOTD/ke17ZwdGBToddI8pDm48kMlKPs01Yyk3gRbEhpRXPJEUqsxRUqqbr1mOJYKfIPR7LoDQ9mXPOjoJoqy81S2I8N_N4V1vUb5AoIIIbLZhVYxCRW4BPu10St3TBAUQYVKc1zcjBzHC3OSERMj2jxBIFNl7r81kL8gT3dQF0e1kxZus2hq1yT6MeFIKjdSTZVvk/Moncur+-+The+Glassmakers+Muse+-+140x140cm+acrylic.jpg?format=2500w",
    "attributes": [
       {
         "trait_type": "artist",
         "value": "Moncur"
       }
    ]
  };
  const item1p = {
    "name": "5% Patronage on The Glassmakers Muse",
    "description": "Pay to the bearer on demand 5%.",
    "attributes": [
       {
         "trait_type": "Patronage Rate",
         "value": "5%"
       }
    ]
  }
  console.log("Uploading item1 radical ..")
  const i1r = await ipfs.add(JSON.stringify(item1))
  console.log("Uploading item1 patronage...")
  const i1p = await ipfs.add(JSON.stringify(item1p))
  console.log("`Minting item1");
  await radicalManager.mint(toAddress, 1, 50, i1p.path, i1r.path, { gasLimit:4000000 })


  await sleep(delayMS)
  const item2 = {
    "name": "Glitterati",
    "description": "Glitterati (always for sale, 10% patronage)",
    "external_url": "https://moncur.ch/",
    "image": "https://images.squarespace-cdn.com/content/v1/575fa285e321408871d8ed19/1594712586277-Z1QRKOEJS3XRVDI87ZLJ/ke17ZwdGBToddI8pDm48kKB_fR79n880xOS-N5lKc8VZw-zPPgdn4jUwVcJE1ZvWQUxwkmyExglNqGp0IvTJZUJFbgE-7XRK3dMEBRBhUpxpEURhgSBEh9ILe0HKIG3COQlfzgXmXcH-iBsIE3okqFssv15w4XRMsOjQQp_CJx4/IMG_20200225_222147.jpg?format=2500w",
    "attributes": [
       {
         "trait_type": "artist",
         "value": "Moncur"
       }
    ]
  };
  const item2p = {
    "name": "5% Patronage on Glitterati",
    "description": "Pay to the bearer on demand 5%.",
    "attributes": [
       {
         "trait_type": "Patronage Rate",
         "value": "10%"
       }
    ]
  }
  console.log("Uploading item2 radical ..")
  const i2r = await ipfs.add(JSON.stringify(item2))
  console.log("Uploading item2 patronage...")
  const i2p = await ipfs.add(JSON.stringify(item2p))
  console.log("`Minting item2");
  await radicalManager.mint(toAddress, 1, 100, i2p.path, i2r.path, { gasLimit:4000000 })
  

  // const zebra = {
  //   "description": "What is it so worried about?",
  //   "external_url": "https://austingriffith.com/portfolio/paintings/",// <-- this can link to a page for the specific file too
  //   "image": "https://austingriffith.com/images/paintings/zebra.jpg",
  //   "name": "Zebra",
  //   "attributes": [
  //      {
  //        "trait_type": "BackgroundColor",
  //        "value": "blue"
  //      },
  //      {
  //        "trait_type": "Eyes",
  //        "value": "googly"
  //      },
  //      {
  //        "trait_type": "Stamina",
  //        "value": 38
  //      }
  //   ]
  // }
  // console.log("Uploading zebra...")
  // const uploadedzebra = await ipfs.add(JSON.stringify(zebra))

  // console.log("Minting zebra with IPFS hash ("+uploadedzebra.path+")")
  // await radicalManager.mint(toAddress,uploadedzebra.path,{gasLimit:400000})



  // await sleep(delayMS)


  // const rhino = {
  //   "description": "What a horn!",
  //   "external_url": "https://austingriffith.com/portfolio/paintings/",// <-- this can link to a page for the specific file too
  //   "image": "https://austingriffith.com/images/paintings/rhino.jpg",
  //   "name": "Rhino",
  //   "attributes": [
  //      {
  //        "trait_type": "BackgroundColor",
  //        "value": "pink"
  //      },
  //      {
  //        "trait_type": "Eyes",
  //        "value": "googly"
  //      },
  //      {
  //        "trait_type": "Stamina",
  //        "value": 22
  //      }
  //   ]
  // }
  // console.log("Uploading rhino...")
  // const uploadedrhino = await ipfs.add(JSON.stringify(rhino))

  // console.log("Minting rhino with IPFS hash ("+uploadedrhino.path+")")
  // await radicalManager.mint(toAddress,uploadedrhino.path,{gasLimit:400000})



  // await sleep(delayMS)


  // const fish = {
  //   "description": "Is that an underbyte?",
  //   "external_url": "https://austingriffith.com/portfolio/paintings/",// <-- this can link to a page for the specific file too
  //   "image": "https://austingriffith.com/images/paintings/fish.jpg",
  //   "name": "Fish",
  //   "attributes": [
  //      {
  //        "trait_type": "BackgroundColor",
  //        "value": "blue"
  //      },
  //      {
  //        "trait_type": "Eyes",
  //        "value": "googly"
  //      },
  //      {
  //        "trait_type": "Stamina",
  //        "value": 15
  //      }
  //   ]
  // }
  // console.log("Uploading fish...")
  // const uploadedfish = await ipfs.add(JSON.stringify(fish))

  // console.log("Minting fish with IPFS hash ("+uploadedfish.path+")")
  // await radicalManager.mint(toAddress,uploadedfish.path,{gasLimit:400000})



  // await sleep(delayMS)


  // const flamingo = {
  //   "description": "So delicate.",
  //   "external_url": "https://austingriffith.com/portfolio/paintings/",// <-- this can link to a page for the specific file too
  //   "image": "https://austingriffith.com/images/paintings/flamingo.jpg",
  //   "name": "Flamingo",
  //   "attributes": [
  //      {
  //        "trait_type": "BackgroundColor",
  //        "value": "black"
  //      },
  //      {
  //        "trait_type": "Eyes",
  //        "value": "googly"
  //      },
  //      {
  //        "trait_type": "Stamina",
  //        "value": 6
  //      }
  //   ]
  // }
  // console.log("Uploading flamingo...")
  // const uploadedflamingo = await ipfs.add(JSON.stringify(flamingo))

  // console.log("Minting flamingo with IPFS hash ("+uploadedflamingo.path+")")
  // await radicalManager.mint(toAddress,uploadedflamingo.path,{gasLimit:400000})





  // const godzilla = {
  //   "description": "Raaaar!",
  //   "external_url": "https://austingriffith.com/portfolio/paintings/",// <-- this can link to a page for the specific file too
  //   "image": "https://austingriffith.com/images/paintings/godzilla.jpg",
  //   "name": "Godzilla",
  //   "attributes": [
  //      {
  //        "trait_type": "BackgroundColor",
  //        "value": "orange"
  //      },
  //      {
  //        "trait_type": "Eyes",
  //        "value": "googly"
  //      },
  //      {
  //        "trait_type": "Stamina",
  //        "value": 99
  //      }
  //   ]
  // }
  // console.log("Uploading godzilla...")
  // const uploadedgodzilla = await ipfs.add(JSON.stringify(godzilla))

  // console.log("Minting godzilla with IPFS hash ("+uploadedgodzilla.path+")")
  // await radicalManager.mint(toAddress,uploadedgodzilla.path,{gasLimit:400000})




  // await sleep(delayMS)

  // console.log("Transferring Ownership of RadicalManager to "+toAddress+"...")

  // await radicalManager.transferOwnership(toAddress)

  // await sleep(delayMS)

  /*


  console.log("Minting zebra...")
  await radicalManager.mint("0xD75b0609ed51307E13bae0F9394b5f63A7f8b6A1","zebra.jpg")

  */


  //const secondContract = await deploy("SecondContract")

  // const exampleToken = await deploy("ExampleToken")
  // const examplePriceOracle = await deploy("ExamplePriceOracle")
  // const smartContractWallet = await deploy("SmartContractWallet",[exampleToken.address,examplePriceOracle.address])



  /*
  //If you want to send value to an address from the deployer
  const deployerWallet = ethers.provider.getSigner()
  await deployerWallet.sendTransaction({
    to: "0x34aA3F359A9D614239015126635CE7732c18fDF3",
    value: ethers.utils.parseEther("0.001")
  })
  */


  /*
  //If you want to send some ETH to a contract on deploy (make your constructor payable!)
  const yourContract = await deploy("YourContract", [], {
  value: ethers.utils.parseEther("0.05")
  });
  */


  /*
  //If you want to link a library into your contract:
  // reference: https://github.com/austintgriffith/scaffold-eth/blob/using-libraries-example/packages/hardhat/scripts/deploy.js#L19
  const yourContract = await deploy("YourContract", [], {}, {
   LibraryName: **LibraryAddress**
  });
  */

};

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
