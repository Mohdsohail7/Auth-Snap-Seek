const express = require("express");
const connectDB = require("./config/database");
const cors = require("cors");
require("dotenv").config();


const app = express();

app.use(cors());
app.use(express.json());


const port = process.env.PORT

connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Server is running at port: ${port}`);
    })
})