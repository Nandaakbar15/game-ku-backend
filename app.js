require("dotenv").config();
const express = require("express");
const app = express();
const port = 3000;
const router = require("./routes/route");
const cors = require("cors");

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.use(cors());

// router
app.use(router);

app.listen(port, () => {
  console.log(`Server is running on : http://localhost:${port}`);
});
