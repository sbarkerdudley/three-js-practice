const path = require('path');
const express = require('express');
const app = express();

const DIST = path.resolve(__dirname, '../', 'dist');
const assets = path.resolve(DIST, 'assets');

app.use(express.static(DIST));
app.use(express.static(assets));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

module.exports = app;