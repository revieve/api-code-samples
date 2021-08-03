const fs = require('fs');
const fetch = require('node-fetch');
const FormData = require('form-data');

const url = `https://partner-test.revieve.com/api/3/analyzeImage`;
const image = fs.createReadStream('selfie.jpg');

// You can pass additional data parameters with the url
// i.e skintone, gender, components
// for more info https://api.revieve.com

const data = new FormData();
data.append('partner_id', `jmlv6b2qtS`);
data.append('image', image);
data.append('skintone', 0);
data.append('gender', 'female');
data.append('components', 'acne,acne_visualization');

fetch(url, {
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
    // because the components of acne and acne viz are passed in the body,
    // we only get the acne info back

    // measurements_locations is an array of objects where each object has
    // a face section info i.e chin, left cheek, etc

    // We get all the measurements
    const [{ measurement_locations: measurements }] = res.results;

    // Then we loop over all of them and print out each one along with the
    // acneCount
    const acnes = measurements.map(
      ({ description, visualization_data: vizData }) => {
        const acneCount = vizData.length;
        return { description, acneCount };
      }
    );

    // This prints out the table
    console.table(acnes);

    // We're now calculating the total number of acnes in the entire selfie
    const allAcnes = acnes
      .map(({ acneCount }) => acneCount)
      .reduce((a, b) => a + b);

    console.log(`Total acne count: ${allAcnes}`);
  });
