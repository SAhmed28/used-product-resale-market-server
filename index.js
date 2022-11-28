const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();


const port = process.env.PORT || 5000;

const app = express();

//middle wares
app.use(cors());
app.use(express.json());


async function run(){
    try{

    }
    finally{

    }
}
run().catch(console.log);

app.get('/', async(req,res) => {
    res.send("Resale market server is running");
})


app.listen(port, () => console.log(`Resale market is running on ${port}`))