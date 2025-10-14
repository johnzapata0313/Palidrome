const http = require('http');
const fs = require('fs');
const url = require('url');
const querystring = require('querystring');
const figlet = require('figlet');

const server = http.createServer(function(req, res) {
  const page = url.parse(req.url).pathname;
  const params = querystring.parse(url.parse(req.url).query);
  console.log(page);

  if (page == '/') {
    fs.readFile('index.html', function(err, data) {
      if (err) {
        res.writeHead(500, {'Content-Type': 'text/plain'});
        res.end('Error loading index.html');
        return;
      }
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      res.end();
    });
  } else if (page == '/api') {
    if ('text' in params) {
      const text = params['text'];
      const normalized = text.replace(/[^A-Za-z0-9]/g, '').toLowerCase();
      const isPalindrome = normalized === normalized.split('').reverse().join('');
      
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.end(JSON.stringify({
        text: text,
        palindrome: isPalindrome
      }));
    } else {
      res.writeHead(400, {'Content-Type': 'application/json'});
      res.end(JSON.stringify({error: 'No text provided'}));
    }
  } else if (page == '/css/style.css') {
    fs.readFile('css/style.css', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/css'});
      res.write(data);
      res.end();
    });
  } else if (page == '/js/main.js') {
    fs.readFile('js/main.js', function(err, data) {
      res.writeHead(200, {'Content-Type': 'application/javascript'});
      res.write(data);
      res.end();
    });
  } else {
    figlet('404!!', function(err, data) {
      if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
      }
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.write(data);
      res.end();
    });
  }
});

// Listen on port 9000
server.listen(9000, () => {
  console.log('Server running at http://localhost:9000/');
});
