const express = require('express');
const mongoose = require('mongoose');
const pasteRoutes = require("./Routes/routes");
const cors = require('cors');
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/pastes", pasteRoutes);

app.get("/api/healthz", (req, res)=>{
    res.json({ ok: true });
});

mongoose.connect(process.env.MONGODB_URL)
 .then(()=> console.log("Mongodb connected"))
 .catch((err) => console.log('error', err));

app.listen(process.env.PORT, ()=>{
    console.log(`server running on port ${process.env.PORT}`)
})