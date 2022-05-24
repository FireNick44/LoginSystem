const { MongoClient, ServerApiVersion } = require('mongodb');

function main()
{
    const uri = "mongodb+srv://<vscode>:<sml12345>@ipt6.lovhm.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

    client.connect(err => {
        const collection = client.db("ipt6").collection("Login.UsersInfo");
        // perform actions on the collection object
        client.close();
    });

}

main();
