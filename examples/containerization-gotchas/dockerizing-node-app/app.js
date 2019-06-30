
'use strict';

const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => res.send('<h1>It works! Exciting!!</h1>'));

app.listen(PORT, () => console.log(`App runs on port: ${PORT}`));
