const express = require('express');
const { redirect } = require('express/lib/response');
const { MongoClient } = require('mongodb');

//const MongoClient = require('mongodb').MongoClient;

const app = express();

var name;
var mail;
var password;
var passwordConfirm;


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
3

app.post('/login', (req, res)=> {
    var mail = req.body.mail;
    var password = req.body.password;

    //console.log(req.body); show form input

    //check -> MongoDB user

    //MongoDB ->

})

app.post('/register', (req, res)=> {
    name = req.body.username;
    mail = req.body.mail;
    password = req.body.password;
    passwordConfirm = req.body.passwordConfirm
    
    connection();
    //console.log(req.body); show form input

    //check -> MongoDB user

    //Hash

    //MongoDB
})


//404 page
app.use((req, res) => {
    res.sendFile('/views/error.html', { root: __dirname});
})


//MongoDB Connection + Writing in Database

async function connection(){
    const uri = "mongodb+srv://vscode:sml12345@ipt6.lovhm.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(uri);

    try 
    {
        await client.connect();
        await client.db("vscode").command({ ping: 1 });

        await writeinDatabase(client,
            {
                username: name,
                email: mail,
                password: password
            }
        );
    } 

    catch (e) 
    {
        console.error(e);
    } 

    finally 
    {
        client.close();
    }

}

async function writeinDatabase(client, Liste){
    await client.db("Login").collection("UsersInfo").insertOne(Liste);
}
