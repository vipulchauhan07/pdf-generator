const http = require('http');
const bodyParser = require('body-parser');

const hostname = '127.0.0.1';
const port = 3000;


let express = require("express");
let app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'));

let ejs = require("ejs");
let pdf = require("html-pdf");
let path = require("path");
const { urlencoded } = require('express');


app.get("/", function (req, res) {
    res.sendFile(__dirname + "/field.html");
});

app.post("/", function(req,res) {
    console.log(res)
})

app.get("/generateReport", (req, res) => {
    ejs.renderFile(path.join(__dirname, './views/', "report-template.ejs"), {students: students}, (err, data) => {
    if (err) {
          res.send(err);
    } else {
        let options = {
            "height": "11.25in",
            "width": "8.5in",
            "header": {
                "height": "10mm"
            },
            "footer": {
                "height": "10mm",
            },
        };
        pdf.create(data, options).toFile("report.pdf", function (err, data) {
            if (err) {
                res.send(err);
            } else {
                res.send("File created successfully");
            }
        });
    }
});
})
app.listen(port, hostname,() => console.log("Application is running!!"));