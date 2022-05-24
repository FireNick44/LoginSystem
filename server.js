const express = require('express');
const { redirect } = require('express/lib/response');
const app = express();

var mongodb = require("./mongodb.js", { root: __dirname}); //connection db


// listen on 8000 port (http://localhost:8000/)
app.listen(8000);

//app.use('/views', express.static('views'));
//app.use('/public', express.static(__dirname ));
//app.use('/views', express.static(__dirname ));

//opens folder public
app.use('/public', express.static('public'));
app.use(express.json()); //this is to accept data json format
app.use(express.urlencoded({ extended: true })) //encode data send trough html form

//:root "/"
app.get('/', (req, res) => {
    res.sendFile('/views/index.html', { root: __dirname});
})

//index
app.get('/index.html', (req, res) => {
    res.sendFile('/views/index.html', { root: __dirname});
})
//index
app.get('/index', (req, res) => {
    res.sendFile('/views/index.html', { root: __dirname});
})

//sign-in
app.get('/sign-in.html', (req, res) => {
    res.sendFile('/views/sign-in.html', { root: __dirname});
})
//sign-in
app.get('/sign-in', (req, res) => {
    res.sendFile('/views/sign-in.html', { root: __dirname});
})

//sign-up
app.get('/sign-up.html', (req, res) => {
    res.sendFile('/views/sign-up.html', { root: __dirname});
})
//sign-up
app.get('/sign-up', (req, res) => {
    res.sendFile('/views/sign-up.html', { root: __dirname});
})

//there should not be a user, because it is just the template!
app.get('/21246%3D581919%2Ct19263%3D340058%7C358054%2Ct16667%3D565315', (req, res) => {
    res.sendFile('/views/user.html', { root: __dirname});
})


app.post('/login', (req, res)=> {
    console.log(req.body);

    let mail = req.body.mail;
    let password = req.body.password;

    console.log(mail);
    console.log(password);

    //check -> MongoDB user

    //MongoDB ->

})

app.post('/register', (req, res)=> {
    console.log(req.body);

    //check -> MongoDB user

    //Hash

    //MongoDB
})


//404 page
app.use((req, res) => {
    res.sendFile('/views/error.html', { root: __dirname});
})
