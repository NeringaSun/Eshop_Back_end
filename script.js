const express = require('express');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config();

const URI = `mongodb+srv://dbAdmin:${process.env.MONGODBPW}@clusterdemo.e4wnm.mongodb.net/E-shop?retryWrites=true&w=majority`;
const client = new MongoClient(URI);
const app = express();
app.use(express.json());
app.use(cors());

app.get('/products', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con.db('E-shop').collection('Products').find().toArray();
    await con.close();
    res.send(data);
  } catch (e) {
    res.status(500).send({ error: ' Please try again' });
  }
});

app.get('/products/:id', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db('E-shop')
      .collection('Products')
      .find(ObjectId(req.params.id))
      .toArray();
    await con.close();

    return res.send(data);
  } catch (err) {
    return res.status(500).send({ err });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
