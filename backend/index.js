const express = require("express");
const app = express();
const PROT = 3000;

app.get("/", (req, res) =>{
    res.send("Hello world"); //Hello world를 Endpoint에 보낸다.
});

app.listen(PROT, ()=>{
    console.log("Server is Running");
})