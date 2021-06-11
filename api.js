require("dotenv").config();
const fs = require("fs");
const querystring = require('querystring');
const fetch = require("node-fetch");
const FormData = require("form-data");

const url = process.env.API_ENDPOINT;
const image = fs.createReadStream("selfie.jpg");
const params = "skintone=4&gender=female";

let data = new FormData();
data.append("partner_id", process.env.PARTNER_ID);
data.append("image", image);

fetch(`${url}/${querystring.stringify(params)}`, {
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
