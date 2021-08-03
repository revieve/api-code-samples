require('dotenv').config();
const fs = require('fs');
const fetch = require('node-fetch');
const FormData = require('form-data');

const url = process.env.API_ENDPOINT;
const image = fs.createReadStream('selfie.jpg');

const data = new FormData();
data.append('partner_id', process.env.PARTNER_ID);
data.append('image', image);

// You can pass additional parameters in the url
// i.e skintone, gender
fetch(`${url}/?skintone=1&gender=female&components=acne,acne_visualization`, {
  method: 'POST',
  body: data,
})
  .then((res) => {
    if (res.status >= 400) {
      throw new Error('Bad response from server');
    }
    return res.json();
  })
  .then((res) => {
    const [{ measurement_locations: measurements }] = res.results;
    measurements.map((location) => {
      const acnes = location.visualization_data.length;
      const descr = location.description;
      return console.log(descr, acnes);
    });
  });
