const fetch = require('node-fetch');
const { response } = require('express');
const baseUrl = "https://hackathon.lsp.team/hk/v1";

const options = {
    method: 'POST'
};

const register = async () => {
    const response = await fetch(baseUrl + '/wallets/new', options);
    const data =  await response.text();
    return JSON.parse(data);
}

module.exports = {
    register
}