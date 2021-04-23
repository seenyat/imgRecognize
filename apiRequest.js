const axios = require("axios");
const got = require("got");
const fs = require("fs");
const FormData = require("form-data");
const urlBase = "https://api.imagga.com/v2/tags";
const urlUpload = "https://api.imagga.com/v2/uploads";

// Imagga aut
const apiKey = "acc_d9f6fe582c8539f";
const apiSecret = "6748da0540b15ff364cdd22b78e6f51e";
const auth =
  "Basic YWNjX2Q5ZjZmZTU4MmM4NTM5Zjo2NzQ4ZGEwNTQwYjE1ZmYzNjRjZGQyMmI3OGU2ZjUxZQ==";

//IMGur auth
const imgurURL = "https://api.imgur.com/3/upload";
const imgurKey = "e8885eea0c4fff6";
const imgurSecret = "991826ca66fcbc49ac4b1eb9110884099644be01";

async function IMGUpload(filename) {
  const path = `./public/images/${filename}`;
  // console.log(fs.createReadStream(path));
  let formData = new FormData();
  formData.append("image", fs.createReadStream(path));

  var config = {
    method: "post",
    url: "https://api.imgur.com/3/image",
    headers: {
      Authorization: `Client-ID ${imgurKey}`,
      ...formData.getHeaders(),
    },
    data: formData,
  };
  try {
    let res = await axios(config);
    return res.data.data.link;
  } catch (error) {
    // console.log(error.body);
  }
  // console.log(fs.createReadStream(path));
}

async function IMGRequest(filename) {
  let fileLink = await IMGUpload(filename);
  const url =
    "https://api.imagga.com/v2/tags?image_url=" + encodeURIComponent(fileLink);

  var config = {
    method: "get",
    url: url,
    headers: {
      Authorization: auth,
    },
  };

  let res = await axios(config);
  // console.log(JSON.stringify(res.data.result));
  return res.data.result;

  console.log(fileLink);
}

// IMGRequest("1619170282372.jpg");

module.exports = IMGRequest;
