let http = require("http");
let url = require("url");
let date = require("./date");
let fs = require("fs");

http
  .createServer(function (req, res) {
    let query = url.parse(req.url, true).query;
    console.log(url.parse(req.url, true));
    let text = query.year + " " + query.month;
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(
      "The date is " +
        date.date() +
        ".\nYou are requesting this from " +
        req.url +
        " so it is " +
        text
    );
    res.end();
  })
  .listen(8080);
