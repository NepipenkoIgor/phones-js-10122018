const http = require('http');
const static = require('node-static');
// import http from 'http'
const port = 3000;
const file = new static.Server('.', {
  cache: 0,
  headers: {
    'Access-control-Allow-Origin': 'http://localhost:63342',
    'Access-control-Allow-Methods': 'POST, GET',
    'Access-control-Allow-Headers': 'Content-Type',
  }
});
http
  .createServer((req, res) => {
    if (req.url.startsWith('/mocked-data')) {
      setTimeout(() => {
        file.serve(req, res);
      }, 5000)
    } else {
      file.serve(req, res);
    }


  })
  .listen(port);
console.log(`Server running on ${port}`)
