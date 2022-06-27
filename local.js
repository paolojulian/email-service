"use strict";

const app = require("./src/index.js");
const port = process.env.PORT || 5000;

app.listen(port, (error) => {
  console.log(error);
  console.log(`Local app listening on port ${port}!`);
});
