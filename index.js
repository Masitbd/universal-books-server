import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import { MongoClient, ObjectId } from 'mongodb';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const url = `mongodb+srv://admin:ccxgfdFvCVkOgujQ@cluster0.cpgqu2r.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(url);

const run = async () => {
  try {
    await client.connect();
    const db = client.db('universal-books');
    const bookCollection = db.collection('books');
    const wishlistCollection = db.collection('wishlists');
    const readlistCollection = db.collection('readlists');
    const userCollection = db.collection('users');

    app.get('/books', async (req, res) => {
      const cursor = bookCollection.find({});
      const product = await cursor.toArray();
      res.send({ status: true, data: product });
    });

    app.get('/book/:id', async (req, res) => {
      const id = req.params.id;
      const result = await bookCollection.findOne({ _id: new ObjectId(id) });
      res.send({ status: true, data: result });
    });

    app.post('/book', async (req, res) => {
      const book = req.body;
      const result = await bookCollection.insertOne(book);
      res.send(result);
    });

    app.patch('/book/:id', async (req, res) => {
      const id = req.params.id;
      const updateData = req.body;
      const result = await bookCollection.findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: updateData }
      );
      res.send(result);
    });

    app.delete('/book/:id', async (req, res) => {
      const id = req.params.id;
      const result = await bookCollection.deleteOne({ _id: new ObjectId(id) });
      res.send(result);
    });

    app.post('/review/:id', async (req, res) => {
      const id = req.params.id;
      const review = req.body;
      const result = await bookCollection.updateOne(
        { _id: new ObjectId(id) },
        { $push: { reviews: review } }
      );

      if (result.modifiedCount !== 1) {
        return res.json({ error: 'Book not found or review not added' });
      }

      res.json({ message: 'Review added successfully' });
    });

    app.get('/review/:id', async (req, res) => {
      const bookId = req.params.id;
      const result = await bookCollection.findOne(
        { _id: new ObjectId(bookId) },
        { projection: { _id: 0, reviews: 1 } }
      );

      if (result) {
        res.json(result);
      } else {
        res.status(404).json({ error: 'Book not found' });
      }
    });

    app.patch('/review/:id/user/:email', async (req, res) => {
      const bookId = req.params.id;
      const userEmail = req.params.email;
      const updateReview = req.body.review;

      const result = await bookCollection.findOneAndUpdate(
        { _id: new ObjectId(bookId), 'reviews.userEmail': userEmail },
        { $set: { 'reviews.$.review': updateReview } }
      );

      if (result) {
        return res.json(result);
      }
      res.status(404).json({ error: 'Book not found' });
    });

    app.delete('/review/:id/user/:email', async (req, res) => {
      const bookId = req.params.id;
      const userEmail = req.params.email;

      const result = await bookCollection.findOneAndUpdate(
        { _id: new ObjectId(bookId) },
        { $pull: { reviews: { userEmail } } }
      );

      if (result) {
        return res.json(result);
      }

      res.status(404).json({ error: 'Book not found' });
    });

    app.post('/wishlist', async (req, res) => {
      const { userEmail, book } = req.body;
      const payload = { userEmail, books: [book] };

      let result;
      const exist = await wishlistCollection.findOne({ userEmail });
      if (exist) {
        result = await wishlistCollection.findOneAndUpdate(
          { userEmail },
          { $push: { books: book } }
        );
      } else {
        result = await wishlistCollection.insertOne(payload);
      }

      res.json({ message: 'Wishlist added successfully', result: result.value });
    });

    app.get('/wishlist/:email', async (req, res) => {
      const userEmail = req.params.email;
      const result = await wishlistCollection.findOne({ userEmail });

      if (result) {
        return res.json(result);
      }

      res.status(404).json({ error: 'Wishlist not found' });
    });

    app.delete('/wishlist/:email/book/:bookId', async (req, res) => {
      const userEmail = req.params.email;
      const bookId = req.params.bookId;

      const result = await wishlistCollection.findOneAndUpdate(
        { userEmail },
        { $pull: { books: { _id: new ObjectId(bookId) } } }
      );

      if (result) {
        return res.json(result);
      }

      res.status(404).json({ error: 'Book not found' });
    });

    // Similar structure for reading list routes, users, etc.
    
  } finally {
    // Optionally, close the MongoDB client connection
    // client.close();
  }
};

run().catch((err) => console.log(err));

app.get('/', (req, res) => {
  res.send('Hello World, running container and test my file master');
});

const server = app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
});

export default { app, server };
