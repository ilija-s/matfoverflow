const express = require("express");
const bodyParser = require("body-parser")

const questionRouter = require("./routes/question");

const PORT = 4000;
const HOST_NAME = "localhost";

const app = express();
app.use(express.static("client"));
app.use(bodyParser.urlencoded({extended: true}));

app.use("/questions", questionRouter);


app.listen(PORT, HOST_NAME, () => {
    console.log(`Server running at ${HOST_NAME}:${PORT}`)
});