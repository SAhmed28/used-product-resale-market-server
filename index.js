const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();


const port = process.env.PORT || 5000;

const app = express();

//middle wares
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.oplybtq.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        const usersCollection = client.db('smartTech').collection('users');
        const productsCollection = client.db('smartTech').collection('products');

        app.get('/users', async(req,res) => {
            const query = {};
            const users = await usersCollection.find(query).toArray();
            res.send(users);
        });

        // get user
        app.get('/users/role/:email', async (req, res) => {
            const email = req.params.email;
            const query = { email }
            const user = await usersCollection.findOne(query);
            res.send(user);
        })


        app.post('/users', async (req,res) => {
            const user = req.body;
            const result = await usersCollection.insertOne(user);
            res.send(result);
        });


        app.get('/category/:brand', async (req,res)=> {
            const brand = req.params.brand;
            console.log(brand);
            const query = {productBrand: brand};
            const categoryProducts = await productsCollection.find(query).toArray();
            console.log(categoryProducts);
            res.send(categoryProducts);
        });

        app.get('/products', async(req,res) => {
            let query = {};
            if(req.query.email){
                query = {
                    email: req.query.email
                }
            }
            const products = await productsCollection.find(query).toArray();
            res.send(products);
        })

        // for the same product
        app.post('/products', async (req,res) => {
            const product = req.body;
            const result = await productsCollection.insertOne(product);
            res.send(result);
        });

        // product delete
        app.delete('/products/:id', async(req,res) => {
            const id = req.params.id;
            const filter = {_id : ObjectId(id) };
            const result = await productsCollection.deleteOne(filter);
            res.send(result)
        })
    }
    finally{

    }
}
run().catch(console.log);

app.get('/', async(req,res) => {
    res.send("Resale market server is running");
})


app.listen(port, () => console.log(`Resale market is running on ${port}`))