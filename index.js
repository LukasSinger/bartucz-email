let http = require("http");
let url = require("url");
let fs = require("fs");

http
  .createServer((req, res) => {
    let query = url.parse(req.url, true);
    let file = query.pathname == "/" ? "index.html" : `.${query.pathname}`;
    fs.readFile(file, (err, data) => {
      if (err) {
        res.writeHead(404, { "Content-Type": "text/html" });
        return res.end("We couldn't find what you requested (404)");
      }
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      return res.end();
    });
  })
  .listen(8080);
