const express = require("express")
const app = express();
const cors = require("cors");
const dotenv = require("dotenv")
const { analyze } = require("./analyze.js");

// Using CORS cross-origin
app.use(cors());

dotenv.config();

const port = 8000;
const key = process.env.API_KEY;

// Read the JSON files coming to you
app.use(express.json());
app.use(express.static('../../dist/'));

app.get("/", (req, res) => {
    res.send("Server page read");
});

app.post("/", async(req, res) => {
    const { input } = req.body;
    //console.log("did i get key?", input ,key )
    const Analyze = await analyze(input, key)
    //console.log("catch2",Analyze);
    res.json(Analyze)
});



app.listen(port, () => console.log(`Server is listening on port ${port}`));