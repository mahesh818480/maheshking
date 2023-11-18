let express = require('express');
let app = express();

const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');
const cors = require('cors');

let http = require('http');
let server = http.Server(app);
// const port = process.env.PORT || 3000;
const port = 'http://localhost:3000';
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(express.json({ limit: '10mb' }));

const uri = 'mongodb+srv://Mahesh:Mahesh123@cluster0.eqme0jn.mongodb.net/';
const client = new MongoClient(uri);
var db, collection, findResult, userDataCollection, findUserData;

// File Upload >>>>

app.post('/upload', function(req, res) {
    console.log(req.files.foo,'25::::'); // the uploaded file object
  });




// SOCKET  CONNECTION 
server.listen(3000, () => {
    console.log(`started on port: ${port}`);
});

async function createDb() {
    console.log('mongo.....')
    await client.connect();
    db = client.db("FileUpload");
    console.log('mongoDB connecting..');
    collection = db.collection('Image');
    findResult = await collection.find({}).toArray();
}
app.get('/api/upload', async (req, res) => {
    console.log(req, '28::::', res)
    try {
        await createDb();
        await client.connect();
        res.json(findResult)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message });
    }
});

// House POST CALL Data
app.post('/api/update/upload', async (req, res) => {

    console.log(req.body, '2222::')
    try {
        await createDb()
        collection.insertOne(req.body, function (err, res) {
            console.log(res, '102::::')
            if (err) throw err;
            console.log("1 document inserted");
            db.close();
        })
        res.json({ valid: true })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})