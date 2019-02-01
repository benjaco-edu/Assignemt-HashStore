const express = require('express');
const HashMapDB = require("./hashMapDB");


const app = express();

const databasefile = __dirname + "/data/database.txt";
const database = new HashMapDB(databasefile);



app.get("/get/:key", async (req, res) => {
    let data = await database.get(req.params.key);
    if (data === null) {
        return res.status(404).end("null");
    }
    res.type("text/html").end(data);
});


app.get("/set/:key/:value", async (req, res) => {
    await database.set(req.params.key, req.params.value);
    res.end("ok");
});


// debugging & inspection

app.get("/file", (req, res) => {
    res.sendFile(databasefile);
});

app.get("/hashMap", (req, res) => {
    for(const [key, value] of database.hashMap) {
        res.write(key+":"+value+"\n");
    }
    res.end();
});


(async () => {
    await database.init();

    app.listen(8080, function () {
        console.log("server is running")
    });
})();
