const path = require("path");
const fs = require("fs");
const util = require("util");
const noteData = require("../db/db");

const writeFileAsync = util.promisify(fs.writeFile);
const readFileAsync = util.promisify(fs.readFile);

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

String.prototype.decapitalize = function() {
    return this.charAt(0).toLowerCase() + this.slice(1);
}

module.exports = function(app) {
    app.get("/api/notes", function(req, res) {
        readFileAsync(path.join(__dirname, "../db/db.json"), "utf8")
            .then(function(data) {
                return res.json(JSON.parse(data));
            })
    });

    app.post("/api/notes", function(req, res) {
        const newNote = req.body;
        newNote.id = parseInt(noteData.length);
        readFileAsync(path.join(__dirname, "../db/db.json"), "utf8")
            .then(function(data) {
                let allNotes = JSON.parse(data);
                allNotes.push(newNote);
                writeFileAsync(path.join(__dirname, "../db/db.json"), JSON.stringify(allNotes));
                return res.json(noteData);
            })
    });

    app.delete("/api/notes/:id", function(req, res) {
        let noteID = req.params.id;
        for (let i = 0; i < noteData.length; i++) {
            const selNote = noteData[i];
            if (selNote.id == noteID) {
                noteData.splice(i, 1);
                i--;
            }
        }  
        writeFileAsync(path.join(__dirname, "../db/db.json"), JSON.stringify(noteData))
        return res.json(noteData);
    })
}