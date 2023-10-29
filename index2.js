var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")

const app = express()

app.use(bodyParser.json())
app.use(express.static(__dirname,{index : 'index1.html'}))
app.use(bodyParser.urlencoded({
    extended: true
}))

mongoose.connect('mongodb://127.0.0.1:27017', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
var db = mongoose.connection;

db.on('error', () => console.log("Error in Connecting to Database"));
db.once('open', () => console.log("Connected to Database"));

app.post("/login", async (request, response) => {
    try {
        //adding
        const username = request.body.username;
        const password = request.body.password;

        const usermail = db.collection('users').findOne({ name: username }, (err, res) => {
            if (res == null) {
                response.write("Invalid information!❌❌❌! Please create account first");
                res.send()
            }
            else if (err) throw err;


            // if (res.password === password) {
            //     return response.redirect('homepage.html');
            // }
            // else {
            //     response.write("Invalid Password!❌❌❌");
            // }


        });
    }
    catch (error) {
        response.write("Invalid information❌");
    }

}) 
app.post("/sign", (req, res) => {
    var name = req.body.name;
    var email = req.body.email;
    var phno = req.body.phno;
    var password = req.body.password;
    var data = {
        "name": name,
        "email": email,
        "phno": phno,
        "password": password
    }
    db.collection('users').insertOne(data, (err, collection) => {
        if (err) throw err;
        console.log("Record Inserted Successfully");
    });
    return res.redirect('homepage.html');

})

app.get("/", (req, res) => {
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.redirect('index2.html');

}).listen(3000);

console.log("Listening on Port 3000");