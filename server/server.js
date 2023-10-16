const express = require('express');
const cors = require('cors'); // Import the cors package
const { MongoClient } = require('mongodb');
const app = express();
const port = 5000;
app.use(cors());
// MongoDB connection URL
const mongoURL = 'mongodb://127.0.0.1:27017/user'; // Update with your MongoDB server URL
const c=new MongoClient(mongoURL);
async function connectDb(){
    c.connect();
    console.log("connected to db")
}
connectDb()
// API endpoint to fetch data from MongoDB
app.get('/api/data', async (req, res) => {
  try {
    const client = new MongoClient(mongoURL, { useUnifiedTopology: true });
    await client.connect();
    
    const database = client.db('user'); // Replace with your database name
    const collection = database.collection('users'); // Replace with your collection name

    const data = await collection.find({}).toArray();

    client.close();

    res.json(data);
    
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
