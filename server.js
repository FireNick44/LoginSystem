// express
const express = require('express');
const app = express();
const port = 8000;

app.listen(port);                                   // listen on 8000 port -> http://localhost:8000/
app.use('/public', express.static('public'));       //opens folder public to public 
app.use(express.json());                            //to accept data json format
app.use(express.urlencoded({ extended: true }))     //encode data send trough html form

// mongoDB
const { redirect } = require('express/lib/response');
const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://vscode:sml12345@ipt6.lovhm.mongodb.net/Login?retryWrites=true&w=majority";
const client = new MongoClient(uri);
const dbName = "Login"
const collectionName = "UsersInfo"

// nunjucks
const nunjucks = require('nunjucks');

nunjucks.configure('templates', {
    autoescape: true,
    express: app
});


// variables
// db
var name;
var mail;
var gpassword;
// templates
const errorPW = { error: 'Passwords not matching!' };
const errorAlreadyInUse = { error: "Mail or Username is already in use!" };

let isDBConnected = false;
testConnect();
if(isDBConnected) console.log("Connection to MongoDB was successful!");

async function testConnect(){
    try
    {
        await client.connect(); //versucht den client zu verbinden, await steht für das abwartet bis es verbunden ist
        await client.db(dbName).command({ ping: 1 });
        isDBConnected = true;
    }
    catch (e)
    {
        console.log("Error, connecting to MongoDB failed!")
        console.error(e);
        isDBConnected = false;
    }
}


async function writeInDB(){
    await writeInDatabase(client,
        {
            username: name,
            email: mail,
            password: gpassword
        }
    );

    async function writeInDatabase(client, Liste){
        await client.db(dbName).collection(collectionName).insertOne(Liste);
    }
}

async function searchInDB(){
    let searchInDB_Error = 0;
    await client.db(dbName).collection(collectionName).find({username: name, email: mail}).toArray(function ( err, result ) {
        //console.log (err);
        //console.log (result);
        searchInDB_Error = result?.length || 0;
    });

    console.log("searchinDB:");
    console.log(searchInDB_Error);
    return searchInDB_Error;
}


// stellt die verbindung zur collection 
async function writeInDatabase(client, Liste){
    await client.db("Login").collection("UsersInfo").insertOne(Liste);
}



//:root "/" -> index
app.get('/', (req, res) => {
    res.sendFile('/views/index.html', { root: __dirname});
});
app.get('/index.html', (req, res) => {
    res.sendFile('/views/index.html', { root: __dirname});
});
app.get('/index', (req, res) => {
    res.sendFile('/views/index.html', { root: __dirname});
});

//sign-in
app.get('/sign-in.html', (req, res) => {
    res.sendFile('/views/sign-in.html', { root: __dirname});
});
app.get('/sign-in', (req, res) => {
    res.sendFile('/views/sign-in.html', { root: __dirname});
});

//sign-up
app.get('/sign-up.html', (req, res) => {
    res.sendFile('/views/sign-up.html', { root: __dirname});
});
app.get('/sign-up', (req, res) => {
    res.sendFile('/views/sign-up.html', { root: __dirname});
});

//there should not be a user, because it is just the template!
app.get('/21246%3D581919%2Ct19263%3D340058%7C358054%2Ct16667%3D565315', (req, res) => {
    res.sendFile('/views/user.html', { root: __dirname});
});

app.post('/login', (req, res)=> {
    var mail = req.body.mail;
    var password = req.body.password;
});

app.post('/register', async (req, res)=> {
    let vpassword = req.body.password;
    let vpasswordConfirm = req.body.passwordConfirm;

    if (vpasswordConfirm != vpassword) res.render('error.html', errorPW);
    else {
        name = req.body.username;
        mail = req.body.mail;
        gpassword = vpassword;

        var searchConfirm = await searchInDB();
        
        console.log("autenth:")
        console.log(searchConfirm);

        if(searchConfirm != 0) res.render('error.html', errorAlreadyInUse);
        else if(searchConfirm == 0){
            writeInDB();
            res.sendFile('/views/sign-in.html', { root: __dirname});
        }
    }
});


//404 page
app.use((req, res) => {
    res.sendFile('/views/error.html', { root: __dirname});
});


