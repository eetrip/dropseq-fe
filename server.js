const express = require("express");
const path = require("path");
const app = express();
app.use(express.static(__dirname + "/dist/dot-plots"));
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname + "/dist/dot-plots/index.html"));
});
app.listen(process.env.PORT || 3000);
