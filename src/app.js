const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");
require("./db/conn");
const users = require("./models/users");

const port = process.env.PORT || 8008;

const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", template_path);
hbs.registerPartials(partials_path);

app.get("/", (req, res) => {
    res.render("index")
});
app.get("/login.hbs", (req, res) => {
    res.render("login");

});
app.get("/about_us.hbs", (req, res) => {
    res.render("about_us");
});
app.get("/index.hbs", (req, res) => {
    res.render("index");
});
app.get("/home.hbs", (req, res) => {
    res.render("home");
});
app.get("/contact.hbs", (req, res) => {
    res.render("contact");
});
app.post("/index.hbs", async(req, res) => {
    try {
        const password = req.body.password;
        const cpassword = req.body.confirmpassword;
        if (password === cpassword) {
            const registerEmployee = new users({
                FullName: req.body.username,
                email: req.body.email,
                PhoneNumber: req.body.phonenumber,
                DOB: req.body.bookingdate,
                AadharNumber: req.body.aadharcard,
                password: password,
                confirmpassword: cpassword
            })
            const registered = await registerEmployee.save();
            res.status(201).render("login");

        } else {
            res.send("password are not matching")
        }
    } catch (error) {
        res.status(400).send(error);
    }
});

app.post("/login.hbs", async(req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const useremail = await users.findOne({ email });



        res.status(201).render("home");


    } catch (error) {
        res.status(400).send("invalid Email")
    }
})

app.listen(port, () => {
    console.log('server is running at port no. ', port);
})