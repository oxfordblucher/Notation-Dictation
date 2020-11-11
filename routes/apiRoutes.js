const noteData = require("../db/db");

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

module.exports = function(app) {
    app.get("/api/notes", function(req, res) {
        res.json(noteData);
    });

    app.get("/api/notes/:note", function(req, res) {
        const chosen = req.params.note.capitalize();
        console.log(chosen)

        for (let i = 0; i < noteData.length; i++) {
            if (chosen === noteData[i].title) {
                res.json(noteData[i]);
            }
            
        }
    })

    app.post("/api/notes", function(req, res) {
        const text = req.body.text;
        const title = req.body.title.capitalize();
        
        noteData.push({title, text});
    });

    
}