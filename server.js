const express = require("express");
const fs = require("fs");
const http = require("http");

const PORT = 3333;
const server = http.createServer(handleRequest);

function handleRequest(req, res) {
    let path = req.url;
    switch (path) {
        case "/public/index":
        case "/public/notes":
            return renderHTML(path + ".html", res);

        default:
            return renderHTML("/public/index.html", res);
    }
}

function renderHTML(filePath, res) {
    return fs.readFile(__dirname + filePath, function(err, data) {
        if(err) throw err;
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(data);
    })
}

server.listen(PORT, function() {
    console.log(`Server is listening on PORT: ${PORT}`)
})