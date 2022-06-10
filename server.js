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
const uri = "mongodb+srv://vscode:sml12345@ipt6.lovhm.mongodb.net/Login?retryWrites=true&w=majority&tlsInsecure=true";
const client = new MongoClient(uri);
const dbName = "Login"
const collectionName = "UsersInfo"

var name;
var mail;
var gpassword;

client.connect() // test connection
.then((result) => console.log('connected to db'))
.catch((err) => console.log(err));

// nunjucks
const nunjucks = require('nunjucks');

const errorPW = { error: 'Passwords not matching!' };
const errorWrongPW = { error: "Wrong password!" };
const errorAlreadyInUse = { error: "Mail is already in use!" };
const errorNoUserFound = { error: "No User found" };

nunjucks.configure('templates', {
    autoescape: true,
    express: app
});

//////////////////////////

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

app.post('/login', async (req, res)=> {
    mail = req.body.mail;
    let vpassword = req.body.password;
    //Hash von gpassword !

    await client.db(dbName).collection(collectionName).findOne({email: mail},{password: vpassword}).then(( result, err ) => {
        
        let searchConfirm = result;

        if(searchConfirm == null){
            console.log('status sign in: error');
            res.render('error.html', errorNoUserFound);
        }
        else{
            //console.log("err");
            //console.log (err);
            //console.log(searchConfirm);
            //console.log("pass");
            //console.log(searchConfirm.password);

            let userCollecterASP = searchConfirm.password;
    
            if(userCollecterASP != vpassword){
                console.log('status sign in: wrong password');
                res.render('error.html', errorWrongPW);
            }
            else if(userCollecterASP.length != 0){
                console.log('status sign in: user logged in! ;)');
    
                let userDotUsername =  searchConfirm.username;
                //console.log(userDotUsername);
                const sendUser = { username: userDotUsername};
                
                res.render('user.html', sendUser);
            }
        }
    });

});

app.post('/register', async (req, res)=> {
    let vpassword = req.body.password;
    let vpasswordConfirm = req.body.passwordConfirm;

    //Hash von password !

    if (vpasswordConfirm != vpassword) res.render('error.html', errorPW);
    else {

        name = req.body.username;
        mail = req.body.mail;
        gpassword = vpassword;

        await client.db(dbName).collection(collectionName).find({email: mail}).toArray(function ( err, result ) {
            
            let searchConfirm = result;
            
            //console.log (err);
            //console.log (result);
            //console.log(searchConfirm);

            if(searchConfirm.length != 0){
                console.log('status sign up: error, mail already in use!');
                res.render('error.html', errorAlreadyInUse);
            }
            else if(searchConfirm.length == 0){
                console.log('status sign up: created user ;)');

                writeInDB();
                res.sendFile('/views/sign-in.html', { root: __dirname});
            }
        });
    }
});


//404 page
app.use((req, res) => {
    res.sendFile('/views/error.html', { root: __dirname});
});

