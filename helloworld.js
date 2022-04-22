let http = require("http");
let url = require("url");
let date = require("./date");

http
  .createServer(function (req, res) {
    let query = url.parse(req.url, true).query;
    let text = query.year + " " + query.month;
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(
      "The date is " +
        date.date() +
        ".\nYou are requesting this from " +
        req.url +
        " and " +
        text
    );
    res.end();
  })
  .listen(8080);
