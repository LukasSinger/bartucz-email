require("dotenv").config();
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

http.createServer((req, res) => handleRequest(req, res)).listen(8080);

console.log("The server is now listening for requests.");

function handleRequest(req, res) {
  let q = url.parse(req.url, true);
  let file;
  if (q.query.subject) {
    mailOptions.subject = q.query.subject;
    mailOptions.html = q.query.content;
    transporter.sendMail(mailOptions, (err) => {
      if (err) {
        console.log(err);
        file = "public/oops.html";
      } else file = "public/success.html";
      servePage(file, res);
    });
  } else {
    file =
      q.pathname == "/" ? "public/index.html" : `public/${q.pathname}.html`;
    return servePage(file, res);
  }
}

function servePage(file, res) {
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
