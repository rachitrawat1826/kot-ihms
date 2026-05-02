const express = require('express')
const app = express()
require("dotenv").config();
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const mongoose = require("mongoose");
const flash = require("connect-flash");
const methodeOverride = require('method-override');
const User = require("./model/user");
const { inLoggedIn, saveRedirecturl } = require("./middleware");


// async function main() {
//     await mongoose.connect("mongodb://127.0.0.1:27017/ihms");
//     console.log("MongoDB connected");

//     app.listen(3000, () => {
//         console.log("server is working on port 3000");
//     });
// }

// main().catch(err => console.log(err));

const dbUrl = process.env.ATLASDB;

async function main() {
    try {
        await mongoose.connect(dbUrl);
        console.log("Connected to MongoDB Atlas ✅");
    } catch (err) {
        console.log("MongoDB connection error ❌", err.message);
    }
}

main();
app.use(cookieParser());
app.use(session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 // 1 hour
    }
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(flash());
app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currentUser = req.user;
    next();
})


app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(methodeOverride("_method"))



app.get('/home', (req, res) => {
    res.render("home")
})
app.get('/apply', (req, res) => {
    res.render('apply');
})
app.post('/apply', async(req, res) => {
    const { username, email, password } = req.body;
    try {
        const user = new User({ username, email });
        const registereduser = await User.register(user, password);
        res.redirect('/home');
    } catch (err) {
        console.log(err);
        res.send("Error signing up");
    }
})
app.get('/course', (req, res) => {
    res.render("course")
})
app.get('/admission', (req, res) => {
    res.render("admission")
})
app.get('/contact', (req, res) => {
    res.render("contact")
})
app.get('/login', (req, res) => {
    res.render("login")
})
app.get('/registration', (req, res) => {
    res.render("registration")
})
app.post('/login',
    saveRedirecturl,
    passport.authenticate('local', {
        failureRedirect: '/login'
    }), async(req, res) => {
        const redirecturl = res.locals.redirectUrl || '/home'
        res.redirect(redirecturl)

    }

);
app.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            console.log(err);
            res.send("Error logging out ")
        }
        res.redirect('/home')
    })
})


app.listen(3000, () => {
    console.log("server is working on port 3000")
})