/*
const { MongoClient, ServerApiVersion } = require('mongodb');
var server = require('./server', { root: __dirname});

var username = server.username;
var email = server.email;
var password = server.password;


async function connection(){
    const uri = "mongodb+srv://vscode:sml12345@ipt6.lovhm.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true});

    try 
    {
        // Connect to the MongoDB cluster
        await client.connect();

        await writeinDatabase(client,
            {
                username: username,
                email: email,
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

connection();


async function writeinDatabase(client, Liste){
    await client.db("Login").collection("UsersInfo").insertOne(Liste);
}
*/