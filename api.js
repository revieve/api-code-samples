const fs = require("fs");
const FormData = require("form-data");
const fetch = require("cross-fetch");
require("dotenv").config();

const url = process.env.API_ENDPOINT;
const image = fs.createReadStream("selfie.jpg");

let data = new FormData();
data.append("partner_id", process.env.PARTNER_ID);
data.append("image", image);

fetch(url, {
  method: "POST",
  body: data,
})
  .then((response) => {
    if (response.status >= 400) {
      throw new Error("Bad response from server");
    }
    return response.json();
  })
  .then((data) => {
    console.log(data);
  });
