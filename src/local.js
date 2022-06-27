"use strict";

const app = require("./index.js");
const port = process.env.PORT || 5000;

app.listen(port, () => console.log("Local app listening on port 3000!"));
