const fetch = require('node-fetch');
const baseUrl = 'https://hackathon.lsp.team/hk/v1';

const options = {
  method: 'POST',
  headers: {
    Accept: 'application.json',
    'Content-Type': 'application/json',
  },
};

const register = async () => {
  const res = await fetch(baseUrl + '/wallets/new', options);
  const data = await res.json();
  return data;
};

const approve = async (address, metadata) => {
  console.log(address, metadata);
  const res = await fetch('https://hackathon.lsp.team/hk/v1/nft/generate', {
    ...options,
    body: JSON.stringify({
      toPublicKey: address,
      uri: `ipfs://${metadata}`,
      nftCount: 1,
    }),
  });
  const data = await res.json();
  return data;
};

const getUserItems = async address => {
  const res = await fetch(baseUrl + `/wallets/${address}/nft/balance`);
  const data = await res.json();
  return data;
};

const getNftInfo = async tokenId => {
  if (!tokenId) {
    return;
  }
  const res = await fetch(baseUrl + `/nft/${tokenId}`);
  const data = await res.json();
  return data;
};

const sendNft = async (fromPrivateKey, toPublicKey, tokenId) => {
  const res = await fetch(baseUrl + `/transfers/nft`, {
    ...options,
    body: JSON.stringify({
      fromPrivateKey,
      toPublicKey,
      tokenId,
    }),
  });
  const data = await res.json();
  return data;
};

const getBalance = async address => {
  const res = await fetch(baseUrl + `/wallet/${address}/balance`);
  const data = await res.json();
  return data;
};

module.exports = {
  register,
  approve,
  getUserItems,
  getNftInfo,
  sendNft,
  getBalance,
};
