const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const querystring = require('querystring');

// Create the server
const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url);
  const page = parsedUrl.pathname === '/' ? '/index.html' : parsedUrl.pathname;
  const params = querystring.parse(parsedUrl.query);

  // --- API endpoint: checks if the text is a palindrome ---
  if (page === '/api') {
    if ('text' in params) {
      const text = params['text'];
      const normalized = text.replace(/[^A-Za-z0-9]/g, '').toLowerCase();
      const isPalindrome = normalized === normalized.split('').reverse().join('');

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ text, palindrome: isPalindrome }));
    } else {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'No text provided' }));
    }
    return; // Stop here; no need to read any files
  }

  // --- Serve static files (HTML, CSS, JS, etc.) ---
  const filePath = path.join(__dirname, page);
  const ext = path.extname(filePath);

  const contentType = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.ico': 'image/x-icon',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
  }[ext] || 'text/plain';

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data);
    }
  });
});

// --- Listen on port 9000 ---
server.listen(9000, () => {
  console.log('✅ Server running at http://localhost:9000/');
});
