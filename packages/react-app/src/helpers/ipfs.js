import fetch from 'isomorphic-fetch';
// https://www.npmjs.com/package/ipfs-http-client
const ipfsAPI = require('ipfs-http-client');
const ipfs = ipfsAPI({host: 'ipfs.infura.io', port: '5001', protocol: 'https' })
const { BufferList } = require('bl')


//helper function to "Get" from IPFS
// you usually go content.toString() after this...
export const getFromIPFS = async hashToGet => {
  for await (const file of ipfs.get(hashToGet)) {
    console.log(file.path)
    if (!file.content) continue;
    const content = new BufferList()
    for await (const chunk of file.content) {
      content.append(chunk)
    }
    console.log(content)
    return content
  }
}

export const getFromIpfsGateway = async hashToGet => {
  const response = await fetch(`https://ipfs.io/ipfs/${hashToGet}`);

  return response.json();
};
