let http = require('http');
let static = require('node-static');
// import http from 'http'


http
  .createServer((req, res) => {
    res.end('{a: 1}')
  })
  .listen(3000);
