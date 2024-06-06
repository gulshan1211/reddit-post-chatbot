const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000; // Set the port number

const server = http.createServer((req, res) => {
  // Read the HTML file
  fs.readFile(path.join(__dirname, 'index.html'), (err, data) => {
    if (err) {
      // Handle error
      res.writeHead(500, {'Content-Type': 'text/plain'});
      res.end('Internal Server Error');
      return;
    }

    // Serve the HTML file
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    res.end();
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
