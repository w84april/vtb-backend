const getGatewayUrl = (rawUrl = '') => {
  if (!rawUrl) return '';
  return rawUrl.replace('ipfs://', 'https://rmrk.mypinata.cloud/ipfs/');
};

module.exports = getGatewayUrl;
