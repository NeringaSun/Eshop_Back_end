const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
require('dotenv').config();

const client = new MongoClient(process.env.uri);
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

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
