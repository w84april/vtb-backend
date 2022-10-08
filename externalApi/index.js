const fetch = require('node-fetch');
const { response } = require('express');
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

const approve = async address => {
  const res = await fetch('https://hackathon.lsp.team/hk/v1/nft/generate', {
    ...options,
    body: JSON.stringify({
      toPublicKey: address,
      uri: 'ipfs://QmSWb5d3dgnzTsYoR49bXin87NTp3ufYPRH3q5UsCs3nz2',
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
  const res = await fetch(baseUrl + `/nft/${tokenId}`);
  const data = await res.json();
  return data;
};

module.exports = {
  register,
  approve,
  getUserItems,
  getNftInfo,
};
