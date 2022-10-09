const pinataSDK = require('@pinata/sdk');
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

const pinata = pinataSDK(process.env.PINATA_API_KEY, process.env.PINATA_SECRET);
const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
const path = '../metadata.json';

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

const getItemType = randomValue => {
  if (randomValue > 0 && randomValue <= 5) {
    return 'weapon';
  }
  if (randomValue > 5 && randomValue < 10) {
    return 'armor';
  }
  return 'helmet';
};

const pinFileAndMetadata = async () => {
  return new Promise(resolve => {
    console.log('pinfile');

    //we gather a local file for this example, but any valid readStream source will work here.
    let data = new FormData();
    const randomInt = getRandomInt(1, 12);

    data.append('file', fs.createReadStream(`./assets/${randomInt}.png`));
    let metadataFormdata = new FormData();

    //You'll need to make sure that the metadata is in the form of a JSON object that's been convered to a string
    //metadata is optional
    const metadata = JSON.stringify({
      name: `testname${getRandomInt(1, 1000)}`,
      keyvalues: {
        exampleKey: 'exampleValue',
      },
    });
    data.append('pinataMetadata', metadata);

    //pinataOptions are optional
    const pinataOptions = JSON.stringify({
      cidVersion: 0,
      customPinPolicy: {
        regions: [
          {
            id: 'FRA1',
            desiredReplicationCount: 1,
          },
          {
            id: 'NYC1',
            desiredReplicationCount: 2,
          },
        ],
      },
    });
    data.append('pinataOptions', pinataOptions);

    const pinJSONToIPFS = async () => {
      pinata
        .pinFromFS(path)
        .then(result => {
          //handle results here
          console.log(result);
          resolve(result.IpfsHash);
        })
        .catch(err => {
          //handle error here
          console.log(err);
        });
    };
    const sendImage = async () => {
      console.log('sendImage');
      console.log({ data });
      axios
        .post(url, data, {
          maxBodyLength: 'Infinity', //this is needed to prevent axios from erroring out with large files
          headers: {
            'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
            pinata_api_key: process.env.PINATA_API_KEY,
            pinata_secret_api_key: process.env.PINATA_SECRET,
          },
        })
        .then(function (response) {
          fs.writeFileSync(
            path,
            `{ "imageUrl": "https://rmrk.mypinata.cloud/ipfs/${response.data.IpfsHash}", "type": "${getItemType(randomInt)}", "power": ${getRandomInt(10, 50)} }`,
          );
          const readStream = fs.createReadStream(path);
          metadataFormdata.append('file', path);
          pinJSONToIPFS()
            .then(res => console.log('METADATA', res))
            .catch(err => console.log('ERR METDATA', err));
        })
        .catch(function (error) {
          console.log('error:', error);
        });
    };

    sendImage()
      .then(res => console.log('success!!!', res))
      .catch(err => console.log(err));
  });
};
module.exports = pinFileAndMetadata;
