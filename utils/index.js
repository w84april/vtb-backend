const getGatewayUrl = (rawUrl = '') => {
  if (!rawUrl) return '';
  return rawUrl.replace('ipfs://', 'https://gateway.pinata.cloud/ipfs/');
};

module.exports = getGatewayUrl;
