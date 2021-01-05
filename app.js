const http = require('http');
const bodyParser = require('body-parser');

const hostname = '127.0.0.1';
const port = 3000;


let ejs = require("ejs");
let pdf = require("html-pdf");
let path = require("path");
let express = require("express");
let app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'));



const { urlencoded } = require('express');

let desc_list = [];
let price_list = [];
let company_name = "";
let address = "";
let pan = "";
let gst = "";

app.get("/", function (req, res) {
    res.render('field');
});


app.post("/", function (req, res) {
    company_name = req.body.company;
    address = req.body.address;
    pan = req.body.pan;
    gst = req.body.gst;
    console.log(req.body);
    res.redirect("/desc");
});

app.get("/desc", function (req, res) {
    res.render("description", {desc: desc_list, price: price_list});
});

app.post("/desc", function(req,res) {
    var description = req.body.desc;
    var price = req.body.price;
        desc_list.push(description);
        price_list.push(price);
    res.redirect("/desc");
});

app.get("click", (req, res) => {
    ejs.renderFile(path.join(__dirname, './views/', "report-template.ejs"), {students: desc}, (err, data) => {
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