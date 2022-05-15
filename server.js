const express = require('express');
const app = express();

// listen on 8000 port (http://localhost:8000/)
app.listen(8000);

//app.use(express.static('static'));
//app.use(express.static(__dirname + '/views'));
//app.use('/views', express.static('views'));
//app.use('/public', express.static(__dirname ));
//app.use('/views', express.static(__dirname ));

//opens folder public
app.use('/public', express.static('public'));



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

//there is no user, because it is just the template!
app.get('/21246%3D581919%2Ct19263%3D340058%7C358054%2Ct16667%3D565315', (req, res) => {
    res.sendFile('/views/user.html', { root: __dirname});
})
//404 page
app.use((req, res) => {
    res.sendFile('/views/error.html', { root: __dirname});
})



//app.get("/", (req, res) => {
//    res.render("./views/index.html") //geht nur mit einer render engine 
//})
