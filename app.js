import * as http from "http";
import * as fs from "fs";

const port = 8080;

function typesDirection(url) {
  if (url === "/") {
    return "home";
  } else if (url.includes("html")) {
    return "html";
  } else if (url.includes(".css")) {
    return "css";
  } else if (url.includes(".js")) {
    return "js";
  } else if (url.includes(".svg")) {
    return "svg";
  } else {
    return "";
  }
}

const server = http.createServer(function (req, res) {
  console.log(req.url);
  const fileType = typesDirection(req.url);
  switch (fileType) {
    case "home":
      try {
        fs.readFile("index.html", function (err, data) {
          res.writeHead(200, { "Content-Type": "text/html" });
          res.write(data);
          return res.end();
        });
      } catch (err) {
        console.log(err);
      }
      break;
    case "html":
      try {
        fs.readFile(`.${req.url}`, function (err, data) {
          res.writeHead(200, { "Content-Type": "text/html" });
          res.write(data);
          return res.end();
        });
      } catch (err) {
        console.log(err);
      }
      break;
    case "css":
      try {
        fs.readFile(`.${req.url}`, function (err, data) {
          res.writeHead(200, { "Content-Type": "text/css" });
          res.write(data);
          return res.end();
        });
      } catch (err) {
        console.log(err);
      }
      break;
    case "js":
      try {
        fs.readFile(`.${req.url}`, function (err, data) {
          res.writeHead(200, { "Content-Type": "text/javascript" });
          res.write(data);
          return res.end();
        });
      } catch (err) {
        console.log(err);
      }
      break;
    default:
      try {
        fs.readFile("404.html", function (err, data) {
          res.writeHead(200, { "Content-Type": "text/html" });
          res.write(data);
          return res.end();
        });
      } catch (err) {
        console.log(err);
      }
      break;
  }
});

server.listen(
  port,
  console.log("server rodando em : http://localhost:" + port)
);
