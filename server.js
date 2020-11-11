const express = require("express");

const app = express();
var PORT = process.env.PORT || 3777;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'))

require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

app.listen(PORT, function() {
    console.log(`App listening on http://localhost:${PORT}`);
})