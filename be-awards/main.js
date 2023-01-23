const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./config');
const app = express();
app.use(cors());
const port = process.env.APP_PORT || 9000;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

config.Load();

app.use(require('./router'));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
