let http = require("http");
let url = require("url");
let fs = require("fs");
let nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  host: "saturn.rochesterschools.org",
  port: 25,
  auth: {
    user: process.env.USERNAME,
    pass: process.env.PASSWORD
  },
  tls: {
    rejectUnauthorized: false
  }
});
let mailOptions = {
  from: process.env.USERNAME,
  to: process.env.BARTUCZ,
  subject: "",
  html: ""
};

http
  .createServer((req, res) => {
    let query = url.parse(req.url, true);
    if (query.query.subject) {

    } else {
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
    }
  })
  .listen(8080);
