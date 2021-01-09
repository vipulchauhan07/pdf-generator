const http = require('http');
const bodyParser = require('body-parser');
const port = 3000;
var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "14060346",
    database: "anubudh_utils",
    multipleStatements: true
});

con.connect(function (err) {
    if (err) throw err;
    console.log("DB is Connected!");
});


let ejs = require("ejs");
let pdf = require("html-pdf");
let path = require("path");
let express = require("express");
let app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));


const { urlencoded } = require('express');
var desc_list = [];
var price_list = [];
var company_name = "";
var address = "";
var pan = "";
var gst = "";
var year = "";
var total = 0.0;
var gstPrice = 0.0;
var invoice_format='';

function updateQuery(seq, updatedYear) {
    let obj = [seq, updatedYear];
            let stmt = 'update `invoice` set `seq_number` = ? where year = ?';
            console.log("**********stmt **********" + stmt);
            con.query(stmt, obj, function (err, results, fields) {
                if (err) console.log(err);
                console.log('Rows affected:', results);
            });
}

async function seqCal() {
    var invoice = "";
    let seq = 1;
        try {
            await con.query('select `seq_number` from `invoice` where `year` = ?', [year],
                function (err, results, fields) {
                    if (!err) {
                        seq = results[0].seq_number;
                        seq = parseInt(seq) + 1;
                        invoice = year + "-" + seq;
                        
                        console.log("sequence is " + seq);
                        console.log("invoice is : " + invoice);
                    }
                    updateQuery(seq, year);
                    // return invoice;
                });
            
        } catch (err) {
            console.log(err);
        }

    return invoice;
}

function calculate(price_list, percent) {
    let price_total = 0.0;
    for (let i = 0; i < price_list.length; i++) {
        price_total = price_total + parseFloat(price_list[i]);
    }
    gstPrice = parseFloat(((percent / 100) * price_total).toFixed(2));
    total = price_total + gstPrice;
}

app.get("/", function (req, res) {
    res.render('field');
});


app.post("/", function (req, res) {
    company_name = req.body.company;
    address = req.body.address;
    pan = req.body.pan;
    gst = req.body.gst;
    year = req.body.year;
    console.log(req.body);
    res.redirect("/desc");
});

app.get("/desc", function (req, res) {
    res.render("description", { desc: desc_list, price: price_list });

});

app.post("/desc", function (req, res) {
    let description = req.body.desc;
    let price = req.body.price;
    desc_list.push(description);
    price_list.push(price);
    res.redirect("/desc");
});

var seq_var = seqCal();
console.log("$$$$$$$$$$$$4" +  seq_var);


app.get('/generateReport', (req, res) => {

    // await 
    calculate(price_list, gst);
    // var seq_var = await seqCal();
    // console.log("$$$$$$$$$$$$4" +  seq_var);

    ejs.renderFile(path.join(__dirname, './views/', "report-template.ejs"), {
        desc: desc_list,
        price: price_list,
        company_name: company_name,
        address: address,
        pan: pan,
        gst: gst,
        gstPrice: gstPrice,
        total: total,
        year: year,
        invoice_format: invoice_format
    }, (err, data) => {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            let options = {
                format: 'A4'
            };

            pdf.create(data, options).toFile('report.pdf', function (err, data) {
                if (err) {
                    res.send(err);
                } else {
                    res.send("File created successfully");
                }
            });
        }
    });
});


app.listen(3000, () => console.log("Application is running!! https://localhost:3000"));