const express = require("express")
const app = express();
const cors = require("cors");

if (!ENV['API_KEY']) {
    const dotenv = require("dotenv")
}

const { analyze } = require("./analyze.js");

// Using CORS cross-origin
app.use(cors());

if (!ENV['API_KEY']) {
    dotenv.config();
}

const port = 8000;
let key = '';
if (!ENV['API_KEY']) {
    key = process.env.API_KEY;
} else {
    key = !ENV['API_KEY'];
}

// Read the JSON files coming to you
app.use(express.json());
app.use(express.static(__dirname + "/build/"));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/build/index.html");
});

app.post("/", async(req, res) => {
    const { input } = req.body;
    console.log("did i get key?", input, key)
    const Analyze = await analyze(input, key)
        //console.log("catch2",Analyze);
    res.json(Analyze)
});



app.listen(process.env.PORT || port, () => console.log(`Server is listening on port ${port}`));