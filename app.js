import * as http from "http";
import * as fs from "fs";

const server = http.createServer(function (req, res) {
  try {
    fs.readFile("index.html", function (err, data) {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      return res.end();
    });
  } catch (err) {
    console.log(err);
  }
});

server.listen("8080", console.log("server rodando"));
