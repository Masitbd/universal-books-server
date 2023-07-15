require('dotenv').config()
const express = require('express');
const { MongoClient } = require('mongodb');
const app = express()

const port = process.env.PORT || 5000;
const cors = require('cors');

app.use(cors());
app.use(express.json());

const url = `mongodb+srv://admin:CRsGgOdpkOw3UsGy@cluster0.cpgqu2r.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(url);

const run = async () => {
 try{
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db('universal-books');
  const collection = db.collection('documents');
  return 'done.';
 }finally{

 }
}

run().catch((err) => console.log(err));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})