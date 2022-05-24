const { MongoClient } = require('mongodb');


function main()
{
    const uri = "mongodb+srv://vscode:sml12345@ipt6.lovhm.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true});

    try {
        // Connect to the MongoDB cluster
        client.connect();

        //createListing();

    } 
    
    catch (e) {
        console.error(e);
    } 
    
    finally {
        client.close();
    }
    
    /*
    function createListing(client, newListing){
        const result = client.db("Login").collection("UsersInfo").insertOne(newListing);
        console.log(`New listing created with the following id: ${result.insertedId}`);
    }

    
    createListing(client,
        {
            username: "",
            email: "",
            password: ""
        }
        );
        
    */
    
}


    main();
    
    